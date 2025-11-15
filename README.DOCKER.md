# Docker Setup Guide

This guide explains how to set up and run the Likeeno application using Docker Compose with PostgreSQL.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. **Copy the production environment file:**
   ```bash
   cp .env.production.example .env
   ```

2. **Edit `.env` file** with your actual configuration values:
   - Database credentials (PostgreSQL)
   - API keys (JAP, Sizpay, Google OAuth)
   - AUTH_SECRET (generate with: `openssl rand -base64 32`)
   - AUTH_URL (your production domain with https://)

3. **Run the setup script (recommended):**
   ```bash
   ./scripts/setup-production.sh
   ```

   Or manually:

4. **Build and start the services:**
   ```bash
   docker compose build
   docker compose up -d
   ```

5. **Database migrations run automatically** on container startup. To verify:
   ```bash
   docker compose exec app pnpm prisma migrate status --schema=prisma/schema.postgres.prisma
   ```

6. **Seed the database (optional):**
   ```bash
   docker compose exec app pnpm db:seed
   ```

## Important Notes

- **The Docker setup automatically uses PostgreSQL** - no need to change schema files
- **Migrations run automatically** via the entrypoint script
- **Use `schema.postgres.prisma`** for production (already configured in Dockerfile)

## Services

- **PostgreSQL**: Database server on port 5432
- **Next.js App**: Application server on port 3000 (internal)
- **Nginx**: Reverse proxy on ports 80 (HTTP) and 443 (HTTPS)

## Accessing the Application

- **Application**: http://localhost
- **Database**: localhost:5432 (use credentials from `.env`)

## Useful Commands

### View logs
```bash
docker-compose logs -f app
docker-compose logs -f nginx
docker-compose logs -f postgres
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes database data)
```bash
docker-compose down -v
```

### Rebuild after code changes
```bash
docker-compose up -d --build
```

### Execute commands in container
```bash
docker compose exec app sh
docker compose exec app pnpm prisma studio --schema=prisma/schema.postgres.prisma
```

### Database backup
```bash
docker compose exec postgres pg_dump -U likeeno likeeno_db > backup.sql
```

### Database restore
```bash
docker compose exec -T postgres psql -U likeeno likeeno_db < backup.sql
```

## Environment Variables

See `.env.production.example` for all required environment variables.

**Required for production:**
- `DATABASE_PROVIDER=postgresql` (automatically set in docker-compose.yml)
- `AUTH_SECRET` (generate with `openssl rand -base64 32`)
- `AUTH_URL` (your production domain with https://)
- `POSTGRES_PASSWORD` (strong password)
- All API keys (JAP, Sizpay, Google OAuth)

## SSL/HTTPS Setup

To enable HTTPS:

1. Place your SSL certificates in `nginx/ssl/`:
   - `cert.pem` (certificate)
   - `key.pem` (private key)

2. Uncomment the HTTPS server block in `nginx.conf`

3. Update `AUTH_URL` in `.env` to use `https://`

4. Restart nginx:
   ```bash
   docker-compose restart nginx
   ```

## Troubleshooting

### Database connection issues
- Check PostgreSQL is healthy: `docker-compose ps`
- Verify DATABASE_URL in `.env`
- Check logs: `docker-compose logs postgres`

### Application not starting
- Check application logs: `docker-compose logs app`
- Verify all environment variables are set
- Check Prisma migrations: `docker-compose exec app pnpm prisma migrate status`

### Nginx not proxying correctly
- Check nginx logs: `docker-compose logs nginx`
- Verify nginx config: `docker-compose exec nginx nginx -t`
- Restart nginx: `docker-compose restart nginx`

## Production Considerations

1. **Change default passwords** in `.env`
2. **Use strong AUTH_SECRET** (generate with `openssl rand -base64 32`)
3. **Enable HTTPS** with valid SSL certificates (see PRODUCTION-SETUP.md)
4. **Set up regular database backups** (see PRODUCTION-SETUP.md)
5. **Configure proper firewall rules** (ports 80, 443)
6. **Use secrets management** for sensitive data
7. **Monitor resource usage** and scale as needed
8. **Set AUTH_URL** to your production domain with https://

## Full Production Setup

For a complete production setup guide, see [PRODUCTION-SETUP.md](./PRODUCTION-SETUP.md)

