-- Content tables for CMS CRUD (news, committee, teams)

CREATE TABLE IF NOT EXISTS "news_item" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "title" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "body" TEXT,
  "link" TEXT NOT NULL,
  "linkText" TEXT NOT NULL,
  -- JSON string array of section ids; NULL/empty means "all"
  "sections" TEXT,
  "createdAt" INTEGER NOT NULL,
  "updatedAt" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_news_item_updatedAt" ON "news_item" ("updatedAt");

CREATE TABLE IF NOT EXISTS "committee_member" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "role" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "contact" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" INTEGER NOT NULL,
  "updatedAt" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_committee_member_sortOrder" ON "committee_member" ("sortOrder");

CREATE TABLE IF NOT EXISTS "team_section" (
  "id" TEXT PRIMARY KEY NOT NULL,
  -- The section id used by the website (e.g. seniors). Kept unique for stable URLs/filters.
  "sectionKey" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "subtitle" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "logo" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" INTEGER NOT NULL,
  "updatedAt" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_team_section_sortOrder" ON "team_section" ("sortOrder");

CREATE TABLE IF NOT EXISTS "team" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "sectionId" TEXT NOT NULL REFERENCES "team_section"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "manager" TEXT NOT NULL,
  "coach" TEXT NOT NULL,
  "contact" TEXT NOT NULL,
  "photo" TEXT,
  "slug" TEXT,
  "sidebar" INTEGER NOT NULL DEFAULT 0,
  "managerLabel" TEXT,
  "coachLabel" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" INTEGER NOT NULL,
  "updatedAt" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_team_sectionId_sortOrder" ON "team" ("sectionId", "sortOrder");
