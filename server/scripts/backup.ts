import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { exit } from 'process';
import dotenv from 'dotenv';
import { URL } from 'url';

dotenv.config();

// Path to specific pg_dump version
const PG_DUMP = '/usr/lib/postgresql/17/bin/pg_dump';

// Check if pg_dump exists
if (!fs.existsSync(PG_DUMP)) {
  console.error(
    `❌ pg_dump not found at ${PG_DUMP}. Make sure PostgreSQL 17 client is installed.`,
  );
  exit(1);
}

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ Missing DATABASE_URL in .env');
  exit(1);
}

let dbUrl: URL;
try {
  dbUrl = new URL(process.env.DATABASE_URL);
} catch (err) {
  console.error('❌ Invalid DATABASE_URL format');
  exit(1);
}

const DB_USER = dbUrl.username;
const DB_PASSWORD = dbUrl.password;
const DB_HOST = dbUrl.hostname;
const DB_PORT = dbUrl.port || '5432';
const DB_NAME = dbUrl.pathname.replace(/^\//, '');

// Backup directory with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = path.resolve(__dirname, `../prisma/data/backup-${timestamp}`);

try {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
} catch (err) {
  console.error(`❌ Failed to create/access backup directory at ${backupDir}`);
  exit(1);
}

// Paths
const schemaFile = path.join(backupDir, 'schema.sql');
const dataFile = path.join(backupDir, 'data.sql');

// PG environment
const env = {
  ...process.env,
  PGPASSWORD: DB_PASSWORD,
};

// Commands
const dumpSchemaCommand = `"${PG_DUMP}" \
  --host="${DB_HOST}" \
  --port="${DB_PORT}" \
  --username="${DB_USER}" \
  --dbname="${DB_NAME}" \
  --schema=public \
  --no-owner \
  --clean \
  --if-exists \
  --format=p \
  --schema-only \
  --file="${schemaFile}"`;

const dumpDataCommand = `"${PG_DUMP}" \
  --host="${DB_HOST}" \
  --port="${DB_PORT}" \
  --username="${DB_USER}" \
  --dbname="${DB_NAME}" \
  --schema=public \
  --data-only \
  --inserts \
  --on-conflict-do-nothing \
  --no-owner \
  --file="${dataFile}"`;

try {
  console.log(`📦 Backing up schema of "${DB_NAME}" to ${schemaFile}...`);
  execSync(dumpSchemaCommand, { env, stdio: 'inherit' });

  console.log(`📦 Backing up data of "${DB_NAME}" to ${dataFile}...`);
  execSync(dumpDataCommand, { env, stdio: 'inherit' });

  console.log('✅ Backup complete! Files created:');
  console.log(` - ${schemaFile}`);
  console.log(` - ${dataFile}`);
} catch (error) {
  console.error('❌ Backup failed:', error);
}
