#!/bin/bash

# Script to initialize Let's Encrypt certificates
# Usage: ./init-letsencrypt.sh your-domain.com your-email@example.com

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./init-letsencrypt.sh <domain> <email>"
    echo "Example: ./init-letsencrypt.sh example.com admin@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo "🚀 Initializing Let's Encrypt for domain: $DOMAIN"
echo "📧 Email: $EMAIL"

# Create necessary directories
mkdir -p nginx/ssl

# Start nginx first (HTTP only, no redirect yet)
echo "📝 Starting Nginx for certificate verification..."
docker-compose up -d nginx

# Wait for nginx to be ready
echo "⏳ Waiting for Nginx to be ready..."
sleep 10

# Request certificate
echo "📜 Requesting SSL certificate from Let's Encrypt..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d $DOMAIN

if [ $? -eq 0 ]; then
    echo "✅ Certificate obtained successfully!"
    echo "📝 Updating nginx.conf with your domain..."
    
    # Update nginx.conf with the actual domain
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/YOUR_DOMAIN/$DOMAIN/g" nginx.conf
        # Enable HTTPS redirect
        sed -i '' 's|#     return 301|        return 301|g' nginx.conf
        sed -i '' 's|# location / {|# location / {|g' nginx.conf
        sed -i '' '/# Serve directly on HTTP/,/^        }$/d' nginx.conf
    else
        # Linux
        sed -i "s/YOUR_DOMAIN/$DOMAIN/g" nginx.conf
        # Enable HTTPS redirect
        sed -i 's|#     return 301|        return 301|g' nginx.conf
        sed -i '/# Serve directly on HTTP/,/^        }$/d' nginx.conf
    fi
    
    echo "🔄 Restarting Nginx with SSL configuration..."
    docker-compose restart nginx
    
    echo ""
    echo "✅ SSL setup complete! Your site should now be accessible via HTTPS."
    echo "🔒 Certificate will auto-renew every 12 hours via the certbot service."
    echo ""
    echo "🌐 Test your SSL: https://$DOMAIN"
else
    echo "❌ Failed to obtain certificate. Please check:"
    echo "   1. Domain DNS points to this server"
    echo "   2. Port 80 is accessible from the internet"
    echo "   3. No firewall is blocking port 80"
    echo "   4. Nginx is running and accessible"
    exit 1
fi

