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

// Check if DATABASE_URL is present
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

// Create backup directory if needed
const backupDir = path.resolve(__dirname, '../prisma/data');
try {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
} catch (err) {
  console.error(`❌ Failed to create/access backup directory at ${backupDir}`);
  exit(1);
}

// Format timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(backupDir, `backup-${timestamp}.sql`);

// Set environment for pg_dump
const env = {
  ...process.env,
  PGPASSWORD: DB_PASSWORD,
};

// Build and run the pg_dump command
const dumpCommand = `${PG_DUMP} -U ${DB_USER} -h ${DB_HOST} -p ${DB_PORT} -d ${DB_NAME} -F p > "${backupFile}"`;

try {
  console.log(`📦 Backing up "${DB_NAME}" to ${backupFile}...`);
  execSync(dumpCommand, { env, stdio: 'inherit' });
  console.log('✅ Backup complete!');
} catch (error) {
  console.error('❌ Backup failed:', error);
}
