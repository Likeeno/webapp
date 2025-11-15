#!/bin/bash

# Quick SSL setup script for likeeno.com
# This script will:
# 1. Start services
# 2. Obtain SSL certificate
# 3. Enable HTTPS redirect

DOMAIN="likeeno.com"
EMAIL="likeenoofficial@gmail.com"

echo "🚀 Setting up SSL for $DOMAIN"
echo "📧 Email: $EMAIL"
echo ""

# Step 1: Make sure init script is executable
chmod +x init-letsencrypt.sh

# Step 2: Start all services (nginx needs to be running for certbot)
echo "📦 Starting Docker services..."
docker-compose up -d nginx

# Wait for nginx to be ready
echo "⏳ Waiting for Nginx to be ready..."
sleep 10

# Step 3: Request SSL certificate
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
    echo ""
    echo "✅ Certificate obtained successfully!"
    
    # Step 4: Enable HTTPS redirect in nginx.conf
    echo "📝 Enabling HTTPS redirect..."
    
    # Create backup
    cp nginx.conf nginx.conf.backup
    
    # Enable HTTPS redirect (uncomment the redirect, comment out HTTP proxy)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS sed
        sed -i '' 's|#     return 301|        return 301|g' nginx.conf
        sed -i '' 's|        proxy_pass http://nextjs;|        # proxy_pass http://nextjs;|g' nginx.conf
        sed -i '' 's|        proxy_http_version 1.1;|        # proxy_http_version 1.1;|g' nginx.conf
        sed -i '' 's|        proxy_set_header Upgrade|        # proxy_set_header Upgrade|g' nginx.conf
        sed -i '' 's|        proxy_set_header Connection|        # proxy_set_header Connection|g' nginx.conf
        sed -i '' 's|        proxy_set_header Host|        # proxy_set_header Host|g' nginx.conf
        sed -i '' 's|        proxy_set_header X-Real-IP|        # proxy_set_header X-Real-IP|g' nginx.conf
        sed -i '' 's|        proxy_set_header X-Forwarded-For|        # proxy_set_header X-Forwarded-For|g' nginx.conf
        sed -i '' 's|        proxy_set_header X-Forwarded-Proto|        # proxy_set_header X-Forwarded-Proto|g' nginx.conf
        sed -i '' 's|        proxy_cache_bypass|        # proxy_cache_bypass|g' nginx.conf
        sed -i '' '/^        # proxy_cache_bypass/,/^        }$/{
            /^        }$/d
        }' nginx.conf
        sed -i '' '/^        # Serve directly on HTTP/a\
        }\
' nginx.conf
    else
        # Linux sed
        sed -i 's|#     return 301|        return 301|g' nginx.conf
        sed -i 's|        proxy_pass http://nextjs;|        # proxy_pass http://nextjs;|g' nginx.conf
        sed -i '/^        # proxy_pass/,/^        }$/d' nginx.conf
        sed -i '/^        # Serve directly on HTTP/a\
        }\
' nginx.conf
    fi
    
    # Step 5: Restart nginx
    echo "🔄 Restarting Nginx with SSL configuration..."
    docker-compose restart nginx
    
    # Step 6: Start certbot service for auto-renewal
    echo "🔄 Starting Certbot auto-renewal service..."
    docker-compose up -d certbot
    
    echo ""
    echo "✅✅✅ SSL setup complete! ✅✅✅"
    echo ""
    echo "🌐 Your site is now available at: https://$DOMAIN"
    echo "🔒 HTTP traffic will automatically redirect to HTTPS"
    echo "🔄 Certificates will auto-renew every 12 hours"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update AUTH_URL in your .env file to: https://$DOMAIN"
    echo "   2. Restart the app service: docker-compose restart app"
    echo ""
else
    echo ""
    echo "❌ Failed to obtain certificate."
    echo ""
    echo "Please check:"
    echo "   1. Domain DNS points to this server's IP"
    echo "   2. Port 80 is accessible from the internet"
    echo "   3. No firewall is blocking port 80"
    echo "   4. Nginx is running: docker-compose ps"
    echo ""
    exit 1
fi

