--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg24.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations VALUES ('34ea52a7-98da-426b-9b9f-d9dfeb83eaa2', 'df03d2a45935cf825cfb62c2e99791b53ada24825319d6bb2a3b54b8cc611f02', '2025-05-14 01:27:24.800155+00', '20250501102044_init_database', NULL, NULL, '2025-05-14 01:27:24.731562+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('41d9f897-d694-4b3b-9bde-495db1da568b', '8564b21f3985740d69fcf4b93afaa0849dde7a43af87d9645fb514be2c80b028', '2025-05-14 03:40:06.789062+00', '20250514012744_product_bigint_into_decimal_price', NULL, NULL, '2025-05-14 03:40:06.775616+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('72dcf80e-a574-4deb-8e21-16c9da6eb611', 'f118d7add70ba0f31b5107b083ec7bb9df8f8d31d7ad2cdf4f189898ebdbce5a', '2025-05-14 03:54:29.474538+00', '20250514034040_price_numeric_product', NULL, NULL, '2025-05-14 03:54:29.467411+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('12800c85-15a0-4363-a071-874c5f31cbd1', 'a565756f7415239fd3e58e3625a935d2c6e5548a6470c646b00c8f1fcf14096a', '2025-05-15 06:50:49.957087+00', '20250515064751_merge_volumn_option_product', NULL, NULL, '2025-05-15 06:50:49.945193+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('e344cf86-e086-4893-8c66-95c1e5737aac', '5c6bcd8e4c8cbf93b8e001bc4601f767a0a5880a24d378fece8dc1634cc278e5', '2025-05-15 07:10:50.233989+00', '20250515071032_rename_option_field', NULL, NULL, '2025-05-15 07:10:50.228039+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('637dc6b4-754b-4701-bc03-42a483e7e3e5', '380ed07db77e59552ebee5595f87ec761e3dd20363563c18f159ea85b4bc2785', '2025-05-16 08:54:46.428127+00', '20250516085440_option_remove_value_price_bigint_decimal', NULL, NULL, '2025-05-16 08:54:46.424082+00', 1) ON CONFLICT DO NOTHING;


--
-- Data for Name: abouts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles VALUES (1, 'ADMIN', '2025-05-14 01:35:14.722', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.roles VALUES (2, 'USER', '2025-05-14 01:35:14.722', NULL) ON CONFLICT DO NOTHING;


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'user2@example.com', 'John Doe', 'fake_password_hash', '1234567890', NULL, 'ACTIVE', '1995-06-15', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (3, 'user3@example.com', 'Jane Smith', 'fake_password_hash', '1234567891', NULL, 'INACTIVE', '1990-09-22', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (4, 'user4@example.com', 'Alice Johnson', 'fake_password_hash', '1234567892', NULL, 'BLOCKED', '1988-04-10', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (5, 'user5@example.com', 'Bob Brown', 'fake_password_hash', '1234567893', NULL, 'ACTIVE', '1992-01-03', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (6, 'user6@example.com', 'Charlie Davis', 'fake_password_hash', '1234567894', NULL, 'INACTIVE', '1997-07-19', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (7, 'user7@example.com', 'Diana Evans', 'fake_password_hash', '1234567895', NULL, 'BLOCKED', '1985-11-11', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (8, 'user8@example.com', 'Edward Ford', 'fake_password_hash', '1234567896', NULL, 'ACTIVE', '1993-03-07', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (9, 'user9@example.com', 'Fiona Green', 'fake_password_hash', '1234567897', NULL, 'INACTIVE', '1989-10-30', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (10, 'user10@example.com', 'George Hill', 'fake_password_hash', '1234567898', NULL, 'BLOCKED', '1996-08-25', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (12, 'user12@example.com', 'Ian Jones', 'fake_password_hash', '1234567800', NULL, 'INACTIVE', '1994-12-21', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (13, 'user13@example.com', 'Julia King', 'fake_password_hash', '1234567801', NULL, 'BLOCKED', '1987-06-09', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (14, 'user14@example.com', 'Kevin Lee', 'fake_password_hash', '1234567802', NULL, 'ACTIVE', '1998-05-17', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (15, 'user15@example.com', 'Laura Miller', 'fake_password_hash', '1234567803', NULL, 'INACTIVE', '1993-03-12', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (16, 'user16@example.com', 'Mike Nelson', 'fake_password_hash', '1234567804', NULL, 'BLOCKED', '1990-01-29', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (17, 'user17@example.com', 'Nina Owens', 'fake_password_hash', '1234567805', NULL, 'ACTIVE', '1986-09-03', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (18, 'user18@example.com', 'Oscar Perez', 'fake_password_hash', '1234567806', NULL, 'INACTIVE', '1995-04-06', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (19, 'user19@example.com', 'Paula Quinn', 'fake_password_hash', '1234567807', NULL, 'BLOCKED', '1992-08-28', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (20, 'user20@example.com', 'Quinn Roberts', 'fake_password_hash', '1234567808', NULL, 'ACTIVE', '1984-10-15', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (21, 'user21@example.com', 'Rachel Stone', 'fake_password_hash', '1234567809', NULL, 'INACTIVE', '1999-12-01', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (22, 'user22@example.com', 'Sam Turner', 'fake_password_hash', '1234567810', NULL, 'BLOCKED', '1983-07-23', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (23, 'user23@example.com', 'Tina Underwood', 'fake_password_hash', '1234567811', NULL, 'ACTIVE', '1996-02-17', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (24, 'user24@example.com', 'Ulysses Vega', 'fake_password_hash', '1234567812', NULL, 'INACTIVE', '1982-06-18', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (25, 'user25@example.com', 'Victoria White', 'fake_password_hash', '1234567813', NULL, 'BLOCKED', '1994-01-05', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (26, 'user26@example.com', 'Walter Xiong', 'fake_password_hash', '1234567814', NULL, 'ACTIVE', '1989-11-27', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (27, 'user27@example.com', 'Xena Young', 'fake_password_hash', '1234567815', NULL, 'INACTIVE', '1990-05-09', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (28, 'user28@example.com', 'Yusuf Zane', 'fake_password_hash', '1234567816', NULL, 'BLOCKED', '1988-03-14', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (29, 'user29@example.com', 'Zara Allen', 'fake_password_hash', '1234567817', NULL, 'ACTIVE', '1985-12-31', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (30, 'user30@example.com', 'Aaron Blue', 'fake_password_hash', '1234567818', NULL, 'INACTIVE', '1997-07-01', 2, '2025-05-14 11:13:54.136', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (1, 'ducvui2003@gmail.com', 'admin', '$argon2id$v=19$m=65536,t=3,p=4$RGUnK8MzXKquPL0ADTNQCg$1pUa7Rx9w67LZvpzkvbUd9L8IuELTgJ1BzvxN7F6iDM', '', '', 'ACTIVE', NULL, 1, '2025-05-14 01:35:14.722', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (11, 'user11@example.com', 'Hannah Irving', 'fake_password_hash', '1234567899', NULL, 'BLOCKED', '1991-02-14', 2, '2025-05-14 11:13:54.136', '2025-05-15 03:25:59.375', NULL) ON CONFLICT DO NOTHING;


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.addresses VALUES (4, '12 Nguyễn Huệ', 'Phường Bến Nghé', 'Quận 1', 'Hồ Chí Minh', 1, '2025-04-27 04:06:30.566', '2025-04-27 04:06:30.566', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.addresses VALUES (5, '35 Xuân Thủy', 'Phường Thảo Điền', 'Quận 2', 'Hồ Chí Minh', 1, '2025-04-27 04:06:30.566', '2025-04-27 04:06:30.566', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.addresses VALUES (6, '102 Hai Bà Trưng', 'Phường Tân Định', 'Quận 1', 'Hồ Chí Minh', 1, '2025-04-27 04:06:30.566', '2025-04-27 04:06:30.566', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.addresses VALUES (7, '45 Bạch Đằng', 'Phường 2', 'Quận Tân Bình', 'Hồ Chí Minh', 1, '2025-04-27 04:11:13.111', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.addresses VALUES (8, '65 Phan Bội Châu', 'Phường 4', 'Quận Tân Phú', 'Hồ Chí Minh', 1, '2025-04-27 04:13:42.397', NULL, NULL) ON CONFLICT DO NOTHING;


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.categories VALUES (2, 'Lọ đựng tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.categories VALUES (3, 'Máy xông tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.suppliers VALUES (11, 'Jade Bloom', 'contact@jadebloom.vn', '0909123456', 'Vietnam', 'https://www.jadebloom.com', 'ACTIVE', 4, '2025-04-27 04:07:50.683', '2025-04-27 04:07:50.683', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.suppliers VALUES (12, 'doTERRA', 'contact@doterra.vn', '0911123456', 'Vietnam', 'https://www.doterra.com', 'ACTIVE', 5, '2025-04-27 04:07:50.683', '2025-04-27 04:07:50.683', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.suppliers VALUES (13, 'Edens Garden', 'contact@edensgarden.vn', '0988123456', 'Vietnam', 'https://www.edensgarden.com', 'ACTIVE', 6, '2025-04-27 04:07:50.683', '2025-04-27 04:07:50.683', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.suppliers VALUES (15, 'Young Living', 'contact@youngliving.vn', '0985635273', 'America', 'https://www.youngliving.com', 'ACTIVE', 7, '2025-04-27 04:11:26.836', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.suppliers VALUES (16, 'Rocky Mountain Oils', 'contact@rockymountainoils.vn', '0963647462', 'Franch', 'https://www.rockymountainoils.com', 'ACTIVE', 8, '2025-04-27 04:13:49.383', NULL, NULL) ON CONFLICT DO NOTHING;


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products VALUES (10, 'Máy xông tinh dầu', 'Máy xông tinh dầu 100ml', 1200000.00, 1100000.00, 3, 13, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (2, 'Tinh dầu Lavender', 'Tinh dầu Lavender nguyên chất', 500000.00, 450000.00, 1, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (8, 'Tinh dầu Orange', 'Tinh dầu cam tự nhiên', 400000.00, 350000.00, 1, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (6, 'Tinh dầu Lemongrass', 'Tinh dầu sả chanh', 350000.00, 320000.00, 1, 13, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (4, 'Tinh dầu Eucalyptus', 'Tinh dầu Eucalyptus thư giãn', 450000.00, 400000.00, 1, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (11, 'Lọ đựng tinh dầu 20ml', 'Lọ đựng tinh dầu 20ml thủy tinh', 150000.00, 140000.00, 2, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (9, 'Lọ đựng tinh dầu 10ml', 'Lọ đựng tinh dầu 10ml bằng thủy tinh', 100000.00, 90000.00, 2, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (3, 'Tinh dầu Peppermint', 'Tinh dầu Peppermint tự nhiên', 600000.00, 550000.00, 1, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (7, 'Tinh dầu Tea Tree', 'Tinh dầu tràm trà', 550000.00, 500000.00, 1, 13, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (5, 'Tinh dầu Rose', 'Tinh dầu hoa hồng', 700000.00, 650000.00, 1, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (1, 'Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên Xi', '1. Chi Tiết Sản Phẩm
- Mã số : TDNM-XS
- Dung tích :5ml, 10ml, 15ml , 20ml, 30ml, 50ml, 100ml
- Loại Nắp : Xịt Sương | Mạ Vàng Cao Cấp
- Trọng lượng :20gr-100gr
- Còn Hàng - Ship Toàn quốc

2.  Điểm nổi bật :
- Dòng chai thủy tinh dùng Đựng tinh dầu , hóa chất thì không thể thiếu được màu hỗ phách. vì chỉ có loai này thì mới có thể không làm thay đổi hoạt tích hóa học của tinh dau .với Đầu lăn cao cấp. bạn có Thể ứng dụng rất nhiều công Dụng.

- chất liệu thủy tinh sáng, đẹp và màu hỗ Phách. Chai thủy tinh rất dầy và chắc chắn cùng quay xách cùng ống bớp sang trọng nên được dùng nhiều để bao bì các chất hóa chất , tinh dau các loại , liệu hương .....
- Với thiết kế riêng biệt dầy các Tính tạo một thương hiệu sản phẩm của bạn.

- Dòng Sản Phẩm có Nhiều Dung Tích :  5ml, 10ml, 15ml , 20ml, 30ml, 50ml, 100ml', 5000.00, 5000.00, 2, 11, '2025-05-11 10:52:08', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (12, 'Máy xông tinh dầu LORITA DK-BL02', 'Máy xông, máy khuếch tán tinh dầu LORITA DK-BL01 là dòng máy xông siêu âm với thiết kế Hình Trụ dài hoạ tiết bông lúa vân gỗ phù hợp với nhiều không gian, có tông màu nhẹ nhàng, thanh lịch.
Thường được đặt trên bàn, phòng khách, kệ tủ đầu giường,… tạo điểm nhấn trong thiết kế nội thất', 100000.00, 100000.00, 3, 11, '2025-05-11 05:35:50.738', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (13, 'Máy xông tinh dầu LORITA KDK-TT3D', 'Máy xông, máy khuếch tán tinh dầu LORITA KDK-TT3D  là dòng máy xông siêu âm với thiết kế hình Lọ hoa với đèn màu 3D và chất liệu thủy tinh, phù hợp với nhiều không gian.
Thường được đặt trên kệ tủ, bàn khách, bàn ăn,… đem đến cảm giác sang trọng, tạo điểm nhấn.', 650000.00, 650000.00, 3, 13, '2025-05-11 05:38:57.285', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (15, 'Tinh Dầu Trà Trắng (White Tea Essential Oil) Heny Garden', 'Tinh dầu White Tea hay còn gọi là tinh dầu trà trắng là một trong những “gương mặt” nổi bật trong thời gian gần đây bởi hương thơm thuần khiết và khả năng tuyệt vời mà nó mang lại.

Cùng Heny Garden khám phá một số công dụng cũng như nhiều cách sử dụng hay ho của loại tinh dầu này nhé. ', 119000.00, 119000.00, 1, 16, '2025-05-11 05:48:40.135', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (18, 'Tinh Dầu Vani (Sweet Vanilla Essential Oil) Heny Garden', 'Tinh dầu Vani đã xuất hiện từ rất lâu và được sử dụng phổ biến trên thế giới. Không chỉ là nguyên liệu phổ biến trong công thức làm bánh', 119000.00, 89000.00, 1, 12, '2025-05-11 13:03:03', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (19, 'Tinh Dầu Cà Phê (Coffee Essential Oil) Heny Garden', 'Tinh dầu Cà Phê khi được khuếch tán vào trong không khí sẽ khiến hương thơm nồng nàn ấm áp lan tỏa khắp ngôi nhà bạn', 119000.00, 89000.00, 1, 12, '2025-05-11 13:06:12', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (20, 'Tinh Dầu Gỗ Thông (Pine Essential Oil) Heny Garden', 'Tinh dầu Thông từ lâu đã gắn liền với đời sống con người, nhờ các lợi ích mà nó mang lại trong đời sống và sức khỏe. Ngày nay để thuận tiện hơn cho việc khai thác các lợi ích sức khỏe mà cây Thông mang lại, tinh dầu Thông đã được chiết xuất để được sử dụng rộng rãi hơn.  Tinh dầu Thông đã trở thành một hương thơm phổ biến trong mỹ phẩm, đồ vệ sinh cá nhân, xà phòng và chất tẩy rửa. Bài viết sản phẩm này nêu bật các lợi ích, đặc tính và cách sử dụng an toàn khác của Tinh dầu Thông.', 99000.00, 69000.00, 1, 12, '2025-05-11 13:09:23', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (21, 'Tinh Dầu Hương Thảo (Rosemary Essential Oil) Heny Garden', 'Hương Thảo được biết đến chủ yếu như 1 loại nguyên liệu ẩm thực, nhưng gần đây Tinh Dầu Hương Thảo lại được đánh giá cao về hương thơm đặc trưng cùng những lợi ích trong y học. Cùng Heny tìm hiểu các công dụng và lợi ich của cây Hương Thảo mang lại nhé.', 109000.00, 79000.00, 1, 12, '2025-05-11 13:11:51', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (22, 'Tinh Dầu Thơm Phối Hương Aquamarine (Viên Ngọc Của Đại Dương) Heny Garden', 'Tinh dầu thơm phối hương Aquamarine lấy cảm hứng từ hơi thở của vùng biển lộng gió Windansea tại San Diego', 189000.00, 149000.00, 1, 12, '2025-05-11 13:14:59', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (23, 'Tinh Dầu Đàn Hương (Sandalwood Essential Oil) Heny Garden', 'Tinh dầu Đàn Hương được chiết xuất từ một loại cây rất có giá trị, có mùi hương cổ điển và là thành phần được tìm thấy trong nhiều loại nước hoa.  Giá trị mà tinh dầu gỗ Đàn hương mang lại không chỉ là hương thơm, mà còn nhiều lợi ích khác cho sức khỏe: điều trị mất ngủ, cân bằng cảm xúc và tâm trạng, làm lành vết thương,...', 229000.00, 189000.00, 1, 12, '2025-05-11 13:17:55', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (24, 'Tinh Dầu Thơm Phối Hương Black Ocean (Đại Dương Đen) Heny Garden', 'Tinh dầu thơm phối hương Black Ocean không miêu tả năng lượng sảng khoái và tràn đầy tinh thần như những tay lướt sóng cừ khôi trên vùng biển lộng gió Windansea', 179000.00, 149000.00, 1, 12, '2025-05-11 13:25:21', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (17, 'Tinh Dầu Phối Hương Tropical Paradise (Thiên Đường Nhiệt Đới) Xông Thơm Phòng HENY GARDEN', 'Tinh dầu phối hương Tropical Paradise (Thiên Đường Nhiệt Đới) đem đến một mùi hương giống như gió mang theo hương thơm của dừa và các loài hoa tươi. Bạn sẽ cảm nhận được sự dịu mát và tươi mới, như là một cuộc phiêu lưu vào một thiên đường nhiệt đới.', 179000.00, 149000.00, 1, 12, '2025-05-11 05:59:23.039', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (14, 'Tinh Dầu Phối Hương Yummy Kiwi (Kiwi Hảo Hạng) Xông Thơm Phòng HENY GARDEN', '- Tinh dầu thơm phối hương Yummy Kiwi (Kiwi Hảo Hạng)

- Mùi hương là sự phối hợp giữa các tầng Top/Mid/Base note (hương Đầu/ Giữa/ Cuối) tạo nên sự độc đáo và lưu luyến hơn so với tinh dầu đơn hương.

- Nốt hương chính: Kiwi, Sữa dừa, Xoài chín

- Nốt hương bổ trợ: Chanh dây, Hoa ly, Hoa cam, Hổ phách, Dưa lưới

- Dung tích: 10mL

- Thương hiệu: Heny Garden

- Thời hạn sử dụng: 2 năm

- Heny Garden bảo chứng chất lượng sản phẩm với đánh giá 5 sao.', 179000.00, 149000.00, 1, 15, '2025-05-11 05:42:52.348', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (16, 'Tinh Dầu Hoa Nhài (Elegant Jasmine Essential Oil) Heny Garden', 'Tinh dầu Hoa Nhài (tinh dầu hoa Lài) được chiết xuất từ những đóa hoa nhài trắng muốt - một loài hoa chỉ nở vào ban đêm. Hoa lài được yêu thích nhờ vào hương thơm lãng mạn', 179000.00, 149000.00, 1, 12, '2025-05-11 05:53:05.428', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (25, 'Tinh Dầu Sả Hoa Hồng (Palmarosa Essential Oil) Heny Garden', 'Tinh dầu Sả Hoa Hồng đã được sử dụng ngàn năm trong lĩnh vực Y học tại Trung Quốc và Ấn Độ. Ngày nay', 99000.00, 69000.00, 1, 12, '2025-05-11 13:28:28', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (26, 'Tinh Dầu Quế (Cinnamon Essential Oil) Heny Garden', 'Tinh dầu Quế cay nồng, ngọt ngào, quen thuộc với nhiều người vì quế là nguyên liệu phổ biến trong ẩm thực. Dầu quế được đánh giá cao vì hương thơm tươi mới và những lợi ích về sức khỏe và sắc đẹp mà nó mang lại nhờ những khả năng kháng khuẩn, chống nấm, chống oxy hoá.
Nhưng nhiều người vẫn còn băn khoăn rằng tinh dầu Quế có tốt hay không? Vậy hãy cùng Heny tìm hiểu các lợi ích mà tinh dầu Quế mang lại và giải đáp thắc mắc trên nhé. ', 99000.00, 69000.00, 1, 12, '2025-05-11 13:31:54', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (27, 'Tinh Dầu Ngọc Lan Tây (Ylang Ylang Essential Oil) Heny Garden', 'Tinh dầu Ngọc Lan Tây (Ylang Ylang essential oil) với hương quyến rũ, nữ tính và lãng mạn, hoa Ngọc Lan Tây thường được sử dụng làm nước hoa, liệu pháp điều trị tâm lý và chăm sóc da tóc. 
Nếu là một người yêu thích hương thơm, nhất là nước hoa, chắc hẳn bạn đã từng thấy sự xuất hiện của Hoa Ngọc Lan Tây trong thành phần, điển hình như nước hoa Chanel No5', 149000.00, 119000.00, 1, 12, '2025-05-11 13:34:58', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (28, 'Tinh Dầu Hoàng Đàn - Tuyết Tùng (Cedarwood Essential Oil) Heny Garden', 'Tinh dầu Hoàng Đàn (tinh dầu gỗ Tuyết Tùng) có hương gỗ ngọt nồng ấm, dễ chịu, tạo hương thơm thư giãn, dịu êm khi được khuếch tán. Tinh dầu Cedarwood là một thành phần bổ sung tuyệt vời cho các sản phẩm chăm sóc da và tóc, còn được tìm thấy trong nước hoa, chống côn trùng và khử mùi.', 139000.00, 99000.00, 1, 12, '2025-05-11 13:37:37', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (29, 'Tinh Dầu Thơm Phối Hương The Stars (Vì Sao Trên Trời) Heny Garden', 'Tinh dầu thơm phối hương The Stars tái hiện khoảnh khắc đứng giữa bầu trời trong một đêm lộng gió tại căn hộ penthouse tọa lạc tại quận 7 năm ngoái. Vào cái buổi đêm ấy, tiết trời se lạnh, đầy sao và im lặng đến lạ. Khác biệt với vòng xoay kèm sự náo nhiệt, ồn ào của một ngày dài; Dường như lúc này vạn vật đều nín thở vì sợ làm tan vỡ bầu không khí yên tĩnh.', 189000.00, 149000.00, 1, 12, '2025-05-11 13:39:54', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (30, 'Tinh Dầu Thơm Phối Hương Christmas Spirit (Giáng Sinh Rộn Ràng) Heny Garden', 'Tinh dầu thơm phối hương Christmas Spirit đem đến không khí một ngày lễ Giáng Sinh quây quần thưởng thức một bữa tối ấm cúng và trao quà vào lúc nửa đêm tại hầu hết các quốc gia Châu Âu. Người ta thường nhớ đến hương vị ngọt ấm của món tráng miệng bánh táo quế trong bữa tối đêm Giáng Sinh. Nhớ đến khoảnh khắc hồi hộp trao quà bên cạnh chiếc lò sưởi, hòa với hương thơm mát lạnh từ cây Thông lấp lánh ánh đèn. Nhớ đến mùi hương đặc trưng như Christmas Spirit.', 189000.00, 149000.00, 1, 12, '2025-05-11 13:41:55', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (33, 'Generic H2 (Embedded)', 'asdasdasaa', 11.00, 111.00, 1, 13, '2025-05-16 09:01:12.197', '2025-05-16 09:01:12.197', NULL) ON CONFLICT DO NOTHING;


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: customer_services; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.resources VALUES (1, 'ecommerce/test/kltn_logohbf7jOH7', 'image', 'jpg', '2025-05-11 03:47:29.768', '2025-05-11 03:47:29.768', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2, 'ecommerce/test/3QQD7-6VK', 'image', 'webp', '2025-05-11 04:19:29.121', '2025-05-11 04:19:29.121', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (3, 'ecommerce/test/2UpN_3NLU', 'image', 'webp', '2025-05-11 04:19:29.221', '2025-05-11 04:19:29.221', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (4, 'ecommerce/test/13ROxBLAg', 'image', 'webp', '2025-05-11 04:19:29.367', '2025-05-11 04:19:29.367', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (5, 'ecommerce/test/30Q3QQbhp', 'image', 'jpg', '2025-05-11 04:51:25.536', '2025-05-11 04:51:25.536', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (6, 'ecommerce/test/4c5TQBXtM', 'image', 'webp', '2025-05-11 04:51:25.738', '2025-05-11 04:51:25.738', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (7, 'ecommerce/test/55SI62S4j', 'image', 'webp', '2025-05-11 04:51:25.739', '2025-05-11 04:51:25.739', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (8, 'ecommerce/test/1ac-T1cbZ', 'image', 'webp', '2025-05-11 04:51:25.818', '2025-05-11 04:51:25.818', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (9, 'ecommerce/test/6E8rpaNc6', 'image', 'jpg', '2025-05-11 04:51:27.128', '2025-05-11 04:51:27.128', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (10, 'ecommerce/test/7lbRTZKFu', 'image', 'webp', '2025-05-11 04:51:27.733', '2025-05-11 04:51:27.733', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (11, 'ecommerce/test/3XOzjGjb-', 'image', 'webp', '2025-05-11 04:51:27.831', '2025-05-11 04:51:27.831', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (12, 'ecommerce/test/2kJtogosa', 'image', 'webp', '2025-05-11 04:51:27.832', '2025-05-11 04:51:27.832', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (13, 'ecommerce/test/8AKfzzipX', 'image', 'webp', '2025-05-11 04:51:29.159', '2025-05-11 04:51:29.159', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (14, 'ecommerce/test/4zg06_vkF', 'image', 'jpg', '2025-05-11 05:05:54.256', '2025-05-11 05:05:54.256', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (15, 'ecommerce/test/1dd6ctflu', 'image', 'webp', '2025-05-11 05:05:54.78', '2025-05-11 05:05:54.78', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (16, 'ecommerce/test/3NLNKejGT', 'image', 'webp', '2025-05-11 05:05:55.052', '2025-05-11 05:05:55.052', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (17, 'ecommerce/test/2UmoHYI_d', 'image', 'webp', '2025-05-11 05:05:56.111', '2025-05-11 05:05:56.111', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (18, 'ecommerce/test/31mC2Ow6f', 'image', 'webp', '2025-05-11 05:08:57.361', '2025-05-11 05:08:57.361', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (19, 'ecommerce/test/4QxUZxrhC', 'image', 'webp', '2025-05-11 05:08:57.71', '2025-05-11 05:08:57.71', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (20, 'ecommerce/test/1pLZ53dK6', 'image', 'webp', '2025-05-11 05:08:59.949', '2025-05-11 05:08:59.949', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (21, 'ecommerce/test/2A7w-WHjv', 'image', 'webp', '2025-05-11 05:09:00.133', '2025-05-11 05:09:00.133', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (22, 'ecommerce/test/4LeP-NkxQ', 'image', 'webp', '2025-05-11 05:12:51.052', '2025-05-11 05:12:51.052', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (23, 'ecommerce/test/3aeMG3q_V', 'image', 'webp', '2025-05-11 05:12:51.92', '2025-05-11 05:12:51.92', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (24, 'ecommerce/test/6YZSDMUTy', 'image', 'webp', '2025-05-11 05:12:52.226', '2025-05-11 05:12:52.226', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (25, 'ecommerce/test/2an2Wphq0', 'image', 'webp', '2025-05-11 05:12:52.369', '2025-05-11 05:12:52.369', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (26, 'ecommerce/test/5ynuOGGyH', 'image', 'webp', '2025-05-11 05:12:52.474', '2025-05-11 05:12:52.474', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (27, 'ecommerce/test/7v1-1gu2o', 'image', 'jpg', '2025-05-11 05:12:52.684', '2025-05-11 05:12:52.684', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (28, 'ecommerce/test/1jS1wyPoD', 'image', 'webp', '2025-05-11 05:12:55.446', '2025-05-11 05:12:55.446', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (29, 'ecommerce/test/4qFAi9Nib', 'image', 'webp', '2025-05-11 05:15:19.026', '2025-05-11 05:15:19.026', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (30, 'ecommerce/test/1wafGgx8r', 'image', 'webp', '2025-05-11 05:15:19.321', '2025-05-11 05:15:19.321', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (31, 'ecommerce/test/2QybZXWtF', 'image', 'jpg', '2025-05-11 05:15:19.322', '2025-05-11 05:15:19.322', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (32, 'ecommerce/test/38VjPn5hR', 'image', 'webp', '2025-05-11 05:15:19.456', '2025-05-11 05:15:19.456', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (33, 'ecommerce/test/27VhodOUG', 'image', 'webp', '2025-05-11 05:20:29.107', '2025-05-11 05:20:29.107', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (34, 'ecommerce/test/3DIOfUZ7U', 'image', 'webp', '2025-05-11 05:20:29.256', '2025-05-11 05:20:29.256', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (35, 'ecommerce/test/4Gpu27wp-', 'image', 'webp', '2025-05-11 05:20:29.574', '2025-05-11 05:20:29.574', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (36, 'ecommerce/test/1zC-RX4Cb', 'image', 'webp', '2025-05-11 05:20:30.024', '2025-05-11 05:20:30.024', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (37, 'ecommerce/test/1zqmIrzXk', 'image', 'webp', '2025-05-11 05:25:14.352', '2025-05-11 05:25:14.352', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (38, 'ecommerce/test/2uymTbwCB', 'image', 'webp', '2025-05-11 05:25:14.353', '2025-05-11 05:25:14.353', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (39, 'ecommerce/test/4f8ohRou1', 'image', 'webp', '2025-05-11 05:25:14.7', '2025-05-11 05:25:14.7', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (40, 'ecommerce/test/3uLAW2y_1', 'image', 'webp', '2025-05-11 05:25:15.146', '2025-05-11 05:25:15.146', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (41, 'ecommerce/test/38Fu3DTej', 'image', 'jpg', '2025-05-11 05:29:48.243', '2025-05-11 05:29:48.243', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (42, 'ecommerce/test/28pYaSW7E', 'image', 'jpg', '2025-05-11 05:29:48.288', '2025-05-11 05:29:48.288', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (43, 'ecommerce/test/1IIcv3dCz', 'image', 'png', '2025-05-11 05:29:48.45', '2025-05-11 05:29:48.45', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (44, 'ecommerce/test/4oOPi-rVV', 'image', 'jpg', '2025-05-11 05:32:09.518', '2025-05-11 05:32:09.518', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (45, 'ecommerce/test/3ycbIqFyx', 'image', 'jpg', '2025-05-11 05:32:09.583', '2025-05-11 05:32:09.583', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (46, 'ecommerce/test/2MxQRR9gz', 'image', 'jpg', '2025-05-11 05:32:09.778', '2025-05-11 05:32:09.778', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (47, 'ecommerce/test/1zYAOxpue', 'image', 'jpg', '2025-05-11 05:32:11.01', '2025-05-11 05:32:11.01', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (48, 'ecommerce/test/4RzLZxiGF', 'image', 'jpg', '2025-05-11 05:36:56.274', '2025-05-11 05:36:56.274', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (49, 'ecommerce/test/3ztAdArI5', 'image', 'jpg', '2025-05-11 05:36:56.276', '2025-05-11 05:36:56.276', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (50, 'ecommerce/test/22nDtAi7b', 'image', 'jpg', '2025-05-11 05:36:56.577', '2025-05-11 05:36:56.577', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (51, 'ecommerce/test/1y7h-dfZR', 'image', 'jpg', '2025-05-11 05:36:56.719', '2025-05-11 05:36:56.719', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (52, 'ecommerce/test/4isYzkR9C', 'image', 'png', '2025-05-11 05:40:15.849', '2025-05-11 05:40:15.849', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (53, 'ecommerce/test/1Qyl05u2X', 'image', 'jpg', '2025-05-11 05:40:15.849', '2025-05-11 05:40:15.849', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (54, 'ecommerce/test/20hNqLDTk', 'image', 'png', '2025-05-11 05:40:16.033', '2025-05-11 05:40:16.033', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (55, 'ecommerce/test/3VB0kxlvY', 'image', 'png', '2025-05-11 05:40:16.122', '2025-05-11 05:40:16.122', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (56, 'ecommerce/test/79wNOLge3', 'image', 'webp', '2025-05-11 05:44:46.557', '2025-05-11 05:44:46.557', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (57, 'ecommerce/test/1-johGJjc', 'image', 'webp', '2025-05-11 05:44:46.95', '2025-05-11 05:44:46.95', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (58, 'ecommerce/test/3jEsPsJOY', 'image', 'webp', '2025-05-11 05:44:47.002', '2025-05-11 05:44:47.002', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (59, 'ecommerce/test/5-E8Y4UDb', 'image', 'webp', '2025-05-11 05:44:47.411', '2025-05-11 05:44:47.411', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (60, 'ecommerce/test/2xq9xzQG_', 'image', 'webp', '2025-05-11 05:44:48.981', '2025-05-11 05:44:48.981', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (61, 'ecommerce/test/4OqZdjC_c', 'image', 'webp', '2025-05-11 05:44:48.981', '2025-05-11 05:44:48.981', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (62, 'ecommerce/test/6o8CwIfp7', 'image', 'webp', '2025-05-11 05:44:49.748', '2025-05-11 05:44:49.748', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (63, 'ecommerce/test/3K9GMbAfK', 'image', 'webp', '2025-05-11 05:51:18.06', '2025-05-11 05:51:18.06', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (64, 'ecommerce/test/6GO0ZLipj', 'image', 'webp', '2025-05-11 05:51:19.074', '2025-05-11 05:51:19.074', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (65, 'ecommerce/test/4lHyyZsbV', 'image', 'webp', '2025-05-11 05:51:19.726', '2025-05-11 05:51:19.726', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (66, 'ecommerce/test/5Ygu4BpHz', 'image', 'webp', '2025-05-11 05:51:20.117', '2025-05-11 05:51:20.117', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (67, 'ecommerce/test/6iW1kaPYs', 'image', 'jpg', '2025-05-11 05:51:20.118', '2025-05-11 05:51:20.118', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (68, 'ecommerce/test/29UinImRy', 'image', 'webp', '2025-05-11 05:51:20.742', '2025-05-11 05:51:20.742', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (69, 'ecommerce/test/1C3_dGB7X', 'image', 'webp', '2025-05-11 05:51:21.235', '2025-05-11 05:51:21.235', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (70, 'ecommerce/test/7OAbXkOzL', 'image', 'webp', '2025-05-11 05:51:23.61', '2025-05-11 05:51:23.61', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (71, 'ecommerce/test/4sdZiZAZO', 'image', 'webp', '2025-05-11 05:54:57.362', '2025-05-11 05:54:57.362', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (72, 'ecommerce/test/1gRZJmILn', 'image', 'webp', '2025-05-11 05:54:58.576', '2025-05-11 05:54:58.576', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (73, 'ecommerce/test/8TsbK_43I', 'image', 'webp', '2025-05-11 05:54:58.8', '2025-05-11 05:54:58.8', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (74, 'ecommerce/test/6iXRRDddH', 'image', 'webp', '2025-05-11 05:54:58.864', '2025-05-11 05:54:58.864', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (75, 'ecommerce/test/7tkveCut-', 'image', 'jpg', '2025-05-11 05:54:59.206', '2025-05-11 05:54:59.206', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (76, 'ecommerce/test/2xgsSmQQp', 'image', 'webp', '2025-05-11 05:54:59.207', '2025-05-11 05:54:59.207', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (77, 'ecommerce/test/5kvYnvfOe', 'image', 'webp', '2025-05-11 05:54:59.984', '2025-05-11 05:54:59.984', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (78, 'ecommerce/test/3LcK26K9c', 'image', 'webp', '2025-05-11 05:55:00.429', '2025-05-11 05:55:00.429', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (79, 'ecommerce/test/74Nrt0IJU', 'image', 'webp', '2025-05-11 06:01:25.873', '2025-05-11 06:01:25.873', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (80, 'ecommerce/test/1XljQVx05', 'image', 'webp', '2025-05-11 06:01:26.14', '2025-05-11 06:01:26.14', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (81, 'ecommerce/test/3FDmGEYYo', 'image', 'webp', '2025-05-11 06:01:26.21', '2025-05-11 06:01:26.21', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (82, 'ecommerce/test/4IDJHbpOv', 'image', 'webp', '2025-05-11 06:01:26.238', '2025-05-11 06:01:26.238', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (83, 'ecommerce/test/2I4O2pn2N', 'image', 'webp', '2025-05-11 06:01:26.358', '2025-05-11 06:01:26.358', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (84, 'ecommerce/test/5ZsF7cUYD', 'image', 'webp', '2025-05-11 06:01:27.422', '2025-05-11 06:01:27.422', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (85, 'ecommerce/test/8tys-Qj_t', 'image', 'webp', '2025-05-11 06:01:27.469', '2025-05-11 06:01:27.469', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (86, 'ecommerce/test/6Huoc0DVn', 'image', 'webp', '2025-05-11 06:01:28.065', '2025-05-11 06:01:28.065', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (87, 'ecommerce/test/8vtO8yNzy', 'image', 'webp', '2025-05-11 06:04:30.563', '2025-05-11 06:04:30.563', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (88, 'ecommerce/test/5RwnmohcM', 'image', 'webp', '2025-05-11 06:04:30.803', '2025-05-11 06:04:30.803', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (89, 'ecommerce/test/4VrK9vudp', 'image', 'webp', '2025-05-11 06:04:32.316', '2025-05-11 06:04:32.316', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (90, 'ecommerce/test/1ag5OgXey', 'image', 'webp', '2025-05-11 06:04:32.521', '2025-05-11 06:04:32.521', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (91, 'ecommerce/test/3HoaVesJF', 'image', 'webp', '2025-05-11 06:04:32.522', '2025-05-11 06:04:32.522', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (92, 'ecommerce/test/7LeXkOq6h', 'image', 'jpg', '2025-05-11 06:04:33.431', '2025-05-11 06:04:33.431', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (93, 'ecommerce/test/2J2y97I6j', 'image', 'webp', '2025-05-11 06:04:34.965', '2025-05-11 06:04:34.965', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (94, 'ecommerce/test/6eU7Bmhey', 'image', 'webp', '2025-05-11 06:04:35.562', '2025-05-11 06:04:35.562', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (95, 'ecommerce/test/4rYnGkSgw', 'image', 'webp', '2025-05-11 06:08:05.558', '2025-05-11 06:08:05.558', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (96, 'ecommerce/test/2yBU6ZJ4X', 'image', 'webp', '2025-05-11 06:08:05.559', '2025-05-11 06:08:05.559', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (97, 'ecommerce/test/3EPRKf6T0', 'image', 'webp', '2025-05-11 06:08:05.732', '2025-05-11 06:08:05.732', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (98, 'ecommerce/test/8NXLGSiIA', 'image', 'webp', '2025-05-11 06:08:06.039', '2025-05-11 06:08:06.039', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (99, 'ecommerce/test/5DbPMRGx4', 'image', 'webp', '2025-05-11 06:08:06.41', '2025-05-11 06:08:06.41', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (100, 'ecommerce/test/7sR1EpMab', 'image', 'jpg', '2025-05-11 06:08:08.101', '2025-05-11 06:08:08.101', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (101, 'ecommerce/test/1ti4fCkni', 'image', 'webp', '2025-05-11 06:08:08.185', '2025-05-11 06:08:08.185', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (102, 'ecommerce/test/67As7VDc2', 'image', 'webp', '2025-05-11 06:08:08.8', '2025-05-11 06:08:08.8', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (103, 'ecommerce/test/4j9pKwhaT', 'image', 'webp', '2025-05-11 06:10:30.232', '2025-05-11 06:10:30.232', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (104, 'ecommerce/test/5G0UoiSK2', 'image', 'webp', '2025-05-11 06:10:30.439', '2025-05-11 06:10:30.439', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (105, 'ecommerce/test/395hpnkkg', 'image', 'jpg', '2025-05-11 06:10:30.921', '2025-05-11 06:10:30.921', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (106, 'ecommerce/test/78jwDco9f', 'image', 'webp', '2025-05-11 06:10:30.943', '2025-05-11 06:10:30.943', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (107, 'ecommerce/test/2IXMDF3b9', 'image', 'webp', '2025-05-11 06:10:31.133', '2025-05-11 06:10:31.133', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (108, 'ecommerce/test/1y5IMw_9a', 'image', 'webp', '2025-05-11 06:10:31.671', '2025-05-11 06:10:31.671', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (109, 'ecommerce/test/6LtxFdsd3', 'image', 'webp', '2025-05-11 06:10:31.842', '2025-05-11 06:10:31.842', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (110, 'ecommerce/test/2NfyGOGSJ', 'image', 'webp', '2025-05-11 06:13:23.839', '2025-05-11 06:13:23.839', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (111, 'ecommerce/test/17fJg8NAR', 'image', 'webp', '2025-05-11 06:13:24.48', '2025-05-11 06:13:24.48', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (112, 'ecommerce/test/8CknTAZd6', 'image', 'webp', '2025-05-11 06:13:24.616', '2025-05-11 06:13:24.616', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (113, 'ecommerce/test/4ILMe1YNP', 'image', 'webp', '2025-05-11 06:13:24.744', '2025-05-11 06:13:24.744', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (114, 'ecommerce/test/5x6538-_Y', 'image', 'webp', '2025-05-11 06:13:25.044', '2025-05-11 06:13:25.044', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (115, 'ecommerce/test/6lD2JO4TI', 'image', 'jpg', '2025-05-11 06:13:25.211', '2025-05-11 06:13:25.211', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (116, 'ecommerce/test/77kY2LB4q', 'image', 'webp', '2025-05-11 06:13:26.231', '2025-05-11 06:13:26.231', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (117, 'ecommerce/test/3vbdPJLdr', 'image', 'webp', '2025-05-11 06:13:26.652', '2025-05-11 06:13:26.652', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (118, 'ecommerce/test/8xtZj-TJS', 'image', 'webp', '2025-05-11 06:16:25.197', '2025-05-11 06:16:25.197', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (119, 'ecommerce/test/53_VI6j6o', 'image', 'webp', '2025-05-11 06:16:25.434', '2025-05-11 06:16:25.434', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (120, 'ecommerce/test/7upNhhoEp', 'image', 'webp', '2025-05-11 06:16:25.566', '2025-05-11 06:16:25.566', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (121, 'ecommerce/test/6P9-Rruyv', 'image', 'webp', '2025-05-11 06:16:25.758', '2025-05-11 06:16:25.758', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (122, 'ecommerce/test/2JBalJOSh', 'image', 'webp', '2025-05-11 06:16:25.873', '2025-05-11 06:16:25.873', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (123, 'ecommerce/test/1NSdLIfNg', 'image', 'webp', '2025-05-11 06:16:26.646', '2025-05-11 06:16:26.646', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (124, 'ecommerce/test/9ocLgKdjm', 'image', 'webp', '2025-05-11 06:16:27.566', '2025-05-11 06:16:27.566', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (125, 'ecommerce/test/10YPhCPCcL', 'image', 'webp', '2025-05-11 06:16:27.632', '2025-05-11 06:16:27.632', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (126, 'ecommerce/test/3ooH-SY4Q', 'image', 'webp', '2025-05-11 06:16:28.811', '2025-05-11 06:16:28.811', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (127, 'ecommerce/test/4BuKEL6uW', 'image', 'webp', '2025-05-11 06:16:30.516', '2025-05-11 06:16:30.516', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (128, 'ecommerce/test/7UKPBTcum', 'image', 'webp', '2025-05-11 06:19:20.273', '2025-05-11 06:19:20.273', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (129, 'ecommerce/test/1QbJzrMe-', 'image', 'webp', '2025-05-11 06:19:20.952', '2025-05-11 06:19:20.952', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (130, 'ecommerce/test/5Jz_7pvep', 'image', 'webp', '2025-05-11 06:19:21.255', '2025-05-11 06:19:21.255', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (131, 'ecommerce/test/454vT40OT', 'image', 'webp', '2025-05-11 06:19:21.407', '2025-05-11 06:19:21.407', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (132, 'ecommerce/test/3aKrj0jsP', 'image', 'webp', '2025-05-11 06:19:21.919', '2025-05-11 06:19:21.919', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (133, 'ecommerce/test/6w86sVDvS', 'image', 'jpg', '2025-05-11 06:19:22.121', '2025-05-11 06:19:22.121', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (134, 'ecommerce/test/8tmi2U0VE', 'image', 'webp', '2025-05-11 06:19:22.417', '2025-05-11 06:19:22.417', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (135, 'ecommerce/test/2W-4GA584', 'image', 'webp', '2025-05-11 06:19:23.238', '2025-05-11 06:19:23.238', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (136, 'ecommerce/test/8Yza8Z9Nv', 'image', 'webp', '2025-05-11 06:27:09.828', '2025-05-11 06:27:09.828', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (137, 'ecommerce/test/3J-r2EpQ2', 'image', 'webp', '2025-05-11 06:27:09.877', '2025-05-11 06:27:09.877', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (138, 'ecommerce/test/5XS68HDwC', 'image', 'webp', '2025-05-11 06:27:10.477', '2025-05-11 06:27:10.477', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (139, 'ecommerce/test/2udSew6f0', 'image', 'webp', '2025-05-11 06:27:10.897', '2025-05-11 06:27:10.897', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (140, 'ecommerce/test/96fG_DMwK', 'image', 'webp', '2025-05-11 06:27:11.305', '2025-05-11 06:27:11.305', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (141, 'ecommerce/test/6743jdzKy', 'image', 'webp', '2025-05-11 06:27:12.76', '2025-05-11 06:27:12.76', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (142, 'ecommerce/test/7mpFizL2b', 'image', 'webp', '2025-05-11 06:27:13.449', '2025-05-11 06:27:13.449', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (143, 'ecommerce/test/47M_YHq9d', 'image', 'png', '2025-05-11 06:27:14.081', '2025-05-11 06:27:14.081', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (144, 'ecommerce/test/1Sl-cLeIX', 'image', 'webp', '2025-05-11 06:27:14.691', '2025-05-11 06:27:14.691', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (145, 'ecommerce/test/4e2CVgDvy', 'image', 'webp', '2025-05-11 06:30:18.371', '2025-05-11 06:30:18.371', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (146, 'ecommerce/test/28abBfYIT', 'image', 'webp', '2025-05-11 06:30:18.664', '2025-05-11 06:30:18.664', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (147, 'ecommerce/test/8DoAzveiB', 'image', 'webp', '2025-05-11 06:30:18.986', '2025-05-11 06:30:18.986', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (148, 'ecommerce/test/5qkpKz8n7', 'image', 'webp', '2025-05-11 06:30:19.045', '2025-05-11 06:30:19.045', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (149, 'ecommerce/test/33bPn6BWA', 'image', 'webp', '2025-05-11 06:30:19.81', '2025-05-11 06:30:19.81', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (150, 'ecommerce/test/6ihn7g2ta', 'image', 'webp', '2025-05-11 06:30:19.906', '2025-05-11 06:30:19.906', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (151, 'ecommerce/test/1ryw2u_TZ', 'image', 'webp', '2025-05-11 06:30:20.316', '2025-05-11 06:30:20.316', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (152, 'ecommerce/test/7CsfXKlzj', 'image', 'jpg', '2025-05-11 06:30:20.565', '2025-05-11 06:30:20.565', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (153, 'ecommerce/test/8erNn_eH7', 'image', 'webp', '2025-05-11 06:33:10.525', '2025-05-11 06:33:10.525', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (154, 'ecommerce/test/7i0br0IHC', 'image', 'jpg', '2025-05-11 06:33:10.818', '2025-05-11 06:33:10.818', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (155, 'ecommerce/test/5kKCIM8c8', 'image', 'jpg', '2025-05-11 06:33:10.852', '2025-05-11 06:33:10.852', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (156, 'ecommerce/test/40tf024Bi', 'image', 'webp', '2025-05-11 06:33:10.918', '2025-05-11 06:33:10.918', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (157, 'ecommerce/test/1-JeO1Wo-', 'image', 'webp', '2025-05-11 06:33:11.02', '2025-05-11 06:33:11.02', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (158, 'ecommerce/test/6Bg6343_o', 'image', 'jpg', '2025-05-11 06:33:11.161', '2025-05-11 06:33:11.161', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (159, 'ecommerce/test/2nKtozEce', 'image', 'webp', '2025-05-11 06:33:11.735', '2025-05-11 06:33:11.735', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (160, 'ecommerce/test/3XH9hr860', 'image', 'webp', '2025-05-11 06:33:12.546', '2025-05-11 06:33:12.546', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (161, 'ecommerce/test/4El3Pq-I6', 'image', 'webp', '2025-05-11 06:36:07.273', '2025-05-11 06:36:07.273', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (162, 'ecommerce/test/2lmMGDPvA', 'image', 'webp', '2025-05-11 06:36:07.273', '2025-05-11 06:36:07.273', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (163, 'ecommerce/test/8Wl8KnBWz', 'image', 'webp', '2025-05-11 06:36:07.569', '2025-05-11 06:36:07.569', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (164, 'ecommerce/test/53s2waA4I', 'image', 'webp', '2025-05-11 06:36:07.57', '2025-05-11 06:36:07.57', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (165, 'ecommerce/test/6XzozpmAf', 'image', 'webp', '2025-05-11 06:36:08.056', '2025-05-11 06:36:08.056', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (166, 'ecommerce/test/3ghDumyvz', 'image', 'webp', '2025-05-11 06:36:08.089', '2025-05-11 06:36:08.089', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (167, 'ecommerce/test/7rpHfF5_W', 'image', 'jpg', '2025-05-11 06:36:08.851', '2025-05-11 06:36:08.851', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (168, 'ecommerce/test/1PDWtfxdZ', 'image', 'webp', '2025-05-11 06:36:08.984', '2025-05-11 06:36:08.984', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (169, 'ecommerce/test/1388T9GHR', 'image', 'webp', '2025-05-11 06:38:58.895', '2025-05-11 06:38:58.895', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (170, 'ecommerce/test/2CN2N4bZ5', 'image', 'webp', '2025-05-11 06:38:59.09', '2025-05-11 06:38:59.09', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (171, 'ecommerce/test/4PXurmsX0', 'image', 'webp', '2025-05-11 06:38:59.529', '2025-05-11 06:38:59.529', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (172, 'ecommerce/test/3VuWzToU8', 'image', 'jpg', '2025-05-11 06:38:59.814', '2025-05-11 06:38:59.814', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (173, 'ecommerce/test/8oCUjeJXa', 'image', 'webp', '2025-05-11 06:39:00.238', '2025-05-11 06:39:00.238', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (174, 'ecommerce/test/7PxsYOSBH', 'image', 'webp', '2025-05-11 06:39:00.793', '2025-05-11 06:39:00.793', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (175, 'ecommerce/test/5qSK7WNSu', 'image', 'jpg', '2025-05-11 06:39:01.361', '2025-05-11 06:39:01.361', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (176, 'ecommerce/test/6lHEskuqz', 'image', 'webp', '2025-05-11 06:39:05.005', '2025-05-11 06:39:05.005', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (177, 'ecommerce/test/7cG_wdKjJ', 'image', 'webp', '2025-05-11 06:41:07.056', '2025-05-11 06:41:07.056', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (178, 'ecommerce/test/3DYtjCnu4', 'image', 'webp', '2025-05-11 06:41:07.462', '2025-05-11 06:41:07.462', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (179, 'ecommerce/test/5w9guf8SQ', 'image', 'webp', '2025-05-11 06:41:07.486', '2025-05-11 06:41:07.486', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (180, 'ecommerce/test/8wmMQcC7_', 'image', 'webp', '2025-05-11 06:41:07.791', '2025-05-11 06:41:07.791', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (181, 'ecommerce/test/2YcR0kOo1', 'image', 'webp', '2025-05-11 06:41:07.843', '2025-05-11 06:41:07.843', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (182, 'ecommerce/test/6u2q3NwvP', 'image', 'webp', '2025-05-11 06:41:07.947', '2025-05-11 06:41:07.947', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (183, 'ecommerce/test/1gs-lCa2x', 'image', 'webp', '2025-05-11 06:41:08.516', '2025-05-11 06:41:08.516', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (184, 'ecommerce/test/4cdvbJGsP', 'image', 'webp', '2025-05-11 06:41:08.956', '2025-05-11 06:41:08.956', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (185, 'ecommerce/test/3Wf4sLijl', 'image', 'webp', '2025-05-11 06:43:00.739', '2025-05-11 06:43:00.739', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (186, 'ecommerce/test/7rEOs1xvD', 'image', 'webp', '2025-05-11 06:43:00.834', '2025-05-11 06:43:00.834', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (187, 'ecommerce/test/8_FhJyKsu', 'image', 'webp', '2025-05-11 06:43:00.998', '2025-05-11 06:43:00.998', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (188, 'ecommerce/test/1MkuaEJ9B', 'image', 'webp', '2025-05-11 06:43:01.058', '2025-05-11 06:43:01.058', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (189, 'ecommerce/test/67JnNGSnI', 'image', 'webp', '2025-05-11 06:43:01.462', '2025-05-11 06:43:01.462', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (190, 'ecommerce/test/5HgcL7zS1', 'image', 'webp', '2025-05-11 06:43:02.062', '2025-05-11 06:43:02.062', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (191, 'ecommerce/test/2T_YM8mWl', 'image', 'webp', '2025-05-11 06:43:02.676', '2025-05-11 06:43:02.676', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (192, 'ecommerce/test/42VGvH1O9', 'image', 'webp', '2025-05-11 06:43:02.782', '2025-05-11 06:43:02.782', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2000, 'ecommerce/test/user-avatarGTTDTV-Y', 'image', 'png', '2025-05-15 12:04:19.104', '2025-05-15 12:04:19.104', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2001, 'ecommerce/test/user-avatarGTTDTV-Y', 'image', 'png', '2025-05-15 12:08:59.121', '2025-05-15 12:08:59.121', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2002, 'ecommerce/test/user-avatarWzXk9uUE', 'image', 'png', '2025-05-15 12:10:12.92', '2025-05-15 12:10:12.92', NULL, false) ON CONFLICT DO NOTHING;


--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.options VALUES (1, 'aa', 11110.000000000000000000000000000000, 0, '2025-05-16 09:01:12.197', '2025-05-16 09:01:12.197', NULL, 33, 1) ON CONFLICT DO NOTHING;


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: payment_transaction; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: policies; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: product_resources; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_resources VALUES (1, 2, '2025-05-11 11:20:31') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (1, 3, '2025-05-11 11:20:31') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (1, 4, '2025-05-11 11:20:31') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 5, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 6, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 7, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 8, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 9, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 10, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 11, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 12, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (2, 13, '2025-05-11 04:51:51.765') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (3, 14, '2025-05-11 05:06:12.423') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (3, 15, '2025-05-11 05:06:12.423') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (3, 16, '2025-05-11 05:06:12.423') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (3, 17, '2025-05-11 05:06:12.423') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (4, 18, '2025-05-11 05:09:22.939') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (4, 19, '2025-05-11 05:09:22.939') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (4, 20, '2025-05-11 05:09:22.939') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (4, 21, '2025-05-11 05:09:22.939') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (5, 22, '2025-05-11 05:13:22.772') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (5, 23, '2025-05-11 05:13:22.772') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (5, 24, '2025-05-11 05:13:22.772') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (5, 25, '2025-05-11 05:13:22.772') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (5, 26, '2025-05-11 05:13:22.772') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (5, 27, '2025-05-11 05:13:22.772') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (5, 28, '2025-05-11 05:13:22.772') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (6, 29, '2025-05-11 05:16:15.838') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (6, 30, '2025-05-11 05:16:15.838') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (6, 31, '2025-05-11 05:16:15.838') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (6, 32, '2025-05-11 05:16:15.838') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (7, 33, '2025-05-11 05:21:27.129') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (7, 34, '2025-05-11 05:21:27.129') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (7, 35, '2025-05-11 05:21:27.129') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (7, 36, '2025-05-11 05:21:27.129') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (8, 37, '2025-05-11 05:28:15.421') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (8, 38, '2025-05-11 05:28:15.421') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (8, 39, '2025-05-11 05:28:15.421') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (8, 40, '2025-05-11 05:28:15.421') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (9, 41, '2025-05-11 05:30:11.93') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (9, 42, '2025-05-11 05:30:11.93') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (9, 43, '2025-05-11 05:30:11.93') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (10, 44, '2025-05-11 05:32:39.364') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (10, 45, '2025-05-11 05:32:39.364') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (10, 46, '2025-05-11 05:32:39.364') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (10, 47, '2025-05-11 05:32:39.364') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (11, 41, '2025-05-11 05:33:42.242') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (11, 42, '2025-05-11 05:33:42.242') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (11, 43, '2025-05-11 05:33:42.242') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (12, 48, '2025-05-11 05:37:30.001') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (12, 49, '2025-05-11 05:37:30.001') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (12, 50, '2025-05-11 05:37:30.001') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (12, 51, '2025-05-11 05:37:30.001') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (13, 52, '2025-05-11 05:40:30.588') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (13, 53, '2025-05-11 05:40:30.588') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (13, 54, '2025-05-11 05:40:30.588') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (13, 55, '2025-05-11 05:40:30.588') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (14, 56, '2025-05-11 05:45:09.976') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (14, 57, '2025-05-11 05:45:09.976') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (14, 58, '2025-05-11 05:45:09.976') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (14, 59, '2025-05-11 05:45:09.976') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (14, 60, '2025-05-11 05:45:09.976') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (14, 61, '2025-05-11 05:45:09.976') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (14, 62, '2025-05-11 05:45:09.976') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (15, 63, '2025-05-11 05:51:50.109') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (15, 64, '2025-05-11 05:51:50.109') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (15, 65, '2025-05-11 05:51:50.109') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (15, 66, '2025-05-11 05:51:50.109') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (15, 67, '2025-05-11 05:51:50.109') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (15, 68, '2025-05-11 05:51:50.109') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (15, 69, '2025-05-11 05:51:50.109') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (15, 70, '2025-05-11 05:51:50.109') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (16, 71, '2025-05-11 05:55:19.296') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (16, 72, '2025-05-11 05:55:19.296') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (16, 73, '2025-05-11 05:55:19.296') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (16, 74, '2025-05-11 05:55:19.296') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (16, 75, '2025-05-11 05:55:19.296') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (16, 76, '2025-05-11 05:55:19.296') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (16, 77, '2025-05-11 05:55:19.296') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (16, 78, '2025-05-11 05:55:19.296') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (17, 79, '2025-05-11 06:01:46.833') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (17, 80, '2025-05-11 06:01:46.833') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (17, 81, '2025-05-11 06:01:46.833') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (17, 82, '2025-05-11 06:01:46.833') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (17, 83, '2025-05-11 06:01:46.833') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (17, 84, '2025-05-11 06:01:46.833') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (17, 85, '2025-05-11 06:01:46.833') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (17, 86, '2025-05-11 06:01:46.833') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (18, 87, '2025-05-11 06:04:50.493') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (18, 88, '2025-05-11 06:04:50.493') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (18, 89, '2025-05-11 06:04:50.493') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (18, 90, '2025-05-11 06:04:50.493') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (18, 91, '2025-05-11 06:04:50.493') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (18, 92, '2025-05-11 06:04:50.493') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (18, 93, '2025-05-11 06:04:50.493') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (18, 94, '2025-05-11 06:04:50.493') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (19, 95, '2025-05-11 06:08:23.258') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (19, 96, '2025-05-11 06:08:23.258') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (19, 97, '2025-05-11 06:08:23.258') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (19, 98, '2025-05-11 06:08:23.258') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (19, 99, '2025-05-11 06:08:23.258') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (19, 100, '2025-05-11 06:08:23.258') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (19, 101, '2025-05-11 06:08:23.258') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (19, 102, '2025-05-11 06:08:23.258') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (20, 103, '2025-05-11 06:10:55.231') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (20, 104, '2025-05-11 06:10:55.231') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (20, 105, '2025-05-11 06:10:55.231') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (20, 106, '2025-05-11 06:10:55.231') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (20, 107, '2025-05-11 06:10:55.231') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (20, 108, '2025-05-11 06:10:55.231') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (20, 109, '2025-05-11 06:10:55.231') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (21, 110, '2025-05-11 06:13:41.906') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (21, 111, '2025-05-11 06:13:41.906') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (21, 112, '2025-05-11 06:13:41.906') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (21, 113, '2025-05-11 06:13:41.906') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (21, 114, '2025-05-11 06:13:41.906') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (21, 115, '2025-05-11 06:13:41.906') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (21, 116, '2025-05-11 06:13:41.906') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (21, 117, '2025-05-11 06:13:41.906') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 119, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 120, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 121, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 122, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 123, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 124, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 125, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 126, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (22, 127, '2025-05-11 06:17:04.488') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (23, 128, '2025-05-11 06:19:48.223') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (23, 129, '2025-05-11 06:19:48.223') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (23, 130, '2025-05-11 06:19:48.223') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (23, 131, '2025-05-11 06:19:48.223') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (23, 132, '2025-05-11 06:19:48.223') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (23, 133, '2025-05-11 06:19:48.223') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (23, 134, '2025-05-11 06:19:48.223') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (23, 135, '2025-05-11 06:19:48.223') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 136, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 137, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 138, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 139, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 140, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 141, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 142, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 143, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (24, 144, '2025-05-11 06:27:34.095') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (25, 145, '2025-05-11 06:30:41.847') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (25, 146, '2025-05-11 06:30:41.847') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (25, 147, '2025-05-11 06:30:41.847') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (25, 148, '2025-05-11 06:30:41.847') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (25, 149, '2025-05-11 06:30:41.847') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (25, 150, '2025-05-11 06:30:41.847') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (25, 151, '2025-05-11 06:30:41.847') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (25, 152, '2025-05-11 06:30:41.847') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (26, 153, '2025-05-11 06:33:27.118') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (26, 154, '2025-05-11 06:33:27.118') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (26, 155, '2025-05-11 06:33:27.118') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (26, 156, '2025-05-11 06:33:27.118') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (26, 157, '2025-05-11 06:33:27.118') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (26, 158, '2025-05-11 06:33:27.118') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (26, 159, '2025-05-11 06:33:27.118') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (26, 160, '2025-05-11 06:33:27.118') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (27, 161, '2025-05-11 06:36:25.526') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (27, 162, '2025-05-11 06:36:25.526') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (27, 163, '2025-05-11 06:36:25.526') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (27, 164, '2025-05-11 06:36:25.526') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (27, 165, '2025-05-11 06:36:25.526') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (27, 166, '2025-05-11 06:36:25.526') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (27, 167, '2025-05-11 06:36:25.526') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (27, 168, '2025-05-11 06:36:25.526') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (28, 169, '2025-05-11 06:39:20.495') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (28, 170, '2025-05-11 06:39:20.495') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (28, 171, '2025-05-11 06:39:20.495') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (28, 172, '2025-05-11 06:39:20.495') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (28, 173, '2025-05-11 06:39:20.495') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (28, 174, '2025-05-11 06:39:20.495') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (28, 175, '2025-05-11 06:39:20.495') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (28, 176, '2025-05-11 06:39:20.495') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (29, 177, '2025-05-11 06:41:24.899') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (29, 178, '2025-05-11 06:41:24.899') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (29, 179, '2025-05-11 06:41:24.899') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (29, 180, '2025-05-11 06:41:24.899') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (29, 181, '2025-05-11 06:41:24.899') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (29, 182, '2025-05-11 06:41:24.899') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (29, 183, '2025-05-11 06:41:24.899') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (29, 184, '2025-05-11 06:41:24.899') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (30, 185, '2025-05-11 06:43:18.663') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (30, 186, '2025-05-11 06:43:18.663') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (30, 187, '2025-05-11 06:43:18.663') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (30, 188, '2025-05-11 06:43:18.663') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (30, 189, '2025-05-11 06:43:18.663') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (30, 190, '2025-05-11 06:43:18.663') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (30, 191, '2025-05-11 06:43:18.663') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (30, 192, '2025-05-11 06:43:18.663') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (33, 1, '2025-05-16 09:01:12.203') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (33, 2, '2025-05-16 09:01:12.203') ON CONFLICT DO NOTHING;


--
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: promotion_order_items; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: promotion_orders; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: wishlists; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: abouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.abouts_id_seq', 1, false);


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.addresses_id_seq', 1, false);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: customer_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customer_services_id_seq', 1, false);


--
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.faqs_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.options_id_seq', 1, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_id_seq', 1, false);


--
-- Name: payment_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_transaction_id_seq', 1, false);


--
-- Name: policies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.policies_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 33, true);


--
-- Name: promotion_order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.promotion_order_items_id_seq', 1, false);


--
-- Name: promotion_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.promotion_orders_id_seq', 1, false);


--
-- Name: promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.promotions_id_seq', 1, false);


--
-- Name: resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.resources_id_seq', 2002, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: wishlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.wishlists_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

