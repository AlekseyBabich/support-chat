create table if not exists "ChatMessages" (
    "id" text primary key,
    "chatId" text not null references "Chats"(id),
    "userId" text not null references "Users"(id),
    "content" text not null,
    "createdAt" timestamptz not null,
    "deletedAt" timestamptz
);

create or replace function auth.participant_id()
    returns text
as $$
declare
    chat_user_id text;
    chat_id text;
begin
    select current_setting('request.jwt.claims', true)::jsonb->'user_metadata'->>'chat_user_id'
    into chat_user_id;

    select "chatId" from "ChatUsers"
        where "userId" = chat_user_id
        into chat_id;

    return chat_id;
end
$$ language plpgsql stable;

alter table "ChatMessages" enable row level security;
create policy "Allow user read access" on public."ChatMessages" for select
    using (auth.participant_id() = "chatId" );
grant all on table "ChatMessages" to anon, authenticated, service_role, postgres;
drop publication if exists supabase_realtime;
create publication supabase_realtime;
alter publication supabase_realtime add table public."ChatMessages";