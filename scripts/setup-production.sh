#!/bin/bash

# Production Setup Script for Likeeno
# This script helps set up the production environment

set -e

echo "🚀 Likeeno Production Setup"
echo "=========================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    if [ -f .env.production.example ]; then
        cp .env.production.example .env
        echo "✅ Created .env file"
        echo "⚠️  Please edit .env and fill in your configuration values"
        echo ""
        read -p "Press Enter after you've edited .env file..."
    else
        echo "❌ .env.production.example not found!"
        exit 1
    fi
else
    echo "✅ .env file already exists"
fi

# Generate AUTH_SECRET if not set
if ! grep -q "AUTH_SECRET=.*[A-Za-z0-9]" .env || grep -q "AUTH_SECRET=CHANGE_THIS" .env; then
    echo "🔐 Generating AUTH_SECRET..."
    AUTH_SECRET=$(openssl rand -base64 32)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|AUTH_SECRET=.*|AUTH_SECRET=$AUTH_SECRET|" .env
    else
        sed -i "s|AUTH_SECRET=.*|AUTH_SECRET=$AUTH_SECRET|" .env
    fi
    echo "✅ Generated and set AUTH_SECRET"
fi

# Generate PostgreSQL password if using default
if grep -q "POSTGRES_PASSWORD=likeeno_password" .env || grep -q "POSTGRES_PASSWORD=CHANGE_THIS" .env; then
    echo "🔐 Generating PostgreSQL password..."
    POSTGRES_PASSWORD=$(openssl rand -base64 24 | tr -d "=+/" | cut -c1-25)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$POSTGRES_PASSWORD|" .env
    else
        sed -i "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$POSTGRES_PASSWORD|" .env
    fi
    echo "✅ Generated and set POSTGRES_PASSWORD"
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo ""
echo "🐳 Building Docker images..."
docker compose build

echo ""
echo "🚀 Starting services..."
docker compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
else
    echo "⚠️  Some services may not be running. Check with: docker compose ps"
fi

echo ""
echo "📊 Service Status:"
docker compose ps

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Check logs: docker compose logs -f"
echo "   2. Set up SSL: See PRODUCTION-SETUP.md"
echo "   3. Seed database (optional): docker compose exec app pnpm db:seed"
echo ""
echo "🌐 Your application should be accessible at:"
echo "   - HTTP: http://your-server-ip"
echo "   - HTTPS: https://yourdomain.com (after SSL setup)"
echo ""

