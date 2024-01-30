<div align="center">
  <a href="#">
    <img src="public/screenshot.png">
  </a>
</div>

## 🚀 Getting started

### Project settings:

1. **Clone the repository:**

```bash
git clone git@github.com:moaqz/shortkey.git
```

2. **Install Dependencies:**

```bash
pnpm install
```

3. **Create a .env file:**

Create a `.env` file in the root of the project and add the following variables:

```bash
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

DATABASE_URL=
DATABASE_TOKEN=

# not required for development
NEXT_PUBLIC_PRODUCTION_URL=
```

### Turso Configuration

4. **Set Up Turso:**

Go to [Turso Quickstart](https://docs.turso.tech/quickstart) to create your own database and obtain the token.

```bash
## Install the Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

## Signup to Turso
turso auth signup

## Create a database
turso db create mydatabase

# Get the database url
turso db list

# Get the database token
turso db tokens create mydatabase
```

5. **Run Migrations:**

Run the following SQL commands in the Turso CLI:

```bash
# Access the SQL CLI:
turso db shell mydatabase
```

```sql
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
  slug TEXT NOT NULL UNIQUE,
	url TEXT NOT NULL,
	clicks INTEGER NOT NULL DEFAULT 0,
	created_at INTEGER NOT NULL DEFAULT (cast(unixepoch() as int)),
	user_id varchar(15) NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX links_slug_idx ON links(slug);
CREATE INDEX links_user_idx ON links(user_id);
```

### Github OAuth Provider Settings:

6. **Configure GitHub OAuth:**

- [Create a new GitHub OAuth app](https://github.com/settings/applications/new).
- Go to "Client secrets" and generate a new client secret. Paste it into the `GITHUB_CLIENT_SECRET` environment variable.
- Copy the Client ID and paste it into the `GITHUB_ID` environment variable.

### Run the project:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result 🚀
