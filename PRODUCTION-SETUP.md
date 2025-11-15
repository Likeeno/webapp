# Production Setup Guide

This guide will help you set up the Likeeno application for production using Docker and PostgreSQL.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- A server with at least 2GB RAM
- Domain name pointing to your server's IP address
- Ports 80, 443, and optionally 5432 open

## Step 1: Prepare Environment Variables

1. **Copy the production environment template:**
   ```bash
   cp .env.production.example .env
   ```

2. **Edit `.env` file** with your actual values:
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Generate a strong AUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and set it as `AUTH_SECRET` in your `.env` file.

4. **Set a strong PostgreSQL password:**
   - Use a password generator or: `openssl rand -base64 24`
   - Set `POSTGRES_PASSWORD` in your `.env` file

5. **Update AUTH_URL:**
   - Set `AUTH_URL=https://yourdomain.com` (use your actual domain)

## Step 2: Build and Start Services

1. **Build the Docker images:**
   ```bash
   docker compose build
   ```

2. **Start all services:**
   ```bash
   docker compose up -d
   ```

3. **Check service status:**
   ```bash
   docker compose ps
   ```

   All services should show "Up" status.

## Step 3: Verify Database Setup

The database migrations run automatically on container startup. To verify:

1. **Check migration status:**
   ```bash
   docker compose exec app pnpm prisma migrate status --schema=prisma/schema.postgres.prisma
   ```

2. **View database logs:**
   ```bash
   docker compose logs postgres
   ```

3. **Optional: Seed initial data:**
   ```bash
   docker compose exec app pnpm db:seed
   ```

## Step 4: Set Up SSL/HTTPS

1. **Make sure your domain DNS points to your server's IP**

2. **Request SSL certificate:**
   ```bash
   docker compose run --rm certbot certonly \
       --webroot \
       --webroot-path=/var/www/certbot \
       --email your-email@example.com \
       --agree-tos \
       --no-eff-email \
       --force-renewal \
       -d yourdomain.com
   ```

3. **Update nginx.conf** with your domain:
   - Replace `likeeno.com` with your actual domain in the SSL certificate paths

4. **Enable HTTPS redirect:**
   ```bash
   ./enable-https-redirect.sh
   ```

5. **Restart Nginx:**
   ```bash
   docker compose restart nginx
   ```

## Step 5: Verify Everything Works

1. **Check application logs:**
   ```bash
   docker compose logs -f app
   ```

2. **Check Nginx logs:**
   ```bash
   docker compose logs -f nginx
   ```

3. **Test your domain:**
   - Visit `https://yourdomain.com` in a browser
   - Verify HTTPS is working (green lock icon)
   - Test login/registration

## Production Checklist

- [ ] Strong `AUTH_SECRET` generated and set
- [ ] Strong `POSTGRES_PASSWORD` set
- [ ] `AUTH_URL` set to your production domain with `https://`
- [ ] All API keys (JAP, Sizpay, Google) configured
- [ ] SSL certificate obtained and configured
- [ ] HTTPS redirect enabled
- [ ] Database migrations applied successfully
- [ ] Application accessible via HTTPS
- [ ] Firewall configured (ports 80, 443 open)
- [ ] Regular backups configured (see below)

## Useful Commands

### View Logs
```bash
# Application logs
docker compose logs -f app

# Nginx logs
docker compose logs -f nginx

# PostgreSQL logs
docker compose logs -f postgres

# All logs
docker compose logs -f
```

### Restart Services
```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart app
docker compose restart nginx
```

### Update Application
```bash
# Pull latest code
git pull

# Rebuild and restart
docker compose up -d --build

# Run migrations if schema changed
docker compose exec app pnpm prisma migrate deploy --schema=prisma/schema.postgres.prisma
```

### Database Management

**Backup:**
```bash
docker compose exec postgres pg_dump -U likeeno likeeno_db > backup-$(date +%Y%m%d-%H%M%S).sql
```

**Restore:**
```bash
docker compose exec -T postgres psql -U likeeno likeeno_db < backup.sql
```

**Access Prisma Studio:**
```bash
docker compose exec app pnpm prisma studio --schema=prisma/schema.postgres.prisma
```

### Health Checks
```bash
# Check all services
docker compose ps

# Check database connection
docker compose exec app pg_isready -h postgres -p 5432

# Check application health
curl http://localhost/api/health  # if you have a health endpoint
```

## Monitoring

### Set Up Log Rotation

Create `/etc/logrotate.d/docker-compose`:
```
/path/to/your/project/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    missingok
}
```

### Resource Monitoring

Monitor container resources:
```bash
docker stats
```

## Security Best Practices

1. **Change default passwords** - Never use default values in production
2. **Use secrets management** - Consider using Docker secrets or a secrets manager
3. **Regular updates** - Keep Docker images and dependencies updated
4. **Firewall** - Only expose necessary ports (80, 443)
5. **Backup regularly** - Set up automated database backups
6. **Monitor logs** - Set up log aggregation and monitoring
7. **SSL/TLS** - Always use HTTPS in production
8. **Environment variables** - Never commit `.env` to version control

## Troubleshooting

### Application won't start
```bash
# Check logs
docker compose logs app

# Check environment variables
docker compose exec app env | grep DATABASE

# Verify database connection
docker compose exec app pg_isready -h postgres
```

### Database connection errors
```bash
# Check PostgreSQL is running
docker compose ps postgres

# Check database logs
docker compose logs postgres

# Verify DATABASE_URL format
docker compose exec app printenv DATABASE_URL
```

### SSL certificate issues
```bash
# Check certificate files
docker compose exec nginx ls -la /etc/letsencrypt/live/

# Test nginx configuration
docker compose exec nginx nginx -t

# Check certbot logs
docker compose logs certbot
```

### Migration errors
```bash
# Check migration status
docker compose exec app pnpm prisma migrate status --schema=prisma/schema.postgres.prisma

# View migration history
docker compose exec app pnpm prisma migrate resolve --applied <migration_name> --schema=prisma/schema.postgres.prisma
```

## Backup Strategy

### Automated Daily Backups

Create a cron job for daily backups:

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 2 AM)
0 2 * * * cd /path/to/your/project && docker compose exec -T postgres pg_dump -U likeeno likeeno_db > backups/backup-$(date +\%Y\%m\%d).sql && find backups/ -name "backup-*.sql" -mtime +7 -delete
```

### Manual Backup Script

Create `scripts/backup-db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR
docker compose exec -T postgres pg_dump -U likeeno likeeno_db > $BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).sql
echo "Backup created: $BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).sql"
```

## Scaling

For high traffic, consider:

1. **Load balancing** - Use multiple app instances behind a load balancer
2. **Database optimization** - Add indexes, connection pooling
3. **Caching** - Implement Redis for session storage
4. **CDN** - Use a CDN for static assets
5. **Monitoring** - Set up APM (Application Performance Monitoring)

## Support

For issues or questions:
- Check logs: `docker compose logs`
- Review this guide
- Check GitHub issues
- Contact support

