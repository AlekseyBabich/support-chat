CREATE TABLE IF NOT EXISTS chat_user(
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL,
    deleted_at TIMESTAMPTZ
);


