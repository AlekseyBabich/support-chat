create table if not exists "ChatUsers" (
    "id" text primary key,
    "chatId" text not null references "Chats"(id),
    "userId" text not null references "Users"(id),
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
)
