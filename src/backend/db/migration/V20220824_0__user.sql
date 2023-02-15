create table if not exists "Users" (
  "id" text primary key,
  "createdAt" timestamptz not null,
  "deletedAt" timestamptz
)
