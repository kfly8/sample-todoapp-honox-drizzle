## What is this?

This project is a sample project to try these stack:

- Web application framework
    - [Hono](https://hono.dev/) + [honox](https://github.com/honojs/honox)
- Database
    - [SQLite](https://www.sqlite.org/)
    - [drizzle](https://orm.drizzle.team/)
- Validation
    - [Zod](https://zod.dev/)
- Test
    - [Bun test](https://bun.sh/docs/cli/test)
- Runtime
    - [Bun](https://bun.sh/)
- misc
    - [Vite](https://vite.dev/)
    - [Biome](https://biomejs.dev/)

## Setup

### Clone the repository

```bash
git clone https://github.com/kfly8/sample-todoapp-honox-drizzle.git
cd sample-todoapp-honox-drizzle
```

### Install dependencies

```bash
bun install
```

### Database setup

```bash
bunx drizzle-kit migrate
```

### Start the development server

```bash
bun run dev
```

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

