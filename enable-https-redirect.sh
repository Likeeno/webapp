#!/bin/bash

# Script to enable HTTPS redirect after SSL certificate is obtained

echo "🔒 Enabling HTTPS redirect in nginx.conf..."

# Backup
cp nginx.conf nginx.conf.backup

# Enable redirect, disable HTTP proxy
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
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
    # Remove the closing brace of the commented section
    sed -i '' '/^        # proxy_cache_bypass/,/^        }$/{
        /^        }$/d
    }' nginx.conf
else
    # Linux
    sed -i 's|#     return 301|        return 301|g' nginx.conf
    sed -i '57,67s/^/        # /' nginx.conf
fi

echo "✅ HTTPS redirect enabled!"
echo "🔄 Restarting Nginx..."
docker-compose restart nginx

echo "✅ Done! HTTP traffic will now redirect to HTTPS."

