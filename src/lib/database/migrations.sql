CREATE TABLE users (
  id VARCHAR(15) NOT NULL,
  username TEXT NOT NULL,
  avatar TEXT NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE user_keys (
  id VARCHAR(255) NOT NULL,
  user_id VARCHAR(15) NOT NULL,
  hashed_password VARCHAR(255),
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

CREATE TABLE user_sessions (
  id VARCHAR(127) NOT NULL,
  user_id VARCHAR(15) NOT NULL,
  active_expires BIGINT NOT NULL,
  idle_expires BIGINT NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
  PRIMARY KEY (id)
);

CREATE TABLE links (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
	url TEXT NOT NULL,
	clicks INTEGER NOT NULL DEFAULT 0,
	created_at INTEGER NOT NULL DEFAULT (cast(unixepoch() as int)),
	user_id varchar(15) NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX links_key_idx ON links(key);
