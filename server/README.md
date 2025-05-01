# Database Migration

## 1. You haven't a database

```bash
npx prisma db push
```

## 2. You have a database but not has schema.prisma file

- Create file `prisma/schema.prisma`
- Define config about your database
  ```bash
  generator client {
      provider      = "prisma-client-js"
      binaryTargets = ["native", "linux-arm64-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]
  }
  datasource db {
      provider = "postgresql"
      url = env("DATABASE_URL")
  }
  ```
- Create schema from exist database

  ```bash
  npx prisma db pull
  ```

## 3. You have a database before and want to update breaking change

### 3.1 Change in schema.prisma (optional)

### 3.2 Create file migration (not apply change to database)

Prisma look up different between current database and file `prisma/schema.prisma` to export file migration (file is empty if prisma can not see different)

```bash
npx prisma migration dev --create-only
```

### 3.3 Append some change into file migration

You will add some native query depend on your database

### 3.4 Apply change

Prisma create a table `_prisma_migrations` to manage migrations

```bash
npx prisma migration dev
```

## 4. Rollback migration when failed and redeploy

### 4.1 Pointer rollback migration

- Change row in database manager migration to prisma know has a migration failed

```bash
  npx prisma migration resolved --rollback <migration_name>
```

| migration_name is a name directory that contain migration file failed

### 4.2 Change SQL

Edit SQL in this file migration failed

### 4.3 Re deploy

```bash
  npx prisma migration deploy
```

## Note

- Single source of truth is migration files, not file schema.prisma
- Not change dynamic via db client
- Always sync change with migration manager
