#!/bin/bash

# Desired pg_dump path (or just use command name if installed globally)
PG_DUMP="/usr/lib/postgresql/17/bin/pg_dump"

# Function to install pg_dump if missing
install_pg_dump() {
  echo "📦 Installing PostgreSQL client tools..."

  if [ -x "$(command -v apt)" ]; then
    sudo apt update
    sudo apt install -y postgresql-client
  elif [ -x "$(command -v yum)" ]; then
    sudo yum install -y postgresql
  elif [ -x "$(command -v dnf)" ]; then
    sudo dnf install -y postgresql
  else
    echo "❌ Package manager not supported. Please install pg_dump manually."
    exit 1
  fi
}

# Check pg_dump or fallback to system path
if [ ! -x "$PG_DUMP" ]; then
  if command -v pg_dump >/dev/null 2>&1; then
    PG_DUMP=$(command -v pg_dump)
  else
    install_pg_dump
    PG_DUMP=$(command -v pg_dump)
    if [ -z "$PG_DUMP" ]; then
      echo "❌ Failed to install or locate pg_dump."
      exit 1
    fi
  fi
fi

# Load environment variables from .env
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
else
  echo "❌ .env file not found at $ENV_FILE"
  exit 1
fi

# Parse DATABASE_URL
echo $DATABASE_URL
regex='^postgres(ql)?://([^:/?#]+):([^@/]+)@([^:/?#]+):?([0-9]*)/([^/?#]+)'

if [[ $DATABASE_URL =~ $regex ]]; then
  echo "✅ Valid DATABASE_URL"
  DB_USER="${BASH_REMATCH[2]}"
  DB_PASSWORD="${BASH_REMATCH[3]}"
  DB_HOST="${BASH_REMATCH[4]}"
  DB_PORT="${BASH_REMATCH[5]:-5432}"
  DB_NAME="${BASH_REMATCH[6]}"

  echo "User:     $DB_USER"
  echo "Password: $DB_PASSWORD"
  echo "Host:     $DB_HOST"
  echo "Port:     $DB_PORT"
  echo "Database: $DB_NAME"
else
  echo "❌ Invalid DATABASE_URL format"
  exit 1
fi

# Timestamp and backup paths
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_DIR="$SCRIPT_DIR/backup/backup-$TIMESTAMP"
SCHEMA_FILE="$BACKUP_DIR/schema.sql"
DATA_FILE="$BACKUP_DIR/data.sql"

mkdir -p "$BACKUP_DIR" || {
  echo "❌ Failed to create backup directory: $BACKUP_DIR"
  exit 1
}

# Export password for pg_dump
export PGPASSWORD="$DB_PASSWORD"

echo "📦 Backing up schema to $SCHEMA_FILE"
"$PG_DUMP" \
  --host="$DB_HOST" \
  --port="$DB_PORT" \
  --username="$DB_USER" \
  --dbname="$DB_NAME" \
  --schema=public \
  --no-owner \
  --clean \
  --if-exists \
  --format=p \
  --schema-only \
  --file="$SCHEMA_FILE"

echo "📦 Backing up data to $DATA_FILE"
"$PG_DUMP" \
  --host="$DB_HOST" \
  --port="$DB_PORT" \
  --username="$DB_USER" \
  --dbname="$DB_NAME" \
  --schema=public \
  --data-only \
  --inserts \
  --on-conflict-do-nothing \
  --no-owner \
  --file="$DATA_FILE"

echo "✅ Backup complete!"
echo " - Schema: $SCHEMA_FILE"
echo " - Data:   $DATA_FILE"
