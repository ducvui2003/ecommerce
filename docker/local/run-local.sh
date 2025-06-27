#!/bin/bash

set -e

CERT_DIR="./nginx/certs"
CERT_KEY="$CERT_DIR/localhost.key"
CERT_CRT="$CERT_DIR/localhost.crt"
COMPOSE_FILE="./docker-compose.yml"

# Step 1: Create cert directory if not exists
mkdir -p "$CERT_DIR"

# Step 2: Generate self-signed cert if not already present
if [[ ! -f "$CERT_KEY" || ! -f "$CERT_CRT" ]]; then
  echo "🔐 Generating self-signed SSL certificate for localhost..."
  openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout "$CERT_KEY" \
    -out "$CERT_CRT" \
    -subj "/C=US/ST=Local/L=Dev/O=Dev/CN=localhost"
  echo "✅ Certificate created at: $CERT_DIR"
else
  echo "🔐 Certificate already exists. Skipping generation."
fi

# Step 3: Run Docker Compose
echo "🐳 Starting Docker Compose using $COMPOSE_FILE..."
docker compose -f "$COMPOSE_FILE" up --build

