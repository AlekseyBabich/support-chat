create table if not exists "Users" (
  "id" text primary key,
  "name" text not null,
  "createdAt" timestamptz not null,
  "deletedAt" timestamptz
)
