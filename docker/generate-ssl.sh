#!/bin/bash

# Change to the directory where docker-compose.yml is located
cd "$(dirname "$0")"

DOMAIN="annhien.leanhduc.id.vn"
EMAIL="ducvui2003@gmail.com"  # Replace with your real email

echo "Generating SSL certificate for $DOMAIN..."

docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d $DOMAIN \
  --email $EMAIL --agree-tos --no-eff-email
