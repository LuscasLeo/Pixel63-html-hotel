# Contributing

## Setting up your environment

### Requirements

[Node.js](https://nodejs.org/en/) 26 or higher is required to run the server and web packages.
[PNPM](https://pnpm.io/) is required to install dependencies and run scripts.
[Docker](https://www.docker.com/) is required to run the database server.

### Setup

1. Install dependencies:

```sh
pnpm install --frozen-lockfile
```

2. Build the shared package:

```sh
pnpm --filter=@pixel63/shared build
```

3. Build the events package:

```sh
pnpm --filter=@pixel63/events generate
```

4. Build the server package:

```sh
pnpm --filter=@pixel63/server build
```

5. Build the game package:

```sh
pnpm --filter=@pixel63/game build
```

6. Build the web package:

```sh
pnpm --filter=@pixel63/web build
```

7. Start the database server:

```sh
docker compose up -d
```

8. Setup the configurations for the `server` and `web` packages:

```json
{
  "database": {
    "dialect": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "pixel63"
  }

```

9. Run the migraitions for the server package:

```sh
pnpm --filter=@pixel63/server migrate
```
10. Start the server package:

```sh
pnpm --filter=@pixel63/server start
```

11. Start the web package:

```sh
pnpm --filter=@pixel63/web start
```
