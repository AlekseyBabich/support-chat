CREATE TABLE IF NOT EXISTS auth_login_link(
    id TEXT PRIMARY KEY,

    userId TEXT REFERENCES chat_user(id),
    created_at TIMESTAMPTZ NOT NULL,
    activated_at TIMESTAMPTZ,
    expire_at TIMESTAMPTZ NOT NULL
);


