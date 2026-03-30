import { D1Database } from "@cloudflare/workers-types";

const TABLE_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "user" ("id" TEXT PRIMARY KEY NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL UNIQUE, "emailVerified" INTEGER NOT NULL DEFAULT 0, "image" TEXT, "role" TEXT NOT NULL DEFAULT 'member', "createdAt" INTEGER NOT NULL, "updatedAt" INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS "session" ("id" TEXT PRIMARY KEY NOT NULL, "expiresAt" INTEGER NOT NULL, "token" TEXT NOT NULL UNIQUE, "createdAt" INTEGER NOT NULL, "updatedAt" INTEGER NOT NULL, "ipAddress" TEXT, "userAgent" TEXT, "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE)`,
  `CREATE TABLE IF NOT EXISTS "account" ("id" TEXT PRIMARY KEY NOT NULL, "accountId" TEXT NOT NULL, "providerId" TEXT NOT NULL, "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, "accessToken" TEXT, "refreshToken" TEXT, "idToken" TEXT, "accessTokenExpiresAt" INTEGER, "refreshTokenExpiresAt" INTEGER, "scope" TEXT, "password" TEXT, "createdAt" INTEGER NOT NULL, "updatedAt" INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS "verification" ("id" TEXT PRIMARY KEY NOT NULL, "identifier" TEXT NOT NULL, "value" TEXT NOT NULL, "expiresAt" INTEGER NOT NULL, "createdAt" INTEGER, "updatedAt" INTEGER)`,
  `CREATE TABLE IF NOT EXISTS "news_item" ("id" TEXT PRIMARY KEY NOT NULL, "title" TEXT NOT NULL, "text" TEXT NOT NULL, "body" TEXT, "link" TEXT NOT NULL, "linkText" TEXT NOT NULL, "sections" TEXT, "createdAt" INTEGER NOT NULL, "updatedAt" INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS "idx_news_item_updatedAt" ON "news_item" ("updatedAt")`,
  `CREATE TABLE IF NOT EXISTS "committee_member" ("id" TEXT PRIMARY KEY NOT NULL, "role" TEXT NOT NULL, "name" TEXT NOT NULL, "contact" TEXT NOT NULL, "sortOrder" INTEGER NOT NULL DEFAULT 0, "createdAt" INTEGER NOT NULL, "updatedAt" INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS "idx_committee_member_sortOrder" ON "committee_member" ("sortOrder")`,
  `CREATE TABLE IF NOT EXISTS "team_section" ("id" TEXT PRIMARY KEY NOT NULL, "sectionKey" TEXT NOT NULL UNIQUE, "name" TEXT NOT NULL, "subtitle" TEXT NOT NULL, "icon" TEXT NOT NULL, "logo" TEXT, "sortOrder" INTEGER NOT NULL DEFAULT 0, "createdAt" INTEGER NOT NULL, "updatedAt" INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS "idx_team_section_sortOrder" ON "team_section" ("sortOrder")`,
  `CREATE TABLE IF NOT EXISTS "team" ("id" TEXT PRIMARY KEY NOT NULL, "sectionId" TEXT NOT NULL REFERENCES "team_section"("id") ON DELETE CASCADE, "name" TEXT NOT NULL, "description" TEXT NOT NULL, "manager" TEXT NOT NULL, "coach" TEXT NOT NULL, "contact" TEXT NOT NULL, "photo" TEXT, "slug" TEXT, "sidebar" INTEGER NOT NULL DEFAULT 0, "managerLabel" TEXT, "coachLabel" TEXT, "sortOrder" INTEGER NOT NULL DEFAULT 0, "createdAt" INTEGER NOT NULL, "updatedAt" INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS "idx_team_sectionId_sortOrder" ON "team" ("sectionId", "sortOrder")`,
];

let ensureTablesPromise: Promise<void> | null = null;

export const ensureTables = (db: D1Database): Promise<void> => {
  if (!ensureTablesPromise) {
    ensureTablesPromise = (async () => {
      for (const sql of TABLE_STATEMENTS) {
        await db.exec(sql);
      }
    })();
  }
  return ensureTablesPromise;
};
