interface Env {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  GITHUB_TOKEN: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const checks: Record<string, unknown> = {};

  // Check D1 binding
  checks.d1_bound = !!context.env.DB;
  checks.d1_type = typeof context.env.DB;
  checks.d1_methods = context.env.DB
    ? { batch: "batch" in context.env.DB, exec: "exec" in context.env.DB, prepare: "prepare" in context.env.DB }
    : null;

  // Check env vars
  checks.has_auth_secret = !!context.env.BETTER_AUTH_SECRET;
  checks.auth_secret_length = context.env.BETTER_AUTH_SECRET?.length ?? 0;
  checks.has_github_token = !!context.env.GITHUB_TOKEN;

  // Check D1 tables
  if (context.env.DB) {
    try {
      const tables = await context.env.DB
        .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
        .all<{ name: string }>();
      checks.tables = tables.results.map((r) => r.name);
    } catch (e) {
      checks.tables_error = String(e);
    }
  }

  return new Response(JSON.stringify(checks, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
