## What is this?

This project is a sample project to try these stack:

- [x] [hono](https://hono.dev/)
- [x] [honox](https://github.com/honojs/honox)
- [x] [drizzle](https://orm.drizzle.team/)
- [x] [Zod](https://zod.dev/)
- [x] [Vite](https://vite.dev/)
- [x] [Vitest](https://vitest.dev/)
- [x] [Biome](https://biomejs.dev/)
- [x] [Bun](https://bun.sh/)

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

