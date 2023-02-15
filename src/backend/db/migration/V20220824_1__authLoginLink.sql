create table if not exists "AuthLoginLinks" (
  "id" text primary key,
  "userId" text not null references "Users"(id),
  "createdAt" timestamptz not null,
  "activatedAt" timestamptz,
  "expireAt" timestamptz not null
)
