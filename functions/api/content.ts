import { createAuth } from "../lib/auth";
import { ensureTables } from "../lib/ensure-tables";

interface Env {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  GITHUB_TOKEN: string;
  GITHUB_REPO?: string;
  GITHUB_BRANCH?: string;
}

interface FileEntry {
  file: string;
  content: unknown;
}

interface ContentRequest {
  files: FileEntry[];
  message?: string;
}

const ALLOWED_PATHS = new Set([
  "website/public/data/club.json",
  "website/public/data/teams.json",
  "website/public/data/committee.json",
  "website/public/data/news.json",
  "website/public/data/registration.json",
  "website/public/data/matchday.json",
  "website/public/data/gallery.json",
]);

function gh(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    "User-Agent": "ELBantams-CMS",
  };
  return async (url: string, options?: RequestInit) =>
    fetch(url, { ...options, headers: { ...headers, ...options?.headers } });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  await ensureTables(context.env.DB);
  const auth = createAuth(context.env);
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const role = (session.user as Record<string, unknown>).role;
  if (role !== "admin") {
    return new Response(JSON.stringify({ error: "Admin access required" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = (await context.request.json()) as ContentRequest;
  const { files, message } = body;

  if (!files || !Array.isArray(files) || files.length === 0) {
    return new Response(JSON.stringify({ error: "files array required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  for (const f of files) {
    if (!ALLOWED_PATHS.has(f.file)) {
      return new Response(JSON.stringify({ error: `Invalid file path: ${f.file}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  const repo = context.env.GITHUB_REPO ?? "adamsuk/ELBantams";
  const branch = context.env.GITHUB_BRANCH ?? "main";
  const token = context.env.GITHUB_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: "GitHub token not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const api = gh(token);
  const base = `https://api.github.com/repos/${repo}`;

  try {
    // 1. Get the latest commit SHA and its tree SHA for the branch
    const refRes = await api(`${base}/git/ref/heads/${branch}`);
    if (!refRes.ok) throw new Error(`Failed to get branch ref: ${await refRes.text()}`);
    const refData = (await refRes.json()) as { object: { sha: string } };
    const latestCommitSha = refData.object.sha;

    const commitRes = await api(`${base}/git/commits/${latestCommitSha}`);
    if (!commitRes.ok) throw new Error(`Failed to get commit: ${await commitRes.text()}`);
    const commitData = (await commitRes.json()) as { tree: { sha: string } };
    const baseTreeSha = commitData.tree.sha;

    // 2. Create blobs for each file
    const treeEntries: { path: string; mode: string; type: string; sha: string }[] = [];
    for (const f of files) {
      const encoded = btoa(
        unescape(encodeURIComponent(JSON.stringify(f.content, null, 2) + "\n"))
      );
      const blobRes = await api(`${base}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({ content: encoded, encoding: "base64" }),
      });
      if (!blobRes.ok) throw new Error(`Failed to create blob: ${await blobRes.text()}`);
      const blobData = (await blobRes.json()) as { sha: string };
      treeEntries.push({
        path: f.file,
        mode: "100644",
        type: "blob",
        sha: blobData.sha,
      });
    }

    // 3. Create a new tree with changes
    const treeRes = await api(`${base}/git/trees`, {
      method: "POST",
      body: JSON.stringify({ base_tree: baseTreeSha, tree: treeEntries }),
    });
    if (!treeRes.ok) throw new Error(`Failed to create tree: ${await treeRes.text()}`);
    const treeData = (await treeRes.json()) as { sha: string };

    // 4. Create a new commit
    const changedNames = files.map(f => f.file.split("/").pop()).join(", ");
    const commitMsg = message ?? `Update ${changedNames} via CMS`;
    const newCommitRes = await api(`${base}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: commitMsg,
        tree: treeData.sha,
        parents: [latestCommitSha],
      }),
    });
    if (!newCommitRes.ok) throw new Error(`Failed to create commit: ${await newCommitRes.text()}`);
    const newCommitData = (await newCommitRes.json()) as { sha: string };

    // 5. Update the branch ref
    const updateRefRes = await api(`${base}/git/refs/heads/${branch}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: newCommitData.sha }),
    });
    if (!updateRefRes.ok) throw new Error(`Failed to update ref: ${await updateRefRes.text()}`);

    return new Response(
      JSON.stringify({ ok: true, commit: newCommitData.sha }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to commit", details: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
