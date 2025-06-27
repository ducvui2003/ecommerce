openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout ./certs/localhost.key \
  -out ./certs/localhost.crt \
  -days 365 \
  -subj "/CN=localhost"