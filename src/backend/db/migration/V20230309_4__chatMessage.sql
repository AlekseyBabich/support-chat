create table if not exists "ChatMessages" (
    "id" text primary key,
    "chatId" text not null references "Chats"(id),
    "userId" text not null references "Users"(id),
    "content" text not null,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
);

alter table "ChatMessages" enable row level security;
