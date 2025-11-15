# Database Configuration Guide

This project supports both SQLite (for development) and PostgreSQL (for production).

## Environment Variables

Set `DATABASE_PROVIDER` in your `.env` file:
- `DATABASE_PROVIDER=sqlite` - For development (default)
- `DATABASE_PROVIDER=postgresql` - For production

## Development (SQLite)

1. Create `.env` file:
```bash
DATABASE_PROVIDER=sqlite
DATABASE_URL="file:./dev.db"
```

2. Generate Prisma Client:
```bash
pnpm db:generate
```

3. Run migrations:
```bash
pnpm db:migrate
```

4. Seed database (optional):
```bash
pnpm db:seed
```

## Production (PostgreSQL)

1. Set environment variables:
```bash
DATABASE_PROVIDER=postgresql
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
```

2. Generate Prisma Client:
```bash
DATABASE_PROVIDER=postgresql pnpm db:generate
```

3. Deploy migrations:
```bash
DATABASE_PROVIDER=postgresql pnpm db:migrate:deploy
```

## Docker Setup

The Docker setup automatically uses PostgreSQL:
- `DATABASE_PROVIDER=postgresql` is set in `docker-compose.yml`
- The Dockerfile uses `schema.postgres.prisma` for building
- Migrations run automatically on container startup

## Schema Files

- `prisma/schema.prisma` - SQLite schema (development)
- `prisma/schema.postgres.prisma` - PostgreSQL schema (production)

Both schemas have the same models, but differ in:
- Default ID generation (`cuid()` for SQLite, `uuid()` for PostgreSQL)
- JSON field types (`String?` for SQLite, `Json?` for PostgreSQL)
- Text field types (SQLite doesn't need `@db.Text`)

## Available Scripts

- `pnpm db:generate` - Generate Prisma Client (uses DATABASE_PROVIDER)
- `pnpm db:migrate` - Create and apply migrations (development)
- `pnpm db:migrate:deploy` - Apply migrations (production)
- `pnpm db:seed` - Seed the database
- `pnpm db:studio` - Open Prisma Studio

## Switching Between Databases

To switch from SQLite to PostgreSQL:

1. Update `.env`:
```bash
DATABASE_PROVIDER=postgresql
DATABASE_URL="postgresql://..."
```

2. Generate client:
```bash
pnpm db:generate
```

3. Run migrations:
```bash
pnpm db:migrate
```

Note: You'll need to migrate your data separately if switching databases.

