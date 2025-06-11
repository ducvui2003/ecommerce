# 1️⃣ Build Stage
## node:22-alpine (88.8 MB)
FROM node:22-alpine AS builder 

WORKDIR /app

RUN apk add --no-cache curl openssl3

# Copy package.json and install only production dependencies
COPY package.json package-lock.json ./ 

# Clean and install dependencies (including dev dependencies)
RUN npm ci --force

# Copy the source code (has docker ignore)
COPY . .

# Generate Prisma Client and build app
RUN npx prisma generate && npm run build

# Remove dev dependencies
RUN npm prune --omit=dev

# Optionally: Use node-prune to trim unused files
RUN curl -sf https://gobinaries.com/tj/node-prune | sh && node-prune /app/node_modules --whitelist "@nestjs"
RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/refs/heads/master/wait-for-it.sh
RUN chmod +x wait-for-it.sh

# 2️⃣ Production Stage 
## node:22-alpine (158MB)
FROM node:22-alpine AS runner
ENV NODE_ENV=production

WORKDIR /app

# Copy only necessary files from build stage
## dist: 1.1 MB
COPY --from=builder /app/dist ./dist
## node_modules: 282MB
COPY --from=builder /app/node_modules ./node_modules

## wait-for-it.sh: 1.2KB
COPY --from=builder /app/wait-for-it.sh ./wait-for-it.sh
RUN apk add --no-cache bash
RUN chmod +x wait-for-it.sh

# Expose the correct port
EXPOSE 8000

# Run the application (408MB)
CMD ["node", "dist/src/main"]

