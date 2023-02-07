create table if not exists "AuthLoginLinks" (
  "id" text primary key,
  "userId" numeric not null,
  "createdAt" timestamptz not null,
  "activatedAt" timestamptz,
  "expireAt" timestamptz not null
)
