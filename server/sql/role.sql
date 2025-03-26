INSERT INTO roles (id, name) VALUES (1, 'ADMIN');
INSERT INTO roles (id, name) VALUES (2, 'USER');
-- Password: 123456Duc@.
-- $argon2id$v=19$m=65536,t=3,p=4$RGUnK8MzXKquPL0ADTNQCg$1pUa7Rx9w67LZvpzkvbUd9L8IuELTgJ1BzvxN7F6iDM
INSERT INTO users (email, name, password, role_id) 
VALUES ( 'ducvui2003@gmail.com', 'admin','$argon2id$v=19$m=65536,t=3,p=4$RGUnK8MzXKquPL0ADTNQCg$1pUa7Rx9w67LZvpzkvbUd9L8IuELTgJ1BzvxN7F6iDM', 1);
