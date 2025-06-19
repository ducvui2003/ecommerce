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
-- Data for Name: CommentLike; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations VALUES ('83a19801-5bae-439c-b3bf-13bf1fe939e1', '4869595b20b932734170e72fec889ed77fb6d39dbe5e0477edf95cb4c9052f1d', '2025-05-29 01:46:37.642401+00', '20250523110350_remove_payment_id_order', NULL, NULL, '2025-05-29 01:46:37.639089+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('19c260ad-86a8-4e6d-8c08-8f5dc4079e6b', 'df03d2a45935cf825cfb62c2e99791b53ada24825319d6bb2a3b54b8cc611f02', '2025-05-29 01:46:37.568977+00', '20250501102044_init_database', NULL, NULL, '2025-05-29 01:46:37.515014+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('8479f7fc-12e5-4669-ab09-0e17a430a6cf', '8564b21f3985740d69fcf4b93afaa0849dde7a43af87d9645fb514be2c80b028', '2025-05-29 01:46:37.575153+00', '20250514012744_product_bigint_into_decimal_price', NULL, NULL, '2025-05-29 01:46:37.570425+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('0a3ed992-43d9-42b5-b975-56a8028f1f9a', 'd9e2886dda014317ef16b712d59a5a894477c14ab3fb4dab207a621121919cfc', '2025-06-01 14:10:42.886587+00', '20250601141042_add_cascade_to_order_items', NULL, NULL, '2025-06-01 14:10:42.878994+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('b874bd31-6de0-4386-beb3-4e002b8240d2', 'f118d7add70ba0f31b5107b083ec7bb9df8f8d31d7ad2cdf4f189898ebdbce5a', '2025-05-29 01:46:37.583397+00', '20250514034040_price_numeric_product', NULL, NULL, '2025-05-29 01:46:37.576449+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('9bf15876-1084-468f-b8f6-6d59f2b1fde0', '0ea04267951b2abd45cd593081c700e219974df63d7254d2522dbc036102f882', '2025-05-29 01:46:37.648324+00', '20250527165946_remove_delivered_order_status', NULL, NULL, '2025-05-29 01:46:37.643513+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('e6502222-b2f0-41d1-a7cc-d272c8131c65', 'a565756f7415239fd3e58e3625a935d2c6e5548a6470c646b00c8f1fcf14096a', '2025-05-29 01:46:37.591063+00', '20250515064751_merge_volumn_option_product', NULL, NULL, '2025-05-29 01:46:37.584602+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('01a0c39a-3aa7-470d-b418-4d0957188060', '5c6bcd8e4c8cbf93b8e001bc4601f767a0a5880a24d378fece8dc1634cc278e5', '2025-05-29 01:46:37.597682+00', '20250515071032_rename_option_field', NULL, NULL, '2025-05-29 01:46:37.592469+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('d3d77b0b-f106-4519-8e0c-5b9000a21680', '380ed07db77e59552ebee5595f87ec761e3dd20363563c18f159ea85b4bc2785', '2025-05-29 01:46:37.603111+00', '20250516085440_option_remove_value_price_bigint_decimal', NULL, NULL, '2025-05-29 01:46:37.598493+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('f959b6de-6ad7-4b9e-8531-a29c4e9ce76c', 'ab7eca176bd097a9611e8d484342818ceb08403c3186da14bc0a3585d026c92a', '2025-05-29 01:46:37.654356+00', '20250527170134_remove_delivered_order_status_2', NULL, NULL, '2025-05-29 01:46:37.649168+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('8a8a357f-2945-417a-b9b4-de4a609ffae9', '81dc12fbf33dbd291885afbbe51d0d0906a94b04b2e7f8c1be146d090604d9db', '2025-05-29 01:46:37.612938+00', '20250516154253_change_cart', NULL, NULL, '2025-05-29 01:46:37.604003+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('17d421bc-f54e-469f-bf33-80a74a86b6dd', '15f20c6d19b3917fdf8260d5b3eb93ea920c213f729cbd068b1764959a2a5e12', '2025-05-29 01:46:37.616993+00', '20250516154409_rename_create_at', NULL, NULL, '2025-05-29 01:46:37.613909+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('1004e3fa-988d-403d-8770-3a5b5d538921', '65c9aeb191174e5a1ffcfe59078bae57869d52e0ad10cca4c8f519b8fe9006cd', '2025-05-29 01:46:37.622677+00', '20250516160851_rename_resource_option', NULL, NULL, '2025-05-29 01:46:37.618193+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('c3c066ed-b4cd-40de-ac6e-606f17410237', '74cd61111c91b2872dc2c862f58504bdb52edbf3f76a81bf667b8e2702e3703a', '2025-05-29 01:46:37.660827+00', '20250528023127_rename_customer_service_to_contact', NULL, NULL, '2025-05-29 01:46:37.65546+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('56c81a57-8d56-449e-b68e-52a5a9733866', 'a73cde307c6a24ac58193bb479ac1c7dc294933f602c8f57ad858b897656b6ec', '2025-05-29 01:46:37.627982+00', '20250522034931_modified_cart_item', NULL, NULL, '2025-05-29 01:46:37.623873+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('05e88002-44dc-452d-8818-d333b6b9a851', '981ca9635b21645d77ef6230ba5a3a9f96d68bfdcf1c2183775c50619c0ed4a3', '2025-05-29 01:46:37.633816+00', '20250522112911_collect_data_provider_payment_to_json', NULL, NULL, '2025-05-29 01:46:37.62883+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('8c7c21e6-0451-44ba-90d2-d7fb23ff4a39', '9066f0283dc7c33b37aa520393e5305743dddbc7600fac0249b9eb07889fb2c2', '2025-06-01 14:12:33.685784+00', '20250601141233_add_cascade_to_order_items', NULL, NULL, '2025-06-01 14:12:33.680979+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('fe2fdb1e-6bac-4952-9fe9-382cd7d9d710', '0ce506bfca6a024c0c97e1d8523dc169f3ab9bf1cb9160f5088d81e3cd48fa96', '2025-05-29 01:46:37.638252+00', '20250523034708_remove_provider_payment_transaction', NULL, NULL, '2025-05-29 01:46:37.634688+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('fea2df7f-6b27-49d9-8b95-c7dfe9066d3a', '3af6685bed4a77de840b19977e372d50b8e64424fbe8fe3a94306dfa9c58806b', '2025-05-29 01:46:37.666271+00', '20250528164134_add_thumbnail_table_product', NULL, NULL, '2025-05-29 01:46:37.662197+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('abc54acc-b0aa-42d1-bd0b-1c4f9092bf2e', 'fea4f1419f21c8dade4a3d8028b20b2c7e3ef7bf81ef343339b0271d7b406a24', '2025-06-12 04:02:31.799811+00', '20250609162625_add_view_column_in_product_table', NULL, NULL, '2025-06-12 04:02:31.795352+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('75dc2c8a-4c55-476a-904e-ddac78289b8f', 'd8bb9d5855a35b9b60115e58c6e1eeda0184928795bc554930f18a1d0dc3dc4c', '2025-05-29 01:46:37.671126+00', '20250528164609_remove_resource_id_table_product', NULL, NULL, '2025-05-29 01:46:37.667023+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('89d06e55-cc83-46ba-8776-d958b99c77e5', '815a470d87de5a92b8aae4010fc55190104f70d94cfd762eb1d15d189dfb5c19', '2025-06-01 14:14:32.418618+00', '20250601141432_order_delete_nullify_payment', NULL, NULL, '2025-06-01 14:14:32.414694+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('9f8485f7-5a75-4bac-8b0c-50fc1130995b', '12c4cc181429a1c1f41480f669e4fac60818dc4868cae07465b4fa2705f47abd', '2025-05-29 01:57:31.539414+00', '20250529014900_set_thumbnail_product_from_resource', NULL, NULL, '2025-05-29 01:57:31.533039+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('57a4fff9-2846-4b7a-ae4f-a721d1bf0911', 'e80975fcae54d563a4984f403947c445a8639cca1f95ce4a29197d871bf47e19', '2025-06-07 10:10:02.184928+00', '20250531115747_change_id_comment_to_uuid', NULL, NULL, '2025-06-07 10:10:02.174219+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('9ea008f3-da2e-4484-9793-9279f9c80a26', '2c63a1f60315ca4bb070522c5e437e9bf502a6cfa36f5e7691c7e36ca29ca12a', '2025-06-15 07:41:35.043896+00', '20250615072555_remove_update_at_and_delete_at_in_wishlist', NULL, NULL, '2025-06-15 07:41:35.038678+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('395da276-11af-4b9d-ab98-3d5172ca03a4', '8db6b2321d309c4d4d7ffeb75a1526d3d1decc7df1e0cab0e38c3794814c205c', '2025-06-07 10:10:02.189873+00', '20250531115939_change_column_in_comment', NULL, NULL, '2025-06-07 10:10:02.185674+00', 1) ON CONFLICT DO NOTHING;
INSERT INTO public._prisma_migrations VALUES ('b5082787-d578-4333-b04d-273820a67050', '062e510550b391c11c08d0dbaa1b5b4772fd89e4cfa07f688b00a2d084ee4930', '2025-06-07 10:10:02.196726+00', '20250601060235_create_table_comment_like', NULL, NULL, '2025-06-07 10:10:02.191062+00', 1) ON CONFLICT DO NOTHING;


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
INSERT INTO public.users VALUES (11, 'user11@example.com', 'Hannah Irving', 'fake_password_hash', '1234567899', NULL, 'BLOCKED', '1991-02-14', 2, '2025-05-14 11:13:54.136', '2025-05-15 03:25:59.375', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (1, 'ducvui2003@gmail.com', 'Le Anh Đức', '$argon2id$v=19$m=65536,t=3,p=4$RWU4vr16nGLLaaZdMbXU9A$p5TcGkfd8ihHdA1RzD9uTmHssKneIeMg/+JryhyBav0', '0965809129', 'http://res.cloudinary.com/yourstyle/image/upload/v1747746790/ecommerce/user/images.png', 'ACTIVE', '1995-06-15', 1, '2025-05-14 01:35:14.722', '2025-05-21 04:00:06.723', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.users VALUES (31, 'alt.x2-ejpjo30@yopmail.com', 'Lê Anh Đức', '$argon2id$v=19$m=65536,t=3,p=4$KQAdwtHm9YAwQdoE3wFs1g$WKzGzf/MFH64wDJ2iiaJK8l/pQgOa6X5wFrW4g45Mzk', '', '', 'INACTIVE', NULL, 2, '2025-05-30 15:37:08.674', '2025-05-30 15:37:08.674', NULL) ON CONFLICT DO NOTHING;


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

INSERT INTO public.carts VALUES (2, 1, '2025-05-22 03:51:24.949', '2025-05-22 03:51:24.949') ON CONFLICT DO NOTHING;


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.categories VALUES (2, 'Lọ đựng tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.categories VALUES (3, 'Máy xông tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;


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
INSERT INTO public.resources VALUES (2003, 'ecommerce/test/user-avatarAGz9agSD', 'image', 'png', '2025-05-17 15:15:57.432', '2025-05-17 15:15:57.432', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2004, 'ecommerce/test/logoxVjsZThD', 'image', 'png', '2025-05-19 04:02:44.943', '2025-05-19 04:02:44.943', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2005, 'ecommerce/test/Screenshot from 2025-05-11 13-49-01Jr8Coc7R', 'image', 'png', '2025-05-19 04:38:03.684', '2025-05-19 04:38:03.684', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2006, 'ecommerce/test/Screenshot from 2025-05-05 20-47-27fxbDP4_f', 'image', 'png', '2025-05-19 04:38:03.899', '2025-05-19 04:38:03.899', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2007, 'ecommerce/test/Screenshot from 2025-05-05 21-39-25AD-aZEN7', 'image', 'png', '2025-05-19 04:38:05.09', '2025-05-19 04:38:05.09', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2008, 'ecommerce/test/Screenshot from 2025-05-14 15-24-51OWkqArUL', 'image', 'png', '2025-05-19 04:38:05.091', '2025-05-19 04:38:05.091', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2009, 'ecommerce/test/Screenshot from 2025-05-14 17-27-15RqoeBOL1', 'image', 'png', '2025-05-19 04:38:05.428', '2025-05-19 04:38:05.428', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2010, 'ecommerce/test/Screenshot from 2025-05-11 18-45-44uKLncH0-', 'image', 'png', '2025-05-19 04:38:05.806', '2025-05-19 04:38:05.806', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2011, 'ecommerce/test/Screenshot from 2025-05-16 19-19-00QWd80EM6', 'image', 'png', '2025-05-19 04:38:05.918', '2025-05-19 04:38:05.918', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2012, 'ecommerce/test/Screenshot from 2025-05-10 11-37-17zx6ZzMBC', 'image', 'png', '2025-05-19 04:38:06.281', '2025-05-19 04:38:06.281', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2013, 'ecommerce/test/Screenshot from 2025-05-15 18-05-51iwopLI6_', 'image', 'png', '2025-05-19 04:38:07.382', '2025-05-19 04:38:07.382', NULL, false) ON CONFLICT DO NOTHING;
INSERT INTO public.resources VALUES (2014, 'ecommerce/test/Screenshot from 2025-05-16 19-17-39dmiKTQTl', 'image', 'png', '2025-05-19 04:38:09.424', '2025-05-19 04:38:09.424', NULL, false) ON CONFLICT DO NOTHING;


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

INSERT INTO public.products VALUES (22, 'Tinh Dầu Thơm Phối Hương Aquamarine (Viên Ngọc Của Đại Dương) Heny Garden', 'Tinh dầu thơm phối hương Aquamarine lấy cảm hứng từ hơi thở của vùng biển lộng gió Windansea tại San Diego', 189000.00, 149000.00, 1, 12, '2025-05-11 13:14:59', NULL, NULL, 127, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (51, 'Generic H2 (Embedded)', '<p>asdasda</p>', 10000.00, 0.00, 3, 15, '2025-05-19 04:37:13.411', '2025-05-19 04:37:13.411', NULL, 2, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (11, 'Lọ đựng tinh dầu 20ml', 'Lọ đựng tinh dầu 20ml thủy tinh', 150000.00, 140000.00, 2, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL, 43, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (42, 'Generic H2 (Embedded)', 'asdasdasaa', 11.00, 111.00, 1, 13, '2025-05-16 16:26:36.733', '2025-05-16 16:26:36.733', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (40, 'Generic H2 (Embedded)', 'asdasdasaa', 11.00, 111.00, 1, 13, '2025-05-16 15:50:23.553', '2025-05-16 15:50:23.553', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (9, 'Lọ đựng tinh dầu 10ml', 'Lọ đựng tinh dầu 10ml bằng thủy tinh', 100000.00, 90000.00, 2, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL, 43, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (15, 'Tinh Dầu Trà Trắng (White Tea Essential Oil) Heny Garden', 'Tinh dầu White Tea hay còn gọi là tinh dầu trà trắng là một trong những “gương mặt” nổi bật trong thời gian gần đây bởi hương thơm thuần khiết và khả năng tuyệt vời mà nó mang lại.

Cùng Heny Garden khám phá một số công dụng cũng như nhiều cách sử dụng hay ho của loại tinh dầu này nhé. ', 119000.00, 119000.00, 1, 16, '2025-05-11 05:48:40.135', NULL, NULL, 70, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (48, 'Generic H2 (Embedded)', 'asdasdasaa', 11.00, 111.00, 3, 13, '2025-05-17 15:12:17.149', '2025-05-17 15:12:17.149', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (26, 'Tinh Dầu Quế (Cinnamon Essential Oil) Heny Garden', 'Tinh dầu Quế cay nồng, ngọt ngào, quen thuộc với nhiều người vì quế là nguyên liệu phổ biến trong ẩm thực. Dầu quế được đánh giá cao vì hương thơm tươi mới và những lợi ích về sức khỏe và sắc đẹp mà nó mang lại nhờ những khả năng kháng khuẩn, chống nấm, chống oxy hoá.
Nhưng nhiều người vẫn còn băn khoăn rằng tinh dầu Quế có tốt hay không? Vậy hãy cùng Heny tìm hiểu các lợi ích mà tinh dầu Quế mang lại và giải đáp thắc mắc trên nhé. ', 99000.00, 69000.00, 1, 12, '2025-05-11 13:31:54', NULL, NULL, 160, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (37, 'Lê Anh Đức', 'sdfsdfsdfs', 111.00, 111.00, 2, 12, '2025-05-16 10:00:00.662', '2025-05-16 10:00:00.662', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (34, 'Lê Anh Đức', 'sadasdsadsadas', 11110.00, 11110.00, 2, 12, '2025-05-16 09:56:14.545', '2025-05-16 09:56:14.545', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (19, 'Tinh Dầu Cà Phê (Coffee Essential Oil) Heny Garden', 'Tinh dầu Cà Phê khi được khuếch tán vào trong không khí sẽ khiến hương thơm nồng nàn ấm áp lan tỏa khắp ngôi nhà bạn', 119000.00, 89000.00, 1, 12, '2025-05-11 13:06:12', NULL, NULL, 102, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (30, 'Tinh Dầu Thơm Phối Hương Christmas Spirit (Giáng Sinh Rộn Ràng) Heny Garden', 'Tinh dầu thơm phối hương Christmas Spirit đem đến không khí một ngày lễ Giáng Sinh quây quần thưởng thức một bữa tối ấm cúng và trao quà vào lúc nửa đêm tại hầu hết các quốc gia Châu Âu. Người ta thường nhớ đến hương vị ngọt ấm của món tráng miệng bánh táo quế trong bữa tối đêm Giáng Sinh. Nhớ đến khoảnh khắc hồi hộp trao quà bên cạnh chiếc lò sưởi, hòa với hương thơm mát lạnh từ cây Thông lấp lánh ánh đèn. Nhớ đến mùi hương đặc trưng như Christmas Spirit.', 189000.00, 149000.00, 1, 12, '2025-05-11 13:41:55', NULL, NULL, 192, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (21, 'Tinh Dầu Hương Thảo (Rosemary Essential Oil) Heny Garden', 'Hương Thảo được biết đến chủ yếu như 1 loại nguyên liệu ẩm thực, nhưng gần đây Tinh Dầu Hương Thảo lại được đánh giá cao về hương thơm đặc trưng cùng những lợi ích trong y học. Cùng Heny tìm hiểu các công dụng và lợi ich của cây Hương Thảo mang lại nhé.', 109000.00, 79000.00, 1, 12, '2025-05-11 13:11:51', NULL, NULL, 117, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (17, 'Tinh Dầu Phối Hương Tropical Paradise (Thiên Đường Nhiệt Đới) Xông Thơm Phòng HENY GARDEN', 'Tinh dầu phối hương Tropical Paradise (Thiên Đường Nhiệt Đới) đem đến một mùi hương giống như gió mang theo hương thơm của dừa và các loài hoa tươi. Bạn sẽ cảm nhận được sự dịu mát và tươi mới, như là một cuộc phiêu lưu vào một thiên đường nhiệt đới.', 179000.00, 149000.00, 1, 12, '2025-05-11 05:59:23.039', NULL, NULL, 86, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (28, 'Tinh Dầu Hoàng Đàn - Tuyết Tùng (Cedarwood Essential Oil) Heny Garden', 'Tinh dầu Hoàng Đàn (tinh dầu gỗ Tuyết Tùng) có hương gỗ ngọt nồng ấm, dễ chịu, tạo hương thơm thư giãn, dịu êm khi được khuếch tán. Tinh dầu Cedarwood là một thành phần bổ sung tuyệt vời cho các sản phẩm chăm sóc da và tóc, còn được tìm thấy trong nước hoa, chống côn trùng và khử mùi.', 139000.00, 99000.00, 1, 12, '2025-05-11 13:37:37', NULL, NULL, 176, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (5, 'Tinh dầu Rose', 'Tinh dầu hoa hồng', 700000.00, 650000.00, 1, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL, 28, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (29, 'Tinh Dầu Thơm Phối Hương The Stars (Vì Sao Trên Trời) Heny Garden', 'Tinh dầu thơm phối hương The Stars tái hiện khoảnh khắc đứng giữa bầu trời trong một đêm lộng gió tại căn hộ penthouse tọa lạc tại quận 7 năm ngoái. Vào cái buổi đêm ấy, tiết trời se lạnh, đầy sao và im lặng đến lạ. Khác biệt với vòng xoay kèm sự náo nhiệt, ồn ào của một ngày dài; Dường như lúc này vạn vật đều nín thở vì sợ làm tan vỡ bầu không khí yên tĩnh.', 189000.00, 149000.00, 1, 12, '2025-05-11 13:39:54', NULL, NULL, 184, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (4, 'Tinh dầu Eucalyptus', 'Tinh dầu Eucalyptus thư giãn', 450000.00, 400000.00, 1, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL, 21, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (10, 'Máy xông tinh dầu', 'Máy xông tinh dầu 100ml', 1200000.00, 1100000.00, 3, 13, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL, 47, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (35, 'Lê Anh Đức', 'sdfsdfsdfs', 111.00, 111.00, 2, 12, '2025-05-16 09:58:59.469', '2025-05-16 09:58:59.469', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (6, 'Tinh dầu Lemongrass', 'Tinh dầu sả chanh', 350000.00, 320000.00, 1, 13, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL, 32, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (36, 'Lê Anh Đức', 'sdfsdfsdfs', 111.00, 111.00, 2, 12, '2025-05-16 09:59:14.072', '2025-05-16 09:59:14.072', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (50, 'Generic H2 (Embedded)', '', 1000.00, 100000.00, 2, 13, '2025-05-18 11:13:17.86', '2025-05-18 11:13:17.86', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (14, 'Tinh Dầu Phối Hương Yummy Kiwi (Kiwi Hảo Hạng) Xông Thơm Phòng HENY GARDEN', '- Tinh dầu thơm phối hương Yummy Kiwi (Kiwi Hảo Hạng)

- Mùi hương là sự phối hợp giữa các tầng Top/Mid/Base note (hương Đầu/ Giữa/ Cuối) tạo nên sự độc đáo và lưu luyến hơn so với tinh dầu đơn hương.

- Nốt hương chính: Kiwi, Sữa dừa, Xoài chín

- Nốt hương bổ trợ: Chanh dây, Hoa ly, Hoa cam, Hổ phách, Dưa lưới

- Dung tích: 10mL

- Thương hiệu: Heny Garden

- Thời hạn sử dụng: 2 năm

- Heny Garden bảo chứng chất lượng sản phẩm với đánh giá 5 sao.', 179000.00, 149000.00, 1, 15, '2025-05-11 05:42:52.348', NULL, NULL, 62, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (13, 'Máy xông tinh dầu LORITA KDK-TT3D', 'Máy xông, máy khuếch tán tinh dầu LORITA KDK-TT3D  là dòng máy xông siêu âm với thiết kế hình Lọ hoa với đèn màu 3D và chất liệu thủy tinh, phù hợp với nhiều không gian.
Thường được đặt trên kệ tủ, bàn khách, bàn ăn,… đem đến cảm giác sang trọng, tạo điểm nhấn.', 650000.00, 650000.00, 3, 13, '2025-05-11 05:38:57.285', NULL, NULL, 55, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (16, 'Tinh Dầu Hoa Nhài (Elegant Jasmine Essential Oil) Heny Garden', 'Tinh dầu Hoa Nhài (tinh dầu hoa Lài) được chiết xuất từ những đóa hoa nhài trắng muốt - một loài hoa chỉ nở vào ban đêm. Hoa lài được yêu thích nhờ vào hương thơm lãng mạn', 179000.00, 149000.00, 1, 12, '2025-05-11 05:53:05.428', NULL, NULL, 78, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (41, 'Generic H2 (Embedded)', 'asdasdasaa', 11.00, 111.00, 1, 13, '2025-05-16 16:21:16.598', '2025-05-16 16:21:16.598', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (38, 'Generic H2 (Embedded)', 'sdasdasdasdsadasd', 1111.00, 111.00, 1, 12, '2025-05-16 12:59:36.869', '2025-05-16 12:59:36.869', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (12, 'Máy xông tinh dầu LORITA DK-BL02', 'Máy xông, máy khuếch tán tinh dầu LORITA DK-BL01 là dòng máy xông siêu âm với thiết kế Hình Trụ dài hoạ tiết bông lúa vân gỗ phù hợp với nhiều không gian, có tông màu nhẹ nhàng, thanh lịch.
Thường được đặt trên bàn, phòng khách, kệ tủ đầu giường,… tạo điểm nhấn trong thiết kế nội thất', 100000.00, 100000.00, 3, 11, '2025-05-11 05:35:50.738', NULL, NULL, 51, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (24, 'Tinh Dầu Thơm Phối Hương Black Ocean (Đại Dương Đen) Heny Garden', 'Tinh dầu thơm phối hương Black Ocean không miêu tả năng lượng sảng khoái và tràn đầy tinh thần như những tay lướt sóng cừ khôi trên vùng biển lộng gió Windansea', 179000.00, 149000.00, 1, 12, '2025-05-11 13:25:21', NULL, NULL, 144, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (25, 'Tinh Dầu Sả Hoa Hồng (Palmarosa Essential Oil) Heny Garden', 'Tinh dầu Sả Hoa Hồng đã được sử dụng ngàn năm trong lĩnh vực Y học tại Trung Quốc và Ấn Độ. Ngày nay', 99000.00, 69000.00, 1, 12, '2025-05-11 13:28:28', NULL, NULL, 152, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (49, 'Generic H2 (Embedded)', 'asdasdasaa', 11.00, 111.00, 3, 13, '2025-05-18 11:10:53.499', '2025-05-18 11:10:53.499', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (47, 'Generic H2 (Embedded)', 'asdasdasaa', 11.00, 111.00, 3, 13, '2025-05-17 15:07:15.131', '2025-05-17 15:07:15.131', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (7, 'Tinh dầu Tea Tree', 'Tinh dầu tràm trà', 550000.00, 500000.00, 1, 13, '2025-04-27 04:23:32.889', '2025-06-15 09:05:16.627', NULL, 36, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (3, 'Tinh dầu Peppermint', 'Tinh dầu Peppermint tự nhiên', 600000.00, 550000.00, 1, 11, '2025-04-27 04:23:32.889', '2025-06-15 10:24:09.3', NULL, 17, 54) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (2, 'Tinh dầu Lavender', 'Tinh dầu Lavender nguyên chất', 500000.00, 450000.00, 1, 11, '2025-04-27 04:23:32.889', '2025-06-18 00:49:33.7', NULL, 13, 38) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (20, 'Tinh Dầu Gỗ Thông (Pine Essential Oil) Heny Garden', 'Tinh dầu Thông từ lâu đã gắn liền với đời sống con người, nhờ các lợi ích mà nó mang lại trong đời sống và sức khỏe. Ngày nay để thuận tiện hơn cho việc khai thác các lợi ích sức khỏe mà cây Thông mang lại, tinh dầu Thông đã được chiết xuất để được sử dụng rộng rãi hơn.  Tinh dầu Thông đã trở thành một hương thơm phổ biến trong mỹ phẩm, đồ vệ sinh cá nhân, xà phòng và chất tẩy rửa. Bài viết sản phẩm này nêu bật các lợi ích, đặc tính và cách sử dụng an toàn khác của Tinh dầu Thông.', 99000.00, 69000.00, 1, 12, '2025-05-11 13:09:23', NULL, NULL, 109, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (33, 'Generic H2 (Embedded)', 'asdasdasaa', 11.00, 111.00, 1, 13, '2025-05-16 09:01:12.197', '2025-05-16 09:01:12.197', NULL, 1, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (18, 'Tinh Dầu Vani (Sweet Vanilla Essential Oil) Heny Garden', 'Tinh dầu Vani đã xuất hiện từ rất lâu và được sử dụng phổ biến trên thế giới. Không chỉ là nguyên liệu phổ biến trong công thức làm bánh', 119000.00, 89000.00, 1, 12, '2025-05-11 13:03:03', NULL, NULL, 94, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (27, 'Tinh Dầu Ngọc Lan Tây (Ylang Ylang Essential Oil) Heny Garden', 'Tinh dầu Ngọc Lan Tây (Ylang Ylang essential oil) với hương quyến rũ, nữ tính và lãng mạn, hoa Ngọc Lan Tây thường được sử dụng làm nước hoa, liệu pháp điều trị tâm lý và chăm sóc da tóc.
Nếu là một người yêu thích hương thơm, nhất là nước hoa, chắc hẳn bạn đã từng thấy sự xuất hiện của Hoa Ngọc Lan Tây trong thành phần, điển hình như nước hoa Chanel No5', 149000.00, 119000.00, 1, 12, '2025-05-11 13:34:58', NULL, NULL, 168, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (23, 'Tinh Dầu Đàn Hương (Sandalwood Essential Oil) Heny Garden', 'Tinh dầu Đàn Hương được chiết xuất từ một loại cây rất có giá trị, có mùi hương cổ điển và là thành phần được tìm thấy trong nhiều loại nước hoa.  Giá trị mà tinh dầu gỗ Đàn hương mang lại không chỉ là hương thơm, mà còn nhiều lợi ích khác cho sức khỏe: điều trị mất ngủ, cân bằng cảm xúc và tâm trạng, làm lành vết thương,...', 229000.00, 189000.00, 1, 12, '2025-05-11 13:17:55', NULL, NULL, 135, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (8, 'Tinh dầu Orange', 'Tinh dầu cam tự nhiên', 400000.00, 350000.00, 1, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL, 40, 0) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (1, 'Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ', '1. Chi Tiết Sản Phẩm
- Mã số : TDNM-XS
- Dung tích :5ml, 10ml, 15ml , 20ml, 30ml, 50ml, 100ml
- Loại Nắp : Xịt Sương | Mạ Vàng Cao Cấp
- Trọng lượng :20gr-100gr
- Còn Hàng - Ship Toàn quốc

2.  Điểm nổi bật :
- Dòng chai thủy tinh dùng Đựng tinh dầu , hóa chất thì không thể thiếu được màu hỗ phách. vì chỉ có loai này thì mới có thể không làm thay đổi hoạt tích hóa học của tinh dau .với Đầu lăn cao cấp. bạn có Thể ứng dụng rất nhiều công Dụng.

- chất liệu thủy tinh sáng, đẹp và màu hỗ Phách. Chai thủy tinh rất dầy và chắc chắn cùng quay xách cùng ống bớp sang trọng nên được dùng nhiều để bao bì các chất hóa chất , tinh dau các loại , liệu hương .....
- Với thiết kế riêng biệt dầy các Tính tạo một thương hiệu sản phẩm của bạn.

- Dòng Sản Phẩm có Nhiều Dung Tích :  5ml, 10ml, 15ml , 20ml, 30ml, 50ml, 100ml', 500000.00, 400000.00, 2, 11, '2025-05-11 10:52:08', '2025-05-29 05:41:54.85', NULL, 2004, 0) ON CONFLICT DO NOTHING;


--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.options VALUES (1, 'aa', 11110.000000000000000000000000000000, 0, '2025-05-16 09:01:12.197', '2025-05-16 09:01:12.197', NULL, 33, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (2, '1111', 1108.000000000000000000000000000000, 0, '2025-05-16 09:56:14.545', '2025-05-16 09:56:14.545', NULL, 34, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (3, '1111', 11110.000000000000000000000000000000, 1110, '2025-05-16 09:58:59.469', '2025-05-16 09:58:59.469', NULL, 35, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (4, '1111', 11110.000000000000000000000000000000, 1110, '2025-05-16 09:59:14.072', '2025-05-16 09:59:14.072', NULL, 36, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (5, '1111', 11110.000000000000000000000000000000, 1110, '2025-05-16 10:00:00.662', '2025-05-16 10:00:00.662', NULL, 37, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (6, '1', 1111.000000000000000000000000000000, 1, '2025-05-16 12:59:36.869', '2025-05-16 12:59:36.869', NULL, 38, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (8, 'aa', 11110.000000000000000000000000000000, 0, '2025-05-16 15:50:23.553', '2025-05-16 15:50:23.553', NULL, 40, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (9, 'aa', 11110.000000000000000000000000000000, 0, '2025-05-16 16:21:16.598', '2025-05-16 16:21:16.598', NULL, 41, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (10, 'aa', 11110.000000000000000000000000000000, 0, '2025-05-16 16:26:36.733', '2025-05-16 16:26:36.733', NULL, 42, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (11, 'aa', 11110.000000000000000000000000000000, 0, '2025-05-17 15:07:15.131', '2025-05-17 15:07:15.131', NULL, 47, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (12, 'aa', 11110.000000000000000000000000000000, 0, '2025-05-17 15:12:17.149', '2025-05-17 15:12:17.149', NULL, 48, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (13, '', 4.000000000000000000000000000000, 0, '2025-05-18 11:13:17.86', '2025-05-18 11:13:17.86', NULL, 50, 2) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (15, 'XL', 110000.000000000000000000000000000000, 1110, '2025-05-19 04:37:13.411', '2025-05-19 04:37:13.411', NULL, 51, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.options VALUES (14, 'XL', 100000.000000000000000000000000000000, 0, '2025-05-19 04:28:12.522', '2025-05-29 05:41:54.876', NULL, 1, 1) ON CONFLICT DO NOTHING;


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cart_items VALUES ('b98cda21-6db4-4820-a3f5-444a6b44db15', 3, 2, '2025-06-15 09:32:19.37', '2025-06-15 10:13:56.737', NULL, 13, true) ON CONFLICT DO NOTHING;
INSERT INTO public.cart_items VALUES ('c322d4f9-6221-45bc-8606-2f9b1a9349b5', 2, 2, '2025-06-15 10:40:11.151', '2025-06-15 10:40:12.024', NULL, 2, true) ON CONFLICT DO NOTHING;


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments VALUES ('6dd96ab7-93ac-4cc6-b203-ad64612351c7', NULL, 1, 2, '2025-06-07 10:14:38.754', '2025-06-07 10:14:48.847', NULL, 'hello', 0) ON CONFLICT DO NOTHING;


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES (10, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 13:24:59.331', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (11, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 13:26:48.232', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (12, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 13:30:20.309', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (13, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 13:33:41.257', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (14, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 13:41:07.373', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (15, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 13:41:41.701', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (16, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 13:49:19.27', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (17, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 13:55:31.78', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (19, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 14:06:11.882', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (20, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 14:10:42.72', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (21, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 14:12:17.995', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (22, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 14:15:09.17', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (23, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 14:21:52.723', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (24, 1100000.00, 120000.00, 'PENDING', 1, '2025-05-23 14:22:47.879', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (25, 500000.00, 120000.00, 'PENDING', 1, '2025-05-24 00:56:29.43', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (26, 500000.00, 120000.00, 'PENDING', 1, '2025-05-24 00:59:25.573', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (27, 500000.00, 120000.00, 'PENDING', 1, '2025-05-24 01:11:43.888', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (28, 500000.00, 120000.00, 'PENDING', 1, '2025-05-24 01:23:01.759', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (29, 500000.00, 120000.00, 'PENDING', 1, '2025-05-24 01:25:31.511', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (30, 500000.00, 120000.00, 'PENDING', 1, '2025-05-24 01:37:06.911', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (31, 500000.00, 120000.00, 'PENDING', 1, '2025-05-24 01:37:55.711', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (32, 500000.00, 120000.00, 'PENDING', 1, '2025-05-27 05:26:29.086', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (7, 1100000.00, 120000.00, 'CANCELED', 1, '2025-05-23 10:51:47.307', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (8, 1100000.00, 120000.00, 'CANCELED', 1, '2025-05-23 11:04:01.691', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (9, 1100000.00, 120000.00, 'CANCELED', 1, '2025-05-23 13:21:18.656', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (18, 1100000.00, 120000.00, 'PAID', 1, '2025-05-23 13:59:41.063', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (43, 500000.00, 120000.00, 'PENDING', 1, '2025-05-27 17:09:43.919', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (53, 800000.00, 120000.00, 'PENDING', 1, '2025-06-09 04:03:53.004', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (50, 800000.00, 120000.00, 'PENDING', 1, '2025-05-31 17:16:30.854', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (51, 800000.00, 120000.00, 'PENDING', 1, '2025-06-01 05:27:36.418', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (52, 800000.00, 0.00, 'PENDING', 1, '2025-06-09 03:59:30.215', '{"name": "Lê Anh Đức", "ward": "{\"id\":10521,\"parentId\":349,\"districtId\":349,\"districtLocationId\":349,\"name\":\"Phường Phú Thuận\"}", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "qưe", "district": "{\"id\":349,\"parentId\":255,\"cityId\":255,\"cityLocationId\":255,\"name\":\"Quận 7\"}", "province": "{\"id\":255,\"parentId\":0,\"countryId\":0,\"name\":\"Hồ Chí Minh\"}"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (54, 800000.00, 120000.00, 'PENDING', 1, '2025-06-09 04:04:10.76', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (55, 800000.00, 120000.00, 'PENDING', 1, '2025-06-09 04:21:59.698', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (56, 800000.00, 120000.00, 'PENDING', 1, '2025-06-09 04:22:36.912', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (57, 800000.00, 120000.00, 'PAID', 1, '2025-06-09 15:55:49.869', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (58, 800000.00, 120000.00, 'PAID', 1, '2025-06-09 15:58:09.441', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (59, 800000.00, 120000.00, 'PAID', 1, '2025-06-09 15:58:55.059', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (60, 800000.00, 120000.00, 'PAID', 1, '2025-06-09 15:59:44.761', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (61, 800000.00, 120000.00, 'PAID', 1, '2025-06-09 16:05:01.893', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;
INSERT INTO public.orders VALUES (62, 800000.00, 120000.00, 'PAID', 1, '2025-06-09 16:06:32.203', '{"name": "Le Anh Duc", "ward": "Linh Trung", "email": "ducvui2003@gmail.com", "phone": "0965809127", "detail": "111", "district": "Thu Duc", "province": "TP. HCM"}') ON CONFLICT DO NOTHING;


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.order_items VALUES (2, 11, 1100000.000000000000000000000000000000, 8, '2025-05-23 11:04:01.728', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (3, 11, 1100000.000000000000000000000000000000, 9, '2025-05-23 13:21:18.669', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (4, 11, 1100000.000000000000000000000000000000, 10, '2025-05-23 13:24:59.342', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (5, 11, 1100000.000000000000000000000000000000, 11, '2025-05-23 13:26:48.243', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (6, 11, 1100000.000000000000000000000000000000, 12, '2025-05-23 13:30:20.321', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (7, 11, 1100000.000000000000000000000000000000, 13, '2025-05-23 13:33:41.268', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (8, 11, 1100000.000000000000000000000000000000, 14, '2025-05-23 13:41:07.385', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (9, 11, 1100000.000000000000000000000000000000, 15, '2025-05-23 13:41:41.713', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (10, 11, 1100000.000000000000000000000000000000, 16, '2025-05-23 13:49:19.285', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (11, 11, 1100000.000000000000000000000000000000, 17, '2025-05-23 13:55:31.791', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (12, 11, 1100000.000000000000000000000000000000, 18, '2025-05-23 13:59:41.074', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (13, 11, 1100000.000000000000000000000000000000, 19, '2025-05-23 14:06:11.893', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (14, 11, 1100000.000000000000000000000000000000, 20, '2025-05-23 14:10:42.723', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (15, 11, 1100000.000000000000000000000000000000, 21, '2025-05-23 14:12:18.007', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (16, 11, 1100000.000000000000000000000000000000, 22, '2025-05-23 14:15:09.182', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (17, 11, 1100000.000000000000000000000000000000, 23, '2025-05-23 14:21:52.735', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (18, 11, 1100000.000000000000000000000000000000, 24, '2025-05-23 14:22:47.892', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (19, 5, 500000.000000000000000000000000000000, 25, '2025-05-24 00:56:29.458', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (20, 5, 500000.000000000000000000000000000000, 26, '2025-05-24 00:59:25.597', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (21, 5, 500000.000000000000000000000000000000, 27, '2025-05-24 01:11:43.91', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (22, 5, 500000.000000000000000000000000000000, 28, '2025-05-24 01:23:01.774', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (23, 5, 500000.000000000000000000000000000000, 29, '2025-05-24 01:25:31.526', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (24, 5, 500000.000000000000000000000000000000, 30, '2025-05-24 01:37:06.936', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (25, 5, 500000.000000000000000000000000000000, 31, '2025-05-24 01:37:55.739', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (26, 5, 500000.000000000000000000000000000000, 32, '2025-05-27 05:26:29.116', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (37, 5, 500000.000000000000000000000000000000, 43, '2025-05-27 17:09:43.931', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (45, 8, 800000.000000000000000000000000000000, 50, '2025-05-31 17:16:30.881', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (46, 8, 800000.000000000000000000000000000000, 51, '2025-06-01 05:27:36.434', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (1, 11, 1100000.000000000000000000000000000000, 7, '2025-05-23 10:51:47.328', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (47, 8, 800000.000000000000000000000000000000, 52, '2025-06-09 03:59:30.228', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (48, 2, 0.000000000000000000000000000000, 52, '2025-06-09 03:59:30.228', '{"id": 6, "name": "Tinh dầu Lemongrass", "media": "", "price": 350000, "category": "Tinh dầu", "supplier": "Edens Garden"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (49, 7, 0.000000000000000000000000000000, 52, '2025-06-09 03:59:30.228', '{"id": 2, "name": "Tinh dầu Lavender", "media": "", "price": 500000, "category": "Tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (50, 8, 800000.000000000000000000000000000000, 53, '2025-06-09 04:03:53.009', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (51, 8, 800000.000000000000000000000000000000, 54, '2025-06-09 04:04:10.77', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (52, 8, 800000.000000000000000000000000000000, 55, '2025-06-09 04:21:59.711', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (53, 8, 800000.000000000000000000000000000000, 56, '2025-06-09 04:22:36.925', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (54, 8, 800000.000000000000000000000000000000, 57, '2025-06-09 15:55:49.902', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (55, 8, 800000.000000000000000000000000000000, 58, '2025-06-09 15:58:09.457', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (56, 8, 800000.000000000000000000000000000000, 59, '2025-06-09 15:58:55.065', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (57, 8, 800000.000000000000000000000000000000, 60, '2025-06-09 15:59:44.783', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (58, 8, 800000.000000000000000000000000000000, 61, '2025-06-09 16:05:01.911', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;
INSERT INTO public.order_items VALUES (59, 8, 800000.000000000000000000000000000000, 62, '2025-06-09 16:06:32.229', '{"id": 1, "name": "Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên ", "media": "", "price": 500000, "options": {"id": 14, "name": "XL", "price": 100000}, "category": "Lọ đựng tinh dầu", "supplier": "Jade Bloom"}') ON CONFLICT DO NOTHING;


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.payment VALUES (1, 7, 'PENDING', '2025-05-23 10:51:47.328', '2025-05-23 10:51:47.328', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (2, 8, 'PENDING', '2025-05-23 11:04:01.728', '2025-05-23 11:04:01.728', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (3, 9, 'PENDING', '2025-05-23 13:21:18.669', '2025-05-23 13:21:18.669', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (4, 10, 'PENDING', '2025-05-23 13:24:59.342', '2025-05-23 13:24:59.342', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (5, 11, 'PENDING', '2025-05-23 13:26:48.243', '2025-05-23 13:26:48.243', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (6, 12, 'PENDING', '2025-05-23 13:30:20.321', '2025-05-23 13:30:20.321', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (7, 13, 'PENDING', '2025-05-23 13:33:41.268', '2025-05-23 13:33:41.268', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (8, 14, 'PENDING', '2025-05-23 13:41:07.385', '2025-05-23 13:41:07.385', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (9, 15, 'PENDING', '2025-05-23 13:41:41.713', '2025-05-23 13:41:41.713', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (10, 16, 'PENDING', '2025-05-23 13:49:19.285', '2025-05-23 13:49:19.285', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (11, 17, 'PENDING', '2025-05-23 13:55:31.791', '2025-05-23 13:55:31.791', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (13, 19, 'PENDING', '2025-05-23 14:06:11.893', '2025-05-23 14:06:11.893', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (14, 20, 'PENDING', '2025-05-23 14:10:42.723', '2025-05-23 14:10:42.723', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (15, 21, 'PENDING', '2025-05-23 14:12:18.007', '2025-05-23 14:12:18.007', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (16, 22, 'PENDING', '2025-05-23 14:15:09.182', '2025-05-23 14:15:09.182', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (17, 23, 'PENDING', '2025-05-23 14:21:52.735', '2025-05-23 14:21:52.735', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (18, 24, 'PENDING', '2025-05-23 14:22:47.892', '2025-05-23 14:22:47.892', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (19, 25, 'PENDING', '2025-05-24 00:56:29.458', '2025-05-24 00:56:29.458', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (20, 26, 'PENDING', '2025-05-24 00:59:25.597', '2025-05-24 00:59:25.597', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (21, 27, 'PENDING', '2025-05-24 01:11:43.91', '2025-05-24 01:11:43.91', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (22, 28, 'PENDING', '2025-05-24 01:23:01.774', '2025-05-24 01:23:01.774', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (23, 29, 'PENDING', '2025-05-24 01:25:31.526', '2025-05-24 01:25:31.526', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (24, 30, 'PENDING', '2025-05-24 01:37:06.936', '2025-05-24 01:37:06.936', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (25, 31, 'PENDING', '2025-05-24 01:37:55.739', '2025-05-24 01:37:55.739', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (26, 32, 'PENDING', '2025-05-27 05:26:29.116', '2025-05-27 05:26:29.116', 'SEPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (37, 43, 'PENDING', '2025-05-27 17:09:43.931', '2025-05-27 17:09:43.931', 'SEPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (44, 50, 'PENDING', '2025-05-31 17:16:30.885', '2025-05-31 17:16:30.885', 'SEPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (45, 51, 'PENDING', '2025-06-01 05:27:36.436', '2025-06-01 05:27:36.436', 'SEPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (46, 52, 'PENDING', '2025-06-09 03:59:30.23', '2025-06-09 03:59:30.23', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (47, 53, 'PENDING', '2025-06-09 04:03:53.01', '2025-06-09 04:03:53.01', 'SEPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (48, 54, 'PENDING', '2025-06-09 04:04:10.771', '2025-06-09 04:04:10.771', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (49, 55, 'PENDING', '2025-06-09 04:21:59.712', '2025-06-09 04:21:59.712', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (50, 56, 'PENDING', '2025-06-09 04:22:36.926', '2025-06-09 04:22:36.926', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (51, 57, 'FAILED', '2025-06-09 15:55:49.906', '2025-06-09 15:57:32.231', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (52, 58, 'FAILED', '2025-06-09 15:58:09.459', '2025-06-09 15:58:19.277', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (53, 59, 'FAILED', '2025-06-09 15:58:55.067', '2025-06-09 15:59:49.722', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (54, 60, 'FAILED', '2025-06-09 15:59:44.786', '2025-06-09 15:59:54.379', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (55, 61, 'FAILED', '2025-06-09 16:05:01.913', '2025-06-09 16:05:16.584', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (56, 62, 'FAILED', '2025-06-09 16:06:32.234', '2025-06-10 02:55:05.032', 'VNPAY') ON CONFLICT DO NOTHING;
INSERT INTO public.payment VALUES (12, 18, 'FAILED', '2025-05-23 13:59:41.074', '2025-06-10 02:57:37.602', 'VNPAY') ON CONFLICT DO NOTHING;


--
-- Data for Name: payment_transaction; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.payment_transaction VALUES (1, 42, 50000000.00, '{"amount": 50000000, "txnRef": "42", "payDate": "2025-05-28T01:48:42.000Z", "tnnCode": "G0M7ZFHB", "bankCode": "NCB", "cardType": "ATM", "orderInfo": "HD: 42", "bankTranNo": "VNP14984178", "responseCode": "00", "transactionNo": "14984178", "transactionStatus": "00"}', '14984178', '2025-05-28 01:48:21.839') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (2, 43, 80000000.00, '{"amount": 80000000, "txnRef": "43", "payDate": "2025-05-31T00:50:06.000Z", "tnnCode": "G0M7ZFHB", "bankCode": "NCB", "cardType": "ATM", "orderInfo": "HD: 43", "bankTranNo": "VNP14990937", "responseCode": "00", "transactionNo": "14990937", "transactionStatus": "00"}', '14990937', '2025-05-31 00:49:36.412') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (3, 51, 2277000.00, '{"id": 92704, "code": null, "content": "HD 51", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-09 15:57:32.218') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (4, 52, 2277000.00, '{"id": 92704, "code": null, "content": "HD 52", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-09 15:58:19.27') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (5, 53, 2277000.00, '{"id": 92704, "code": null, "content": "HD 53", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-09 15:59:02.25') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (6, 53, 2277000.00, '{"id": 92704, "code": null, "content": "HD 53", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-09 15:59:49.714') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (7, 54, 2277000.00, '{"id": 92704, "code": null, "content": "HD 54", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-09 15:59:54.365') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (8, 999, 2277000.00, '{"id": 92704, "code": null, "content": "HD 999", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-09 16:01:18.595') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (9, 55, 2277000.00, '{"id": 92704, "code": null, "content": "HD 55", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-09 16:05:16.572') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (10, 56, 2277000.00, '{"id": 92704, "code": null, "content": "HD 56", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-09 16:06:39.66') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (11, 56, 2277000.00, '{"id": 92704, "code": null, "content": "HD 56", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 02:55:05.024') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (12, 12, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 12", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 02:55:59.996') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (13, 12, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 12", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 02:56:35.861') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (14, 12, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 12", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 02:57:37.592') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (15, 66, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 66", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 02:59:12.196') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (16, 60, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 60", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:00:06.548') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (17, 59, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 59", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:01:49.362') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (18, 59, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 59", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:02:11.557') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (19, 59, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 59", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:03:36.881') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (20, 59, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 59", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:06:59.043') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (21, 59, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 59", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:08:12.042') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (22, 59, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 59", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:08:49.893') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (23, 61, 11110.00, '{"id": 14582930, "code": null, "content": "90307285629-0965809127-HD 61", "gateway": "BIDV", "subAccount": "962475QLZ4", "accumulated": 0, "description": "BankAPINotify 90307285629-0965809127-HD 61", "transferType": "in", "accountNumber": "3149041322", "referenceCode": "16859261-8565-437e-9765-cbde3ffae7f3", "transferAmount": 11110, "transactionDate": "2025-06-10T03:10:13.000Z"}', '14582930', '2025-06-10 03:14:07.007') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (24, 61, 11110.00, '{"id": 14583286, "code": null, "content": "90309051412-0965809127-HD 61", "gateway": "BIDV", "subAccount": "962475QLZ4", "accumulated": 0, "description": "BankAPINotify 90309051412-0965809127-HD 61", "transferType": "in", "accountNumber": "3149041322", "referenceCode": "444b53b0-154b-4ca6-b53c-8d37c956420f", "transferAmount": 11110, "transactionDate": "2025-06-10T03:16:59.000Z"}', '14583286', '2025-06-10 03:16:59.842') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (25, 59, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 59", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:23:15.423') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (26, 62, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 62", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:23:21.814') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (27, 63, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 63", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:24:53.103') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (28, 64, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 64", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:30:54.093') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (29, 66, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 66", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:40:36.057') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (30, 68, 2277000.00, '{"id": 92704, "code": null, "content": "90304996780 0965809127 HD 68", "gateway": "Vietcombank", "subAccount": null, "accumulated": 19077000, "description": "hello 123", "transferType": "in", "accountNumber": "0123499999", "referenceCode": "MBVCB.3278907687", "transferAmount": 2277000, "transactionDate": "2023-03-25T07:02:37.000Z"}', '92704', '2025-06-10 03:47:11.323') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (31, 12, 10000.00, '{"id": 14582105, "code": null, "content": "90304996780 0965809127 HD12", "gateway": "BIDV", "subAccount": "962475QLZ4", "accumulated": 0, "description": "BankAPINotify 90304996780 0965809127 HD12", "transferType": "in", "accountNumber": "3149041322", "referenceCode": "eb7facc4-a094-4011-b84e-80571e309056", "transferAmount": 10000, "transactionDate": "2025-06-10T02:52:28.000Z"}', '14582105', '2025-06-10 03:56:20.804') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (32, 69, 11110.00, '{"id": 14587483, "code": null, "content": "90315373594 0965809127 HD 69", "gateway": "BIDV", "subAccount": "962475QLZ4", "accumulated": 0, "description": "BankAPINotify 90315373594 0965809127 HD 69", "transferType": "in", "accountNumber": "3149041322", "referenceCode": "d208b76f-c51f-406b-8c99-98c9fca6fafe", "transferAmount": 11110, "transactionDate": "2025-06-10T04:14:59.000Z"}', '14587483', '2025-06-10 04:14:59.937') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (33, 12, 10000.00, '{"id": 14581915, "code": null, "content": "90305203432 0965809127 HD 12", "gateway": "BIDV", "subAccount": "962475QLZ4", "accumulated": 0, "description": "BankAPINotify 90305203432 0965809127 HD 12", "transferType": "in", "accountNumber": "3149041322", "referenceCode": "97f9092e-50e0-47e6-abf3-2ceba17d0109", "transferAmount": 10000, "transactionDate": "2025-06-10T02:47:18.000Z"}', '14581915', '2025-06-10 04:28:37.707') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (34, 60, 11110.00, '{"id": 14581783, "code": null, "content": "90304714225 0965809127 HD 60", "gateway": "BIDV", "subAccount": "962475QLZ4", "accumulated": 0, "description": "BankAPINotify 90304714225 0965809127 HD 60", "transferType": "in", "accountNumber": "3149041322", "referenceCode": "9a4c5f5e-3f9c-4b82-8239-c304c93f69a7", "transferAmount": 11110, "transactionDate": "2025-06-10T02:43:50.000Z"}', '14581783', '2025-06-10 04:52:04.023') ON CONFLICT DO NOTHING;
INSERT INTO public.payment_transaction VALUES (35, 60, 11110.00, '{"id": 14581596, "code": null, "content": "90304233488-0965809127-HD 60", "gateway": "BIDV", "subAccount": "962475QLZ4", "accumulated": 0, "description": "BankAPINotify 90304233488-0965809127-HD 60", "transferType": "in", "accountNumber": "3149041322", "referenceCode": "e76261d5-dee7-4da4-aac5-c74d3dbf507b", "transferAmount": 11110, "transactionDate": "2025-06-10T02:38:51.000Z"}', '14581596', '2025-06-10 05:27:19.066') ON CONFLICT DO NOTHING;


--
-- Data for Name: policies; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: product_resources; Type: TABLE DATA; Schema: public; Owner: -
--

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
INSERT INTO public.product_resources VALUES (34, 1, '2025-05-16 09:56:14.549') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (35, 1, '2025-05-16 09:58:59.47') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (36, 1, '2025-05-16 09:59:14.074') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (37, 1, '2025-05-16 10:00:00.667') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (38, 1, '2025-05-16 12:59:36.874') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (40, 1, '2025-05-16 15:50:23.558') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (41, 1, '2025-05-16 16:21:16.601') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (42, 1, '2025-05-16 16:26:36.737') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (47, 1, '2025-05-17 15:07:15.144') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (48, 1, '2025-05-17 15:12:17.157') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (49, 1, '2025-05-18 11:10:53.512') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (50, 1, '2025-05-18 11:13:17.866') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (1, 2004, '2025-05-19 04:02:51.835') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (1, 2, '2025-05-19 04:02:51.835') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (51, 1, '2025-05-19 04:37:13.418') ON CONFLICT DO NOTHING;
INSERT INTO public.product_resources VALUES (51, 2, '2025-05-19 04:37:13.418') ON CONFLICT DO NOTHING;


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

INSERT INTO public.wishlists VALUES (15, 1, 7, '2025-06-15 09:49:42.159') ON CONFLICT DO NOTHING;
INSERT INTO public.wishlists VALUES (16, 1, 2, '2025-06-15 09:57:29.956') ON CONFLICT DO NOTHING;


--
-- Name: CommentLike_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CommentLike_id_seq"', 1, true);


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

SELECT pg_catalog.setval('public.carts_id_seq', 2, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contacts_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.options_id_seq', 15, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_items_id_seq', 74, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 77, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_id_seq', 71, true);


--
-- Name: payment_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_transaction_id_seq', 35, true);


--
-- Name: policies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.policies_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 51, true);


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

SELECT pg_catalog.setval('public.resources_id_seq', 2014, true);


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

SELECT pg_catalog.setval('public.users_id_seq', 31, true);


--
-- Name: wishlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.wishlists_id_seq', 23, true);


--
-- PostgreSQL database dump complete
--

