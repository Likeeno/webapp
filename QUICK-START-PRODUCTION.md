# Quick Start - Production Setup

## 🚀 Fast Setup (5 minutes)

### 1. Prepare Environment
```bash
# Copy environment template
cp .env.production.example .env

# Edit with your values
nano .env
```

**Required values to set:**
- `AUTH_SECRET` - Generate: `openssl rand -base64 32`
- `POSTGRES_PASSWORD` - Strong password
- `AUTH_URL` - Your domain: `https://yourdomain.com`
- API keys (JAP, Sizpay, Google OAuth)

### 2. Run Setup Script
```bash
./scripts/setup-production.sh
```

This will:
- ✅ Generate secure passwords
- ✅ Build Docker images
- ✅ Start all services
- ✅ Run database migrations automatically

### 3. Set Up SSL (if you have a domain)
```bash
# Request certificate
docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email your-email@example.com \
    --agree-tos \
    --no-eff-email \
    -d yourdomain.com

# Enable HTTPS redirect
./enable-https-redirect.sh
```

### 4. Verify
```bash
# Check services
docker compose ps

# View logs
docker compose logs -f app

# Test your site
curl https://yourdomain.com
```

## 📋 Build Process

### Initial Build
```bash
docker compose build
docker compose up -d
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

## 🔍 Common Commands

```bash
# View logs
docker compose logs -f app
docker compose logs -f nginx
docker compose logs -f postgres

# Restart services
docker compose restart
docker compose restart app

# Database backup
docker compose exec postgres pg_dump -U likeeno likeeno_db > backup.sql

# Access Prisma Studio
docker compose exec app pnpm prisma studio --schema=prisma/schema.postgres.prisma
```

## ✅ Production Checklist

- [ ] `.env` file configured with real values
- [ ] Strong `AUTH_SECRET` generated
- [ ] Strong `POSTGRES_PASSWORD` set
- [ ] `AUTH_URL` set to production domain with `https://`
- [ ] All API keys configured
- [ ] SSL certificate obtained
- [ ] HTTPS redirect enabled
- [ ] Services running: `docker compose ps`
- [ ] Application accessible: `https://yourdomain.com`

## 📚 Full Documentation

- **Complete Setup**: [PRODUCTION-SETUP.md](./PRODUCTION-SETUP.md)
- **Docker Guide**: [README.DOCKER.md](./README.DOCKER.md)
- **Database Guide**: [README.DATABASE.md](./README.DATABASE.md)

## 🆘 Troubleshooting

**Services won't start:**
```bash
docker compose logs
docker compose ps
```

**Database issues:**
```bash
docker compose logs postgres
docker compose exec app pnpm prisma migrate status --schema=prisma/schema.postgres.prisma
```

**SSL issues:**
```bash
docker compose logs certbot
docker compose exec nginx nginx -t
```

