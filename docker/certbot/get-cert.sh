#!/bin/bash

EMAIL="ducvui2003@email.com"
DOMAIN="annhien.leanhduc.id.vn"
WEBROOT_PATH="$(pwd)/certbot/www"
LETSENCRYPT_PATH="$(pwd)/certbot/conf"

docker run --rm \
  -v "$WEBROOT_PATH:/var/www/certbot" \
  -v "$LETSENCRYPT_PATH:/etc/letsencrypt" \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN"
