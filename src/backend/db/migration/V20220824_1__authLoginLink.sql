create table if not exists "AuthLoginLinks" (
  "id" text primary key,
  "userId" bigint not null references "Users"(id),
  "createdAt" timestamptz not null,
  "activatedAt" timestamptz,
  "expireAt" timestamptz not null
)
