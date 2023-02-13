create table if not exists "Users" (
  "id" bigint generated by default as identity primary key,
  "createdAt" timestamptz not null,
  "deletedAt" timestamptz
)