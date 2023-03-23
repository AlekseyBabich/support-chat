create table if not exists "ChatMessages" (
    "id" text primary key,
    "chatId" text not null references "Chats"(id),
    "userId" text not null references "Users"(id),
    "content" text not null,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
);

alter table "ChatMessages" enable row level security;
create policy "Allow user read access" on public."ChatMessages" for select
    USING (true);
GRANT ALL ON TABLE "ChatMessages" TO anon, authenticated, service_role, postgres;
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime;
ALTER PUBLICATION supabase_realtime ADD TABLE public."ChatMessages";