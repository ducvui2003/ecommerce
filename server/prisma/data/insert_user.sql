INSERT INTO public.users (
  id, email, name, password, phone, avatar, status, dob, role_id, created_at, updated_at, deleted_at
)
VALUES 

(1,'ducvui2003@gmail.com',	'$argon2id$v=19$m=65536,t=3,p=4$RGUnK8MzXKquPL0ADTNQCg$1pUa7Rx9w67LZvpzkvbUd9L8IuELTgJ1BzvxN7F6iDM'		,	'ACTIVE'	'2025-05-03 06:54:32.751')
(2, 'user2@example.com', 'John Doe', 'fake_password_hash', '1234567890', NULL, 'ACTIVE', '1995-06-15', 2, now(), NULL, NULL),
(3, 'user3@example.com', 'Jane Smith', 'fake_password_hash', '1234567891', NULL, 'INACTIVE', '1990-09-22', 2, now(), NULL, NULL),
(4, 'user4@example.com', 'Alice Johnson', 'fake_password_hash', '1234567892', NULL, 'BLOCKED', '1988-04-10', 2, now(), NULL, NULL),
(5, 'user5@example.com', 'Bob Brown', 'fake_password_hash', '1234567893', NULL, 'ACTIVE', '1992-01-03', 2, now(), NULL, NULL),
(6, 'user6@example.com', 'Charlie Davis', 'fake_password_hash', '1234567894', NULL, 'INACTIVE', '1997-07-19', 2, now(), NULL, NULL),
(7, 'user7@example.com', 'Diana Evans', 'fake_password_hash', '1234567895', NULL, 'BLOCKED', '1985-11-11', 2, now(), NULL, NULL),
(8, 'user8@example.com', 'Edward Ford', 'fake_password_hash', '1234567896', NULL, 'ACTIVE', '1993-03-07', 2, now(), NULL, NULL),
(9, 'user9@example.com', 'Fiona Green', 'fake_password_hash', '1234567897', NULL, 'INACTIVE', '1989-10-30', 2, now(), NULL, NULL),
(10, 'user10@example.com', 'George Hill', 'fake_password_hash', '1234567898', NULL, 'BLOCKED', '1996-08-25', 2, now(), NULL, NULL),
(11, 'user11@example.com', 'Hannah Irving', 'fake_password_hash', '1234567899', NULL, 'ACTIVE', '1991-02-14', 2, now(), NULL, NULL),
(12, 'user12@example.com', 'Ian Jones', 'fake_password_hash', '1234567800', NULL, 'INACTIVE', '1994-12-21', 2, now(), NULL, NULL),
(13, 'user13@example.com', 'Julia King', 'fake_password_hash', '1234567801', NULL, 'BLOCKED', '1987-06-09', 2, now(), NULL, NULL),
(14, 'user14@example.com', 'Kevin Lee', 'fake_password_hash', '1234567802', NULL, 'ACTIVE', '1998-05-17', 2, now(), NULL, NULL),
(15, 'user15@example.com', 'Laura Miller', 'fake_password_hash', '1234567803', NULL, 'INACTIVE', '1993-03-12', 2, now(), NULL, NULL),
(16, 'user16@example.com', 'Mike Nelson', 'fake_password_hash', '1234567804', NULL, 'BLOCKED', '1990-01-29', 2, now(), NULL, NULL),
(17, 'user17@example.com', 'Nina Owens', 'fake_password_hash', '1234567805', NULL, 'ACTIVE', '1986-09-03', 2, now(), NULL, NULL),
(18, 'user18@example.com', 'Oscar Perez', 'fake_password_hash', '1234567806', NULL, 'INACTIVE', '1995-04-06', 2, now(), NULL, NULL),
(19, 'user19@example.com', 'Paula Quinn', 'fake_password_hash', '1234567807', NULL, 'BLOCKED', '1992-08-28', 2, now(), NULL, NULL),
(20, 'user20@example.com', 'Quinn Roberts', 'fake_password_hash', '1234567808', NULL, 'ACTIVE', '1984-10-15', 2, now(), NULL, NULL),
(21, 'user21@example.com', 'Rachel Stone', 'fake_password_hash', '1234567809', NULL, 'INACTIVE', '1999-12-01', 2, now(), NULL, NULL),
(22, 'user22@example.com', 'Sam Turner', 'fake_password_hash', '1234567810', NULL, 'BLOCKED', '1983-07-23', 2, now(), NULL, NULL),
(23, 'user23@example.com', 'Tina Underwood', 'fake_password_hash', '1234567811', NULL, 'ACTIVE', '1996-02-17', 2, now(), NULL, NULL),
(24, 'user24@example.com', 'Ulysses Vega', 'fake_password_hash', '1234567812', NULL, 'INACTIVE', '1982-06-18', 2, now(), NULL, NULL),
(25, 'user25@example.com', 'Victoria White', 'fake_password_hash', '1234567813', NULL, 'BLOCKED', '1994-01-05', 2, now(), NULL, NULL),
(26, 'user26@example.com', 'Walter Xiong', 'fake_password_hash', '1234567814', NULL, 'ACTIVE', '1989-11-27', 2, now(), NULL, NULL),
(27, 'user27@example.com', 'Xena Young', 'fake_password_hash', '1234567815', NULL, 'INACTIVE', '1990-05-09', 2, now(), NULL, NULL),
(28, 'user28@example.com', 'Yusuf Zane', 'fake_password_hash', '1234567816', NULL, 'BLOCKED', '1988-03-14', 2, now(), NULL, NULL),
(29, 'user29@example.com', 'Zara Allen', 'fake_password_hash', '1234567817', NULL, 'ACTIVE', '1985-12-31', 2, now(), NULL, NULL),
(30, 'user30@example.com', 'Aaron Blue', 'fake_password_hash', '1234567818', NULL, 'INACTIVE', '1997-07-01', 2, now(), NULL, NULL);