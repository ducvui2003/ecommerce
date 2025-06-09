1. Run service
   `docker compose up -d ecommerce-fe ecommerce-be postgres redis`
2. Run nginx
   `docker compose up -d nginx`
3. Create cert
   `./generate-ssh.sh`
4. Change volume in `docker-compose.yml`
   ```
   nginx:
    image: jonasal/nginx-certbot:latest
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
    volumes:
      # - ./nginx/nginx.temp.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
   ```
5. Restart nginx
   `docker compose restart nginx`
