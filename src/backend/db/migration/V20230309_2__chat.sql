create table if not exists "Chats" (
    "id" text primary key,
    "userId" text not null references "Users"(id),
    "name" text not null,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
)
