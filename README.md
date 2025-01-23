![test workflow](https://github.com/github/docs/actions/workflows/test.yml/badge.svg)
[![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

<img width="511" alt="image" src="https://github.com/user-attachments/assets/170a14bb-6a81-4104-9ff7-4b5623156f5f" />


## What is this?

This project is a sample todo application to try these stack:

- Web application framework
    - [Hono](https://hono.dev/) + [honox](https://github.com/honojs/honox)
- Database
    - [SQLite](https://www.sqlite.org/)
    - [drizzle](https://orm.drizzle.team/)
- Validation
    - [Zod](https://zod.dev/)
- Test
    - [Bun test](https://bun.sh/docs/cli/test)
- CSS
    - [Tailwind CSS](https://tailwindcss.com/)
- Runtime
    - [Bun](https://bun.sh/)
- Development tool
    - [Vite](https://vite.dev/)
    - [Biome](https://biomejs.dev/)
        - code formatter, linter
    - [pre-commit](https://pre-commit.com/)
        - pre-commit manager to run biome
- misc
    - [neverthrow](https://github.com/supermacro/neverthrow)
        - Result type for TypeScript / To Handle expected errors

## Setup

First, clone this repository.

```bash
git clone https://github.com/kfly8/sample-todoapp-honox-zod-drizzle.git
cd sample-todoapp-honox-zod-drizzle
```

Next, manually install or using docker.

<details>
    <summary>Case: Manually install</summary>

Bun version 1.2 or higher is required.

```bash
# Install dependencies
bun install
```

```bash
# Database setup for development
bunx --bun drizzle-kit migrate

# Database setup for test
env NODE_ENV=test bunx --bun drizzle-kit migrate
```

```bash
# Start the development server
bun run dev
```
</details>

<details>
    <summary>Case: Using Docker</summary>

```bash
docker build --pull -t sample-todoapp .
docker run -d -p 3000:3000 sample-todoapp
```
</details>


## Migrations

### Create a new migration

1. Update schema

```bash
edit app/infra/db/schema.ts
```

2. Create a new migration

```bash
bunx drizzle-kit generate
```

3. Apply the migration

```bash
bunx drizzle-kit migrate
```

These processes is option 3 in the following document:  https://orm.drizzle.team/docs/migrations

