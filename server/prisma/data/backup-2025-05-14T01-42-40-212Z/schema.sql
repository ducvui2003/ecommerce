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

ALTER TABLE IF EXISTS ONLY public.wishlists DROP CONSTRAINT IF EXISTS wishlists_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.wishlists DROP CONSTRAINT IF EXISTS wishlists_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.suppliers DROP CONSTRAINT IF EXISTS suppliers_address_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.promotion_orders DROP CONSTRAINT IF EXISTS promotion_orders_promotion_id_fkey;
ALTER TABLE IF EXISTS ONLY public.promotion_orders DROP CONSTRAINT IF EXISTS promotion_orders_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.promotion_order_items DROP CONSTRAINT IF EXISTS promotion_order_items_promotion_id_fkey;
ALTER TABLE IF EXISTS ONLY public.promotion_order_items DROP CONSTRAINT IF EXISTS promotion_order_items_order_item_id_fkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_supplier_id_fkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_category_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_resources DROP CONSTRAINT IF EXISTS "product_resources_resourceId_fkey";
ALTER TABLE IF EXISTS ONLY public.product_resources DROP CONSTRAINT IF EXISTS "product_resources_productId_fkey";
ALTER TABLE IF EXISTS ONLY public.payment DROP CONSTRAINT IF EXISTS payment_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.options DROP CONSTRAINT IF EXISTS "options_volumeId_fkey";
ALTER TABLE IF EXISTS ONLY public.option_resources DROP CONSTRAINT IF EXISTS "option_resources_resourceId_fkey";
ALTER TABLE IF EXISTS ONLY public.option_resources DROP CONSTRAINT IF EXISTS option_resources_id_fkey;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_cart_id_fkey;
ALTER TABLE IF EXISTS ONLY public.addresses DROP CONSTRAINT IF EXISTS addresses_user_id_fkey;
DROP INDEX IF EXISTS public.users_email_key;
DROP INDEX IF EXISTS public.suppliers_address_id_key;
DROP INDEX IF EXISTS public.roles_name_key;
DROP INDEX IF EXISTS public.promotions_code_key;
DROP INDEX IF EXISTS public.payment_order_id_key;
DROP INDEX IF EXISTS public.carts_user_id_key;
ALTER TABLE IF EXISTS ONLY public.wishlists DROP CONSTRAINT IF EXISTS wishlists_pkey;
ALTER TABLE IF EXISTS ONLY public.volumns DROP CONSTRAINT IF EXISTS volumns_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.suppliers DROP CONSTRAINT IF EXISTS suppliers_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_pkey;
ALTER TABLE IF EXISTS ONLY public.resources DROP CONSTRAINT IF EXISTS resources_pkey;
ALTER TABLE IF EXISTS ONLY public.promotions DROP CONSTRAINT IF EXISTS promotions_pkey;
ALTER TABLE IF EXISTS ONLY public.promotion_orders DROP CONSTRAINT IF EXISTS promotion_orders_pkey;
ALTER TABLE IF EXISTS ONLY public.promotion_order_items DROP CONSTRAINT IF EXISTS promotion_order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.product_resources DROP CONSTRAINT IF EXISTS product_resources_pkey;
ALTER TABLE IF EXISTS ONLY public.policies DROP CONSTRAINT IF EXISTS policies_pkey;
ALTER TABLE IF EXISTS ONLY public.payment_transaction DROP CONSTRAINT IF EXISTS payment_transaction_pkey;
ALTER TABLE IF EXISTS ONLY public.payment DROP CONSTRAINT IF EXISTS payment_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.options DROP CONSTRAINT IF EXISTS options_pkey;
ALTER TABLE IF EXISTS ONLY public.option_resources DROP CONSTRAINT IF EXISTS option_resources_pkey;
ALTER TABLE IF EXISTS ONLY public.notifications DROP CONSTRAINT IF EXISTS notifications_pkey;
ALTER TABLE IF EXISTS ONLY public.faqs DROP CONSTRAINT IF EXISTS faqs_pkey;
ALTER TABLE IF EXISTS ONLY public.customer_services DROP CONSTRAINT IF EXISTS customer_services_pkey;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public.cart_items DROP CONSTRAINT IF EXISTS cart_items_pkey;
ALTER TABLE IF EXISTS ONLY public.addresses DROP CONSTRAINT IF EXISTS addresses_pkey;
ALTER TABLE IF EXISTS ONLY public.abouts DROP CONSTRAINT IF EXISTS abouts_pkey;
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS public.wishlists ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.volumns ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.suppliers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.reviews ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.resources ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.promotions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.promotion_orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.promotion_order_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.policies ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payment_transaction ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payment ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.order_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.options ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.notifications ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.faqs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.customer_services ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.comments ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.addresses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.abouts ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.wishlists_id_seq;
DROP TABLE IF EXISTS public.wishlists;
DROP SEQUENCE IF EXISTS public.volumns_id_seq;
DROP TABLE IF EXISTS public.volumns;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.suppliers_id_seq;
DROP TABLE IF EXISTS public.suppliers;
DROP SEQUENCE IF EXISTS public.roles_id_seq;
DROP TABLE IF EXISTS public.roles;
DROP SEQUENCE IF EXISTS public.reviews_id_seq;
DROP TABLE IF EXISTS public.reviews;
DROP SEQUENCE IF EXISTS public.resources_id_seq;
DROP TABLE IF EXISTS public.resources;
DROP SEQUENCE IF EXISTS public.promotions_id_seq;
DROP TABLE IF EXISTS public.promotions;
DROP SEQUENCE IF EXISTS public.promotion_orders_id_seq;
DROP TABLE IF EXISTS public.promotion_orders;
DROP SEQUENCE IF EXISTS public.promotion_order_items_id_seq;
DROP TABLE IF EXISTS public.promotion_order_items;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products;
DROP TABLE IF EXISTS public.product_resources;
DROP SEQUENCE IF EXISTS public.policies_id_seq;
DROP TABLE IF EXISTS public.policies;
DROP SEQUENCE IF EXISTS public.payment_transaction_id_seq;
DROP TABLE IF EXISTS public.payment_transaction;
DROP SEQUENCE IF EXISTS public.payment_id_seq;
DROP TABLE IF EXISTS public.payment;
DROP SEQUENCE IF EXISTS public.orders_id_seq;
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public.order_items_id_seq;
DROP TABLE IF EXISTS public.order_items;
DROP SEQUENCE IF EXISTS public.options_id_seq;
DROP TABLE IF EXISTS public.options;
DROP TABLE IF EXISTS public.option_resources;
DROP SEQUENCE IF EXISTS public.notifications_id_seq;
DROP TABLE IF EXISTS public.notifications;
DROP SEQUENCE IF EXISTS public.faqs_id_seq;
DROP TABLE IF EXISTS public.faqs;
DROP SEQUENCE IF EXISTS public.customer_services_id_seq;
DROP TABLE IF EXISTS public.customer_services;
DROP SEQUENCE IF EXISTS public.comments_id_seq;
DROP TABLE IF EXISTS public.comments;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories;
DROP SEQUENCE IF EXISTS public.carts_id_seq;
DROP TABLE IF EXISTS public.carts;
DROP TABLE IF EXISTS public.cart_items;
DROP SEQUENCE IF EXISTS public.addresses_id_seq;
DROP TABLE IF EXISTS public.addresses;
DROP SEQUENCE IF EXISTS public.abouts_id_seq;
DROP TABLE IF EXISTS public.abouts;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TYPE IF EXISTS public.available_status;
DROP TYPE IF EXISTS public."UserStatus";
DROP TYPE IF EXISTS public."PaymentStatus";
DROP TYPE IF EXISTS public."OrderStatus";
DROP TYPE IF EXISTS public."CustomerStatus";
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: CustomerStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CustomerStatus" AS ENUM (
    'PENDING',
    'RESOLVED',
    'REJECTED'
);


--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'DELIVERING',
    'DELIVERED',
    'CANCELED',
    'COMPLETE'
);


--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'SUCCESS',
    'FAILED'
);


--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'BLOCKED'
);


--
-- Name: available_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.available_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: abouts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.abouts (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    status public.available_status DEFAULT 'ACTIVE'::public.available_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: abouts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.abouts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: abouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.abouts_id_seq OWNED BY public.abouts.id;


--
-- Name: addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    detail text NOT NULL,
    ward text NOT NULL,
    district text NOT NULL,
    province text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_items (
    id text NOT NULL,
    product_id integer NOT NULL,
    cart_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    status public.available_status DEFAULT 'INACTIVE'::public.available_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content text NOT NULL,
    "like" integer NOT NULL,
    parent_id integer,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: customer_services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customer_services (
    id integer NOT NULL,
    title text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    status public."CustomerStatus" DEFAULT 'PENDING'::public."CustomerStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: customer_services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customer_services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customer_services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customer_services_id_seq OWNED BY public.customer_services.id;


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    status public.available_status DEFAULT 'ACTIVE'::public.available_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    status public.available_status DEFAULT 'ACTIVE'::public.available_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: option_resources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.option_resources (
    id integer NOT NULL,
    "resourceId" integer NOT NULL
);


--
-- Name: options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.options (
    id integer NOT NULL,
    name text NOT NULL,
    "volumeId" integer NOT NULL,
    price bigint NOT NULL,
    stock integer DEFAULT 0,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.options_id_seq OWNED BY public.options.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(65,30) NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    total_amount numeric(65,30) NOT NULL,
    fee_shipping numeric(65,30) NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    payment text NOT NULL,
    detail text NOT NULL,
    ward text NOT NULL,
    district text NOT NULL,
    province text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "paymentId" integer NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment (
    id integer NOT NULL,
    order_id integer NOT NULL,
    status public."PaymentStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- Name: payment_transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_transaction (
    id integer NOT NULL,
    gateway character varying(100),
    transaction_date timestamp(3) without time zone,
    account_number character varying(100),
    sub_account character varying(250),
    amount_in numeric(20,2) DEFAULT 0.00 NOT NULL,
    amount_out numeric(20,2) DEFAULT 0.00 NOT NULL,
    accumulated numeric(20,2) DEFAULT 0.00 NOT NULL,
    code character varying(250),
    transaction_content text,
    reference_number character varying(255),
    body text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: payment_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_transaction_id_seq OWNED BY public.payment_transaction.id;


--
-- Name: policies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.policies (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    status public.available_status DEFAULT 'ACTIVE'::public.available_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: policies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.policies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: policies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.policies_id_seq OWNED BY public.policies.id;


--
-- Name: product_resources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_resources (
    "productId" integer NOT NULL,
    "resourceId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    base_price bigint NOT NULL,
    sale_price bigint NOT NULL,
    category_id integer NOT NULL,
    supplier_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: promotion_order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promotion_order_items (
    id integer NOT NULL,
    promotion_id integer NOT NULL,
    order_item_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: promotion_order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.promotion_order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: promotion_order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.promotion_order_items_id_seq OWNED BY public.promotion_order_items.id;


--
-- Name: promotion_orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promotion_orders (
    id integer NOT NULL,
    promotion_id integer NOT NULL,
    order_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: promotion_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.promotion_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: promotion_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.promotion_orders_id_seq OWNED BY public.promotion_orders.id;


--
-- Name: promotions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promotions (
    id integer NOT NULL,
    code text NOT NULL,
    description text NOT NULL,
    percent numeric(65,30) NOT NULL,
    map_amount numeric(65,30) NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    end_date timestamp(3) without time zone NOT NULL,
    usage_limit integer NOT NULL,
    status public.available_status DEFAULT 'ACTIVE'::public.available_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: promotions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.promotions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: promotions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.promotions_id_seq OWNED BY public.promotions.id;


--
-- Name: resources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resources (
    id integer NOT NULL,
    public_id text NOT NULL,
    type text NOT NULL,
    format text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone,
    "isDeleted" boolean DEFAULT false NOT NULL
);


--
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    content text NOT NULL,
    rating integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.suppliers (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    country text NOT NULL,
    website text NOT NULL,
    status public.available_status DEFAULT 'INACTIVE'::public.available_status NOT NULL,
    address_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    name text DEFAULT ''::text,
    password character varying(255) NOT NULL,
    phone text DEFAULT ''::text,
    avatar text DEFAULT ''::text,
    status public."UserStatus" DEFAULT 'INACTIVE'::public."UserStatus" NOT NULL,
    dob date,
    role_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: volumns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.volumns (
    id integer NOT NULL,
    name text NOT NULL,
    value numeric(65,30) NOT NULL,
    unit text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: volumns_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.volumns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: volumns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.volumns_id_seq OWNED BY public.volumns.id;


--
-- Name: wishlists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wishlists (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


--
-- Name: wishlists_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wishlists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wishlists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wishlists_id_seq OWNED BY public.wishlists.id;


--
-- Name: abouts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.abouts ALTER COLUMN id SET DEFAULT nextval('public.abouts_id_seq'::regclass);


--
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: customer_services id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer_services ALTER COLUMN id SET DEFAULT nextval('public.customer_services_id_seq'::regclass);


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options ALTER COLUMN id SET DEFAULT nextval('public.options_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- Name: payment_transaction id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_transaction ALTER COLUMN id SET DEFAULT nextval('public.payment_transaction_id_seq'::regclass);


--
-- Name: policies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.policies ALTER COLUMN id SET DEFAULT nextval('public.policies_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: promotion_order_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotion_order_items ALTER COLUMN id SET DEFAULT nextval('public.promotion_order_items_id_seq'::regclass);


--
-- Name: promotion_orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotion_orders ALTER COLUMN id SET DEFAULT nextval('public.promotion_orders_id_seq'::regclass);


--
-- Name: promotions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions ALTER COLUMN id SET DEFAULT nextval('public.promotions_id_seq'::regclass);


--
-- Name: resources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: volumns id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.volumns ALTER COLUMN id SET DEFAULT nextval('public.volumns_id_seq'::regclass);


--
-- Name: wishlists id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlists ALTER COLUMN id SET DEFAULT nextval('public.wishlists_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
34ea52a7-98da-426b-9b9f-d9dfeb83eaa2	df03d2a45935cf825cfb62c2e99791b53ada24825319d6bb2a3b54b8cc611f02	2025-05-14 01:27:24.800155+00	20250501102044_init_database	\N	\N	2025-05-14 01:27:24.731562+00	1
\.


--
-- Data for Name: abouts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.abouts (id, title, content, status, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.addresses (id, detail, ward, district, province, user_id, created_at, updated_at, deleted_at) FROM stdin;
4	12 Nguyễn Huệ	Phường Bến Nghé	Quận 1	Hồ Chí Minh	1	2025-04-27 04:06:30.566	2025-04-27 04:06:30.566	\N
5	35 Xuân Thủy	Phường Thảo Điền	Quận 2	Hồ Chí Minh	1	2025-04-27 04:06:30.566	2025-04-27 04:06:30.566	\N
6	102 Hai Bà Trưng	Phường Tân Định	Quận 1	Hồ Chí Minh	1	2025-04-27 04:06:30.566	2025-04-27 04:06:30.566	\N
7	45 Bạch Đằng	Phường 2	Quận Tân Bình	Hồ Chí Minh	1	2025-04-27 04:11:13.111	\N	\N
8	65 Phan Bội Châu	Phường 4	Quận Tân Phú	Hồ Chí Minh	1	2025-04-27 04:13:42.397	\N	\N
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_items (id, product_id, cart_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts (id, quantity, user_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, status, created_at, updated_at, deleted_at) FROM stdin;
1	Tinh dầu	ACTIVE	2025-04-27 04:17:47.076	2025-04-27 04:17:47.076	\N
2	Lọ đựng tinh dầu	ACTIVE	2025-04-27 04:17:47.076	2025-04-27 04:17:47.076	\N
3	Máy xông tinh dầu	ACTIVE	2025-04-27 04:17:47.076	2025-04-27 04:17:47.076	\N
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments (id, content, "like", parent_id, user_id, product_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: customer_services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customer_services (id, title, email, message, status, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.faqs (id, title, content, status, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, title, content, status, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: option_resources; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.option_resources (id, "resourceId") FROM stdin;
\.


--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.options (id, name, "volumeId", price, stock, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_items (id, quantity, price, order_id, product_id, created_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, total_amount, fee_shipping, status, payment, detail, ward, district, province, user_id, created_at, "paymentId") FROM stdin;
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment (id, order_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: payment_transaction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_transaction (id, gateway, transaction_date, account_number, sub_account, amount_in, amount_out, accumulated, code, transaction_content, reference_number, body, created_at) FROM stdin;
\.


--
-- Data for Name: policies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.policies (id, title, content, status, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: product_resources; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_resources ("productId", "resourceId", "createdAt") FROM stdin;
1	2	2025-05-11 11:20:31
1	3	2025-05-11 11:20:31
1	4	2025-05-11 11:20:31
2	5	2025-05-11 04:51:51.765
2	6	2025-05-11 04:51:51.765
2	7	2025-05-11 04:51:51.765
2	8	2025-05-11 04:51:51.765
2	9	2025-05-11 04:51:51.765
2	10	2025-05-11 04:51:51.765
2	11	2025-05-11 04:51:51.765
2	12	2025-05-11 04:51:51.765
2	13	2025-05-11 04:51:51.765
3	14	2025-05-11 05:06:12.423
3	15	2025-05-11 05:06:12.423
3	16	2025-05-11 05:06:12.423
3	17	2025-05-11 05:06:12.423
4	18	2025-05-11 05:09:22.939
4	19	2025-05-11 05:09:22.939
4	20	2025-05-11 05:09:22.939
4	21	2025-05-11 05:09:22.939
5	22	2025-05-11 05:13:22.772
5	23	2025-05-11 05:13:22.772
5	24	2025-05-11 05:13:22.772
5	25	2025-05-11 05:13:22.772
5	26	2025-05-11 05:13:22.772
5	27	2025-05-11 05:13:22.772
5	28	2025-05-11 05:13:22.772
6	29	2025-05-11 05:16:15.838
6	30	2025-05-11 05:16:15.838
6	31	2025-05-11 05:16:15.838
6	32	2025-05-11 05:16:15.838
7	33	2025-05-11 05:21:27.129
7	34	2025-05-11 05:21:27.129
7	35	2025-05-11 05:21:27.129
7	36	2025-05-11 05:21:27.129
8	37	2025-05-11 05:28:15.421
8	38	2025-05-11 05:28:15.421
8	39	2025-05-11 05:28:15.421
8	40	2025-05-11 05:28:15.421
9	41	2025-05-11 05:30:11.93
9	42	2025-05-11 05:30:11.93
9	43	2025-05-11 05:30:11.93
10	44	2025-05-11 05:32:39.364
10	45	2025-05-11 05:32:39.364
10	46	2025-05-11 05:32:39.364
10	47	2025-05-11 05:32:39.364
11	41	2025-05-11 05:33:42.242
11	42	2025-05-11 05:33:42.242
11	43	2025-05-11 05:33:42.242
12	48	2025-05-11 05:37:30.001
12	49	2025-05-11 05:37:30.001
12	50	2025-05-11 05:37:30.001
12	51	2025-05-11 05:37:30.001
13	52	2025-05-11 05:40:30.588
13	53	2025-05-11 05:40:30.588
13	54	2025-05-11 05:40:30.588
13	55	2025-05-11 05:40:30.588
14	56	2025-05-11 05:45:09.976
14	57	2025-05-11 05:45:09.976
14	58	2025-05-11 05:45:09.976
14	59	2025-05-11 05:45:09.976
14	60	2025-05-11 05:45:09.976
14	61	2025-05-11 05:45:09.976
14	62	2025-05-11 05:45:09.976
15	63	2025-05-11 05:51:50.109
15	64	2025-05-11 05:51:50.109
15	65	2025-05-11 05:51:50.109
15	66	2025-05-11 05:51:50.109
15	67	2025-05-11 05:51:50.109
15	68	2025-05-11 05:51:50.109
15	69	2025-05-11 05:51:50.109
15	70	2025-05-11 05:51:50.109
16	71	2025-05-11 05:55:19.296
16	72	2025-05-11 05:55:19.296
16	73	2025-05-11 05:55:19.296
16	74	2025-05-11 05:55:19.296
16	75	2025-05-11 05:55:19.296
16	76	2025-05-11 05:55:19.296
16	77	2025-05-11 05:55:19.296
16	78	2025-05-11 05:55:19.296
17	79	2025-05-11 06:01:46.833
17	80	2025-05-11 06:01:46.833
17	81	2025-05-11 06:01:46.833
17	82	2025-05-11 06:01:46.833
17	83	2025-05-11 06:01:46.833
17	84	2025-05-11 06:01:46.833
17	85	2025-05-11 06:01:46.833
17	86	2025-05-11 06:01:46.833
18	87	2025-05-11 06:04:50.493
18	88	2025-05-11 06:04:50.493
18	89	2025-05-11 06:04:50.493
18	90	2025-05-11 06:04:50.493
18	91	2025-05-11 06:04:50.493
18	92	2025-05-11 06:04:50.493
18	93	2025-05-11 06:04:50.493
18	94	2025-05-11 06:04:50.493
19	95	2025-05-11 06:08:23.258
19	96	2025-05-11 06:08:23.258
19	97	2025-05-11 06:08:23.258
19	98	2025-05-11 06:08:23.258
19	99	2025-05-11 06:08:23.258
19	100	2025-05-11 06:08:23.258
19	101	2025-05-11 06:08:23.258
19	102	2025-05-11 06:08:23.258
20	103	2025-05-11 06:10:55.231
20	104	2025-05-11 06:10:55.231
20	105	2025-05-11 06:10:55.231
20	106	2025-05-11 06:10:55.231
20	107	2025-05-11 06:10:55.231
20	108	2025-05-11 06:10:55.231
20	109	2025-05-11 06:10:55.231
21	110	2025-05-11 06:13:41.906
21	111	2025-05-11 06:13:41.906
21	112	2025-05-11 06:13:41.906
21	113	2025-05-11 06:13:41.906
21	114	2025-05-11 06:13:41.906
21	115	2025-05-11 06:13:41.906
21	116	2025-05-11 06:13:41.906
21	117	2025-05-11 06:13:41.906
22	119	2025-05-11 06:17:04.488
22	120	2025-05-11 06:17:04.488
22	121	2025-05-11 06:17:04.488
22	122	2025-05-11 06:17:04.488
22	123	2025-05-11 06:17:04.488
22	124	2025-05-11 06:17:04.488
22	125	2025-05-11 06:17:04.488
22	126	2025-05-11 06:17:04.488
22	127	2025-05-11 06:17:04.488
23	128	2025-05-11 06:19:48.223
23	129	2025-05-11 06:19:48.223
23	130	2025-05-11 06:19:48.223
23	131	2025-05-11 06:19:48.223
23	132	2025-05-11 06:19:48.223
23	133	2025-05-11 06:19:48.223
23	134	2025-05-11 06:19:48.223
23	135	2025-05-11 06:19:48.223
24	136	2025-05-11 06:27:34.095
24	137	2025-05-11 06:27:34.095
24	138	2025-05-11 06:27:34.095
24	139	2025-05-11 06:27:34.095
24	140	2025-05-11 06:27:34.095
24	141	2025-05-11 06:27:34.095
24	142	2025-05-11 06:27:34.095
24	143	2025-05-11 06:27:34.095
24	144	2025-05-11 06:27:34.095
25	145	2025-05-11 06:30:41.847
25	146	2025-05-11 06:30:41.847
25	147	2025-05-11 06:30:41.847
25	148	2025-05-11 06:30:41.847
25	149	2025-05-11 06:30:41.847
25	150	2025-05-11 06:30:41.847
25	151	2025-05-11 06:30:41.847
25	152	2025-05-11 06:30:41.847
26	153	2025-05-11 06:33:27.118
26	154	2025-05-11 06:33:27.118
26	155	2025-05-11 06:33:27.118
26	156	2025-05-11 06:33:27.118
26	157	2025-05-11 06:33:27.118
26	158	2025-05-11 06:33:27.118
26	159	2025-05-11 06:33:27.118
26	160	2025-05-11 06:33:27.118
27	161	2025-05-11 06:36:25.526
27	162	2025-05-11 06:36:25.526
27	163	2025-05-11 06:36:25.526
27	164	2025-05-11 06:36:25.526
27	165	2025-05-11 06:36:25.526
27	166	2025-05-11 06:36:25.526
27	167	2025-05-11 06:36:25.526
27	168	2025-05-11 06:36:25.526
28	169	2025-05-11 06:39:20.495
28	170	2025-05-11 06:39:20.495
28	171	2025-05-11 06:39:20.495
28	172	2025-05-11 06:39:20.495
28	173	2025-05-11 06:39:20.495
28	174	2025-05-11 06:39:20.495
28	175	2025-05-11 06:39:20.495
28	176	2025-05-11 06:39:20.495
29	177	2025-05-11 06:41:24.899
29	178	2025-05-11 06:41:24.899
29	179	2025-05-11 06:41:24.899
29	180	2025-05-11 06:41:24.899
29	181	2025-05-11 06:41:24.899
29	182	2025-05-11 06:41:24.899
29	183	2025-05-11 06:41:24.899
29	184	2025-05-11 06:41:24.899
30	185	2025-05-11 06:43:18.663
30	186	2025-05-11 06:43:18.663
30	187	2025-05-11 06:43:18.663
30	188	2025-05-11 06:43:18.663
30	189	2025-05-11 06:43:18.663
30	190	2025-05-11 06:43:18.663
30	191	2025-05-11 06:43:18.663
30	192	2025-05-11 06:43:18.663
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, name, description, base_price, sale_price, category_id, supplier_id, created_at, updated_at, deleted_at) FROM stdin;
10	Máy xông tinh dầu	Máy xông tinh dầu 100ml	1200000	1100000	3	13	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
2	Tinh dầu Lavender	Tinh dầu Lavender nguyên chất	500000	450000	1	11	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
8	Tinh dầu Orange	Tinh dầu cam tự nhiên	400000	350000	1	11	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
6	Tinh dầu Lemongrass	Tinh dầu sả chanh	350000	320000	1	13	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
4	Tinh dầu Eucalyptus	Tinh dầu Eucalyptus thư giãn	450000	400000	1	12	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
11	Lọ đựng tinh dầu 20ml	Lọ đựng tinh dầu 20ml thủy tinh	150000	140000	2	11	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
9	Lọ đựng tinh dầu 10ml	Lọ đựng tinh dầu 10ml bằng thủy tinh	100000	90000	2	12	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
3	Tinh dầu Peppermint	Tinh dầu Peppermint tự nhiên	600000	550000	1	11	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
7	Tinh dầu Tea Tree	Tinh dầu tràm trà	550000	500000	1	13	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
5	Tinh dầu Rose	Tinh dầu hoa hồng	700000	650000	1	12	2025-04-27 04:23:32.889	2025-04-27 04:23:32.889	\N
1	Chai Tinh Dầu Trắng Mờ Nắp Bóp Nhỏ Giọt Khuyên Xi	1. Chi Tiết Sản Phẩm\n- Mã số : TDNM-XS\n- Dung tích :5ml, 10ml, 15ml , 20ml, 30ml, 50ml, 100ml\n- Loại Nắp : Xịt Sương | Mạ Vàng Cao Cấp\n- Trọng lượng :20gr-100gr\n- Còn Hàng - Ship Toàn quốc\n\n2.  Điểm nổi bật :\n- Dòng chai thủy tinh dùng Đựng tinh dầu , hóa chất thì không thể thiếu được màu hỗ phách. vì chỉ có loai này thì mới có thể không làm thay đổi hoạt tích hóa học của tinh dau .với Đầu lăn cao cấp. bạn có Thể ứng dụng rất nhiều công Dụng.\n\n- chất liệu thủy tinh sáng, đẹp và màu hỗ Phách. Chai thủy tinh rất dầy và chắc chắn cùng quay xách cùng ống bớp sang trọng nên được dùng nhiều để bao bì các chất hóa chất , tinh dau các loại , liệu hương .....\n- Với thiết kế riêng biệt dầy các Tính tạo một thương hiệu sản phẩm của bạn.\n\n- Dòng Sản Phẩm có Nhiều Dung Tích :  5ml, 10ml, 15ml , 20ml, 30ml, 50ml, 100ml	5000	5000	2	11	2025-05-11 10:52:08	\N	\N
12	Máy xông tinh dầu LORITA DK-BL02	Máy xông, máy khuếch tán tinh dầu LORITA DK-BL01 là dòng máy xông siêu âm với thiết kế Hình Trụ dài hoạ tiết bông lúa vân gỗ phù hợp với nhiều không gian, có tông màu nhẹ nhàng, thanh lịch.\nThường được đặt trên bàn, phòng khách, kệ tủ đầu giường,… tạo điểm nhấn trong thiết kế nội thất	100000	100000	3	11	2025-05-11 05:35:50.738	\N	\N
13	Máy xông tinh dầu LORITA KDK-TT3D	Máy xông, máy khuếch tán tinh dầu LORITA KDK-TT3D  là dòng máy xông siêu âm với thiết kế hình Lọ hoa với đèn màu 3D và chất liệu thủy tinh, phù hợp với nhiều không gian.\nThường được đặt trên kệ tủ, bàn khách, bàn ăn,… đem đến cảm giác sang trọng, tạo điểm nhấn.	650000	650000	3	13	2025-05-11 05:38:57.285	\N	\N
15	Tinh Dầu Trà Trắng (White Tea Essential Oil) Heny Garden	Tinh dầu White Tea hay còn gọi là tinh dầu trà trắng là một trong những “gương mặt” nổi bật trong thời gian gần đây bởi hương thơm thuần khiết và khả năng tuyệt vời mà nó mang lại.\n\nCùng Heny Garden khám phá một số công dụng cũng như nhiều cách sử dụng hay ho của loại tinh dầu này nhé. 	119000	119000	1	16	2025-05-11 05:48:40.135	\N	\N
18	Tinh Dầu Vani (Sweet Vanilla Essential Oil) Heny Garden	Tinh dầu Vani đã xuất hiện từ rất lâu và được sử dụng phổ biến trên thế giới. Không chỉ là nguyên liệu phổ biến trong công thức làm bánh	119000	89000	1	12	2025-05-11 13:03:03	\N	\N
19	Tinh Dầu Cà Phê (Coffee Essential Oil) Heny Garden	Tinh dầu Cà Phê khi được khuếch tán vào trong không khí sẽ khiến hương thơm nồng nàn ấm áp lan tỏa khắp ngôi nhà bạn	119000	89000	1	12	2025-05-11 13:06:12	\N	\N
20	Tinh Dầu Gỗ Thông (Pine Essential Oil) Heny Garden	Tinh dầu Thông từ lâu đã gắn liền với đời sống con người, nhờ các lợi ích mà nó mang lại trong đời sống và sức khỏe. Ngày nay để thuận tiện hơn cho việc khai thác các lợi ích sức khỏe mà cây Thông mang lại, tinh dầu Thông đã được chiết xuất để được sử dụng rộng rãi hơn.  Tinh dầu Thông đã trở thành một hương thơm phổ biến trong mỹ phẩm, đồ vệ sinh cá nhân, xà phòng và chất tẩy rửa. Bài viết sản phẩm này nêu bật các lợi ích, đặc tính và cách sử dụng an toàn khác của Tinh dầu Thông.	99000	69000	1	12	2025-05-11 13:09:23	\N	\N
21	Tinh Dầu Hương Thảo (Rosemary Essential Oil) Heny Garden	Hương Thảo được biết đến chủ yếu như 1 loại nguyên liệu ẩm thực, nhưng gần đây Tinh Dầu Hương Thảo lại được đánh giá cao về hương thơm đặc trưng cùng những lợi ích trong y học. Cùng Heny tìm hiểu các công dụng và lợi ich của cây Hương Thảo mang lại nhé.	109000	79000	1	12	2025-05-11 13:11:51	\N	\N
22	Tinh Dầu Thơm Phối Hương Aquamarine (Viên Ngọc Của Đại Dương) Heny Garden	Tinh dầu thơm phối hương Aquamarine lấy cảm hứng từ hơi thở của vùng biển lộng gió Windansea tại San Diego	189000	149000	1	12	2025-05-11 13:14:59	\N	\N
23	Tinh Dầu Đàn Hương (Sandalwood Essential Oil) Heny Garden	Tinh dầu Đàn Hương được chiết xuất từ một loại cây rất có giá trị, có mùi hương cổ điển và là thành phần được tìm thấy trong nhiều loại nước hoa.  Giá trị mà tinh dầu gỗ Đàn hương mang lại không chỉ là hương thơm, mà còn nhiều lợi ích khác cho sức khỏe: điều trị mất ngủ, cân bằng cảm xúc và tâm trạng, làm lành vết thương,...	229000	189000	1	12	2025-05-11 13:17:55	\N	\N
24	Tinh Dầu Thơm Phối Hương Black Ocean (Đại Dương Đen) Heny Garden	Tinh dầu thơm phối hương Black Ocean không miêu tả năng lượng sảng khoái và tràn đầy tinh thần như những tay lướt sóng cừ khôi trên vùng biển lộng gió Windansea	179000	149000	1	12	2025-05-11 13:25:21	\N	\N
17	Tinh Dầu Phối Hương Tropical Paradise (Thiên Đường Nhiệt Đới) Xông Thơm Phòng HENY GARDEN	Tinh dầu phối hương Tropical Paradise (Thiên Đường Nhiệt Đới) đem đến một mùi hương giống như gió mang theo hương thơm của dừa và các loài hoa tươi. Bạn sẽ cảm nhận được sự dịu mát và tươi mới, như là một cuộc phiêu lưu vào một thiên đường nhiệt đới.	179000	149000	1	12	2025-05-11 05:59:23.039	\N	\N
14	Tinh Dầu Phối Hương Yummy Kiwi (Kiwi Hảo Hạng) Xông Thơm Phòng HENY GARDEN	- Tinh dầu thơm phối hương Yummy Kiwi (Kiwi Hảo Hạng)\n\n- Mùi hương là sự phối hợp giữa các tầng Top/Mid/Base note (hương Đầu/ Giữa/ Cuối) tạo nên sự độc đáo và lưu luyến hơn so với tinh dầu đơn hương.\n\n- Nốt hương chính: Kiwi, Sữa dừa, Xoài chín\n\n- Nốt hương bổ trợ: Chanh dây, Hoa ly, Hoa cam, Hổ phách, Dưa lưới\n\n- Dung tích: 10mL\n\n- Thương hiệu: Heny Garden\n\n- Thời hạn sử dụng: 2 năm\n\n- Heny Garden bảo chứng chất lượng sản phẩm với đánh giá 5 sao.	179000	149000	1	15	2025-05-11 05:42:52.348	\N	\N
16	Tinh Dầu Hoa Nhài (Elegant Jasmine Essential Oil) Heny Garden	Tinh dầu Hoa Nhài (tinh dầu hoa Lài) được chiết xuất từ những đóa hoa nhài trắng muốt - một loài hoa chỉ nở vào ban đêm. Hoa lài được yêu thích nhờ vào hương thơm lãng mạn	179000	149000	1	12	2025-05-11 05:53:05.428	\N	\N
25	Tinh Dầu Sả Hoa Hồng (Palmarosa Essential Oil) Heny Garden	Tinh dầu Sả Hoa Hồng đã được sử dụng ngàn năm trong lĩnh vực Y học tại Trung Quốc và Ấn Độ. Ngày nay	99000	69000	1	12	2025-05-11 13:28:28	\N	\N
26	Tinh Dầu Quế (Cinnamon Essential Oil) Heny Garden	Tinh dầu Quế cay nồng, ngọt ngào, quen thuộc với nhiều người vì quế là nguyên liệu phổ biến trong ẩm thực. Dầu quế được đánh giá cao vì hương thơm tươi mới và những lợi ích về sức khỏe và sắc đẹp mà nó mang lại nhờ những khả năng kháng khuẩn, chống nấm, chống oxy hoá.\nNhưng nhiều người vẫn còn băn khoăn rằng tinh dầu Quế có tốt hay không? Vậy hãy cùng Heny tìm hiểu các lợi ích mà tinh dầu Quế mang lại và giải đáp thắc mắc trên nhé. 	99000	69000	1	12	2025-05-11 13:31:54	\N	\N
27	Tinh Dầu Ngọc Lan Tây (Ylang Ylang Essential Oil) Heny Garden	Tinh dầu Ngọc Lan Tây (Ylang Ylang essential oil) với hương quyến rũ, nữ tính và lãng mạn, hoa Ngọc Lan Tây thường được sử dụng làm nước hoa, liệu pháp điều trị tâm lý và chăm sóc da tóc. \nNếu là một người yêu thích hương thơm, nhất là nước hoa, chắc hẳn bạn đã từng thấy sự xuất hiện của Hoa Ngọc Lan Tây trong thành phần, điển hình như nước hoa Chanel No5	149000	119000	1	12	2025-05-11 13:34:58	\N	\N
28	Tinh Dầu Hoàng Đàn - Tuyết Tùng (Cedarwood Essential Oil) Heny Garden	Tinh dầu Hoàng Đàn (tinh dầu gỗ Tuyết Tùng) có hương gỗ ngọt nồng ấm, dễ chịu, tạo hương thơm thư giãn, dịu êm khi được khuếch tán. Tinh dầu Cedarwood là một thành phần bổ sung tuyệt vời cho các sản phẩm chăm sóc da và tóc, còn được tìm thấy trong nước hoa, chống côn trùng và khử mùi.	139000	99000	1	12	2025-05-11 13:37:37	\N	\N
29	Tinh Dầu Thơm Phối Hương The Stars (Vì Sao Trên Trời) Heny Garden	Tinh dầu thơm phối hương The Stars tái hiện khoảnh khắc đứng giữa bầu trời trong một đêm lộng gió tại căn hộ penthouse tọa lạc tại quận 7 năm ngoái. Vào cái buổi đêm ấy, tiết trời se lạnh, đầy sao và im lặng đến lạ. Khác biệt với vòng xoay kèm sự náo nhiệt, ồn ào của một ngày dài; Dường như lúc này vạn vật đều nín thở vì sợ làm tan vỡ bầu không khí yên tĩnh.	189000	149000	1	12	2025-05-11 13:39:54	\N	\N
30	Tinh Dầu Thơm Phối Hương Christmas Spirit (Giáng Sinh Rộn Ràng) Heny Garden	Tinh dầu thơm phối hương Christmas Spirit đem đến không khí một ngày lễ Giáng Sinh quây quần thưởng thức một bữa tối ấm cúng và trao quà vào lúc nửa đêm tại hầu hết các quốc gia Châu Âu. Người ta thường nhớ đến hương vị ngọt ấm của món tráng miệng bánh táo quế trong bữa tối đêm Giáng Sinh. Nhớ đến khoảnh khắc hồi hộp trao quà bên cạnh chiếc lò sưởi, hòa với hương thơm mát lạnh từ cây Thông lấp lánh ánh đèn. Nhớ đến mùi hương đặc trưng như Christmas Spirit.	189000	149000	1	12	2025-05-11 13:41:55	\N	\N
\.


--
-- Data for Name: promotion_order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.promotion_order_items (id, promotion_id, order_item_id, created_at) FROM stdin;
\.


--
-- Data for Name: promotion_orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.promotion_orders (id, promotion_id, order_id, created_at) FROM stdin;
\.


--
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.promotions (id, code, description, percent, map_amount, start_date, end_date, usage_limit, status, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.resources (id, public_id, type, format, created_at, updated_at, deleted_at, "isDeleted") FROM stdin;
1	ecommerce/test/kltn_logohbf7jOH7	image	jpg	2025-05-11 03:47:29.768	2025-05-11 03:47:29.768	\N	f
2	ecommerce/test/3QQD7-6VK	image	webp	2025-05-11 04:19:29.121	2025-05-11 04:19:29.121	\N	f
3	ecommerce/test/2UpN_3NLU	image	webp	2025-05-11 04:19:29.221	2025-05-11 04:19:29.221	\N	f
4	ecommerce/test/13ROxBLAg	image	webp	2025-05-11 04:19:29.367	2025-05-11 04:19:29.367	\N	f
5	ecommerce/test/30Q3QQbhp	image	jpg	2025-05-11 04:51:25.536	2025-05-11 04:51:25.536	\N	f
6	ecommerce/test/4c5TQBXtM	image	webp	2025-05-11 04:51:25.738	2025-05-11 04:51:25.738	\N	f
7	ecommerce/test/55SI62S4j	image	webp	2025-05-11 04:51:25.739	2025-05-11 04:51:25.739	\N	f
8	ecommerce/test/1ac-T1cbZ	image	webp	2025-05-11 04:51:25.818	2025-05-11 04:51:25.818	\N	f
9	ecommerce/test/6E8rpaNc6	image	jpg	2025-05-11 04:51:27.128	2025-05-11 04:51:27.128	\N	f
10	ecommerce/test/7lbRTZKFu	image	webp	2025-05-11 04:51:27.733	2025-05-11 04:51:27.733	\N	f
11	ecommerce/test/3XOzjGjb-	image	webp	2025-05-11 04:51:27.831	2025-05-11 04:51:27.831	\N	f
12	ecommerce/test/2kJtogosa	image	webp	2025-05-11 04:51:27.832	2025-05-11 04:51:27.832	\N	f
13	ecommerce/test/8AKfzzipX	image	webp	2025-05-11 04:51:29.159	2025-05-11 04:51:29.159	\N	f
14	ecommerce/test/4zg06_vkF	image	jpg	2025-05-11 05:05:54.256	2025-05-11 05:05:54.256	\N	f
15	ecommerce/test/1dd6ctflu	image	webp	2025-05-11 05:05:54.78	2025-05-11 05:05:54.78	\N	f
16	ecommerce/test/3NLNKejGT	image	webp	2025-05-11 05:05:55.052	2025-05-11 05:05:55.052	\N	f
17	ecommerce/test/2UmoHYI_d	image	webp	2025-05-11 05:05:56.111	2025-05-11 05:05:56.111	\N	f
18	ecommerce/test/31mC2Ow6f	image	webp	2025-05-11 05:08:57.361	2025-05-11 05:08:57.361	\N	f
19	ecommerce/test/4QxUZxrhC	image	webp	2025-05-11 05:08:57.71	2025-05-11 05:08:57.71	\N	f
20	ecommerce/test/1pLZ53dK6	image	webp	2025-05-11 05:08:59.949	2025-05-11 05:08:59.949	\N	f
21	ecommerce/test/2A7w-WHjv	image	webp	2025-05-11 05:09:00.133	2025-05-11 05:09:00.133	\N	f
22	ecommerce/test/4LeP-NkxQ	image	webp	2025-05-11 05:12:51.052	2025-05-11 05:12:51.052	\N	f
23	ecommerce/test/3aeMG3q_V	image	webp	2025-05-11 05:12:51.92	2025-05-11 05:12:51.92	\N	f
24	ecommerce/test/6YZSDMUTy	image	webp	2025-05-11 05:12:52.226	2025-05-11 05:12:52.226	\N	f
25	ecommerce/test/2an2Wphq0	image	webp	2025-05-11 05:12:52.369	2025-05-11 05:12:52.369	\N	f
26	ecommerce/test/5ynuOGGyH	image	webp	2025-05-11 05:12:52.474	2025-05-11 05:12:52.474	\N	f
27	ecommerce/test/7v1-1gu2o	image	jpg	2025-05-11 05:12:52.684	2025-05-11 05:12:52.684	\N	f
28	ecommerce/test/1jS1wyPoD	image	webp	2025-05-11 05:12:55.446	2025-05-11 05:12:55.446	\N	f
29	ecommerce/test/4qFAi9Nib	image	webp	2025-05-11 05:15:19.026	2025-05-11 05:15:19.026	\N	f
30	ecommerce/test/1wafGgx8r	image	webp	2025-05-11 05:15:19.321	2025-05-11 05:15:19.321	\N	f
31	ecommerce/test/2QybZXWtF	image	jpg	2025-05-11 05:15:19.322	2025-05-11 05:15:19.322	\N	f
32	ecommerce/test/38VjPn5hR	image	webp	2025-05-11 05:15:19.456	2025-05-11 05:15:19.456	\N	f
33	ecommerce/test/27VhodOUG	image	webp	2025-05-11 05:20:29.107	2025-05-11 05:20:29.107	\N	f
34	ecommerce/test/3DIOfUZ7U	image	webp	2025-05-11 05:20:29.256	2025-05-11 05:20:29.256	\N	f
35	ecommerce/test/4Gpu27wp-	image	webp	2025-05-11 05:20:29.574	2025-05-11 05:20:29.574	\N	f
36	ecommerce/test/1zC-RX4Cb	image	webp	2025-05-11 05:20:30.024	2025-05-11 05:20:30.024	\N	f
37	ecommerce/test/1zqmIrzXk	image	webp	2025-05-11 05:25:14.352	2025-05-11 05:25:14.352	\N	f
38	ecommerce/test/2uymTbwCB	image	webp	2025-05-11 05:25:14.353	2025-05-11 05:25:14.353	\N	f
39	ecommerce/test/4f8ohRou1	image	webp	2025-05-11 05:25:14.7	2025-05-11 05:25:14.7	\N	f
40	ecommerce/test/3uLAW2y_1	image	webp	2025-05-11 05:25:15.146	2025-05-11 05:25:15.146	\N	f
41	ecommerce/test/38Fu3DTej	image	jpg	2025-05-11 05:29:48.243	2025-05-11 05:29:48.243	\N	f
42	ecommerce/test/28pYaSW7E	image	jpg	2025-05-11 05:29:48.288	2025-05-11 05:29:48.288	\N	f
43	ecommerce/test/1IIcv3dCz	image	png	2025-05-11 05:29:48.45	2025-05-11 05:29:48.45	\N	f
44	ecommerce/test/4oOPi-rVV	image	jpg	2025-05-11 05:32:09.518	2025-05-11 05:32:09.518	\N	f
45	ecommerce/test/3ycbIqFyx	image	jpg	2025-05-11 05:32:09.583	2025-05-11 05:32:09.583	\N	f
46	ecommerce/test/2MxQRR9gz	image	jpg	2025-05-11 05:32:09.778	2025-05-11 05:32:09.778	\N	f
47	ecommerce/test/1zYAOxpue	image	jpg	2025-05-11 05:32:11.01	2025-05-11 05:32:11.01	\N	f
48	ecommerce/test/4RzLZxiGF	image	jpg	2025-05-11 05:36:56.274	2025-05-11 05:36:56.274	\N	f
49	ecommerce/test/3ztAdArI5	image	jpg	2025-05-11 05:36:56.276	2025-05-11 05:36:56.276	\N	f
50	ecommerce/test/22nDtAi7b	image	jpg	2025-05-11 05:36:56.577	2025-05-11 05:36:56.577	\N	f
51	ecommerce/test/1y7h-dfZR	image	jpg	2025-05-11 05:36:56.719	2025-05-11 05:36:56.719	\N	f
52	ecommerce/test/4isYzkR9C	image	png	2025-05-11 05:40:15.849	2025-05-11 05:40:15.849	\N	f
53	ecommerce/test/1Qyl05u2X	image	jpg	2025-05-11 05:40:15.849	2025-05-11 05:40:15.849	\N	f
54	ecommerce/test/20hNqLDTk	image	png	2025-05-11 05:40:16.033	2025-05-11 05:40:16.033	\N	f
55	ecommerce/test/3VB0kxlvY	image	png	2025-05-11 05:40:16.122	2025-05-11 05:40:16.122	\N	f
56	ecommerce/test/79wNOLge3	image	webp	2025-05-11 05:44:46.557	2025-05-11 05:44:46.557	\N	f
57	ecommerce/test/1-johGJjc	image	webp	2025-05-11 05:44:46.95	2025-05-11 05:44:46.95	\N	f
58	ecommerce/test/3jEsPsJOY	image	webp	2025-05-11 05:44:47.002	2025-05-11 05:44:47.002	\N	f
59	ecommerce/test/5-E8Y4UDb	image	webp	2025-05-11 05:44:47.411	2025-05-11 05:44:47.411	\N	f
60	ecommerce/test/2xq9xzQG_	image	webp	2025-05-11 05:44:48.981	2025-05-11 05:44:48.981	\N	f
61	ecommerce/test/4OqZdjC_c	image	webp	2025-05-11 05:44:48.981	2025-05-11 05:44:48.981	\N	f
62	ecommerce/test/6o8CwIfp7	image	webp	2025-05-11 05:44:49.748	2025-05-11 05:44:49.748	\N	f
63	ecommerce/test/3K9GMbAfK	image	webp	2025-05-11 05:51:18.06	2025-05-11 05:51:18.06	\N	f
64	ecommerce/test/6GO0ZLipj	image	webp	2025-05-11 05:51:19.074	2025-05-11 05:51:19.074	\N	f
65	ecommerce/test/4lHyyZsbV	image	webp	2025-05-11 05:51:19.726	2025-05-11 05:51:19.726	\N	f
66	ecommerce/test/5Ygu4BpHz	image	webp	2025-05-11 05:51:20.117	2025-05-11 05:51:20.117	\N	f
67	ecommerce/test/6iW1kaPYs	image	jpg	2025-05-11 05:51:20.118	2025-05-11 05:51:20.118	\N	f
68	ecommerce/test/29UinImRy	image	webp	2025-05-11 05:51:20.742	2025-05-11 05:51:20.742	\N	f
69	ecommerce/test/1C3_dGB7X	image	webp	2025-05-11 05:51:21.235	2025-05-11 05:51:21.235	\N	f
70	ecommerce/test/7OAbXkOzL	image	webp	2025-05-11 05:51:23.61	2025-05-11 05:51:23.61	\N	f
71	ecommerce/test/4sdZiZAZO	image	webp	2025-05-11 05:54:57.362	2025-05-11 05:54:57.362	\N	f
72	ecommerce/test/1gRZJmILn	image	webp	2025-05-11 05:54:58.576	2025-05-11 05:54:58.576	\N	f
73	ecommerce/test/8TsbK_43I	image	webp	2025-05-11 05:54:58.8	2025-05-11 05:54:58.8	\N	f
74	ecommerce/test/6iXRRDddH	image	webp	2025-05-11 05:54:58.864	2025-05-11 05:54:58.864	\N	f
75	ecommerce/test/7tkveCut-	image	jpg	2025-05-11 05:54:59.206	2025-05-11 05:54:59.206	\N	f
76	ecommerce/test/2xgsSmQQp	image	webp	2025-05-11 05:54:59.207	2025-05-11 05:54:59.207	\N	f
77	ecommerce/test/5kvYnvfOe	image	webp	2025-05-11 05:54:59.984	2025-05-11 05:54:59.984	\N	f
78	ecommerce/test/3LcK26K9c	image	webp	2025-05-11 05:55:00.429	2025-05-11 05:55:00.429	\N	f
79	ecommerce/test/74Nrt0IJU	image	webp	2025-05-11 06:01:25.873	2025-05-11 06:01:25.873	\N	f
80	ecommerce/test/1XljQVx05	image	webp	2025-05-11 06:01:26.14	2025-05-11 06:01:26.14	\N	f
81	ecommerce/test/3FDmGEYYo	image	webp	2025-05-11 06:01:26.21	2025-05-11 06:01:26.21	\N	f
82	ecommerce/test/4IDJHbpOv	image	webp	2025-05-11 06:01:26.238	2025-05-11 06:01:26.238	\N	f
83	ecommerce/test/2I4O2pn2N	image	webp	2025-05-11 06:01:26.358	2025-05-11 06:01:26.358	\N	f
84	ecommerce/test/5ZsF7cUYD	image	webp	2025-05-11 06:01:27.422	2025-05-11 06:01:27.422	\N	f
85	ecommerce/test/8tys-Qj_t	image	webp	2025-05-11 06:01:27.469	2025-05-11 06:01:27.469	\N	f
86	ecommerce/test/6Huoc0DVn	image	webp	2025-05-11 06:01:28.065	2025-05-11 06:01:28.065	\N	f
87	ecommerce/test/8vtO8yNzy	image	webp	2025-05-11 06:04:30.563	2025-05-11 06:04:30.563	\N	f
88	ecommerce/test/5RwnmohcM	image	webp	2025-05-11 06:04:30.803	2025-05-11 06:04:30.803	\N	f
89	ecommerce/test/4VrK9vudp	image	webp	2025-05-11 06:04:32.316	2025-05-11 06:04:32.316	\N	f
90	ecommerce/test/1ag5OgXey	image	webp	2025-05-11 06:04:32.521	2025-05-11 06:04:32.521	\N	f
91	ecommerce/test/3HoaVesJF	image	webp	2025-05-11 06:04:32.522	2025-05-11 06:04:32.522	\N	f
92	ecommerce/test/7LeXkOq6h	image	jpg	2025-05-11 06:04:33.431	2025-05-11 06:04:33.431	\N	f
93	ecommerce/test/2J2y97I6j	image	webp	2025-05-11 06:04:34.965	2025-05-11 06:04:34.965	\N	f
94	ecommerce/test/6eU7Bmhey	image	webp	2025-05-11 06:04:35.562	2025-05-11 06:04:35.562	\N	f
95	ecommerce/test/4rYnGkSgw	image	webp	2025-05-11 06:08:05.558	2025-05-11 06:08:05.558	\N	f
96	ecommerce/test/2yBU6ZJ4X	image	webp	2025-05-11 06:08:05.559	2025-05-11 06:08:05.559	\N	f
97	ecommerce/test/3EPRKf6T0	image	webp	2025-05-11 06:08:05.732	2025-05-11 06:08:05.732	\N	f
98	ecommerce/test/8NXLGSiIA	image	webp	2025-05-11 06:08:06.039	2025-05-11 06:08:06.039	\N	f
99	ecommerce/test/5DbPMRGx4	image	webp	2025-05-11 06:08:06.41	2025-05-11 06:08:06.41	\N	f
100	ecommerce/test/7sR1EpMab	image	jpg	2025-05-11 06:08:08.101	2025-05-11 06:08:08.101	\N	f
101	ecommerce/test/1ti4fCkni	image	webp	2025-05-11 06:08:08.185	2025-05-11 06:08:08.185	\N	f
102	ecommerce/test/67As7VDc2	image	webp	2025-05-11 06:08:08.8	2025-05-11 06:08:08.8	\N	f
103	ecommerce/test/4j9pKwhaT	image	webp	2025-05-11 06:10:30.232	2025-05-11 06:10:30.232	\N	f
104	ecommerce/test/5G0UoiSK2	image	webp	2025-05-11 06:10:30.439	2025-05-11 06:10:30.439	\N	f
105	ecommerce/test/395hpnkkg	image	jpg	2025-05-11 06:10:30.921	2025-05-11 06:10:30.921	\N	f
106	ecommerce/test/78jwDco9f	image	webp	2025-05-11 06:10:30.943	2025-05-11 06:10:30.943	\N	f
107	ecommerce/test/2IXMDF3b9	image	webp	2025-05-11 06:10:31.133	2025-05-11 06:10:31.133	\N	f
108	ecommerce/test/1y5IMw_9a	image	webp	2025-05-11 06:10:31.671	2025-05-11 06:10:31.671	\N	f
109	ecommerce/test/6LtxFdsd3	image	webp	2025-05-11 06:10:31.842	2025-05-11 06:10:31.842	\N	f
110	ecommerce/test/2NfyGOGSJ	image	webp	2025-05-11 06:13:23.839	2025-05-11 06:13:23.839	\N	f
111	ecommerce/test/17fJg8NAR	image	webp	2025-05-11 06:13:24.48	2025-05-11 06:13:24.48	\N	f
112	ecommerce/test/8CknTAZd6	image	webp	2025-05-11 06:13:24.616	2025-05-11 06:13:24.616	\N	f
113	ecommerce/test/4ILMe1YNP	image	webp	2025-05-11 06:13:24.744	2025-05-11 06:13:24.744	\N	f
114	ecommerce/test/5x6538-_Y	image	webp	2025-05-11 06:13:25.044	2025-05-11 06:13:25.044	\N	f
115	ecommerce/test/6lD2JO4TI	image	jpg	2025-05-11 06:13:25.211	2025-05-11 06:13:25.211	\N	f
116	ecommerce/test/77kY2LB4q	image	webp	2025-05-11 06:13:26.231	2025-05-11 06:13:26.231	\N	f
117	ecommerce/test/3vbdPJLdr	image	webp	2025-05-11 06:13:26.652	2025-05-11 06:13:26.652	\N	f
118	ecommerce/test/8xtZj-TJS	image	webp	2025-05-11 06:16:25.197	2025-05-11 06:16:25.197	\N	f
119	ecommerce/test/53_VI6j6o	image	webp	2025-05-11 06:16:25.434	2025-05-11 06:16:25.434	\N	f
120	ecommerce/test/7upNhhoEp	image	webp	2025-05-11 06:16:25.566	2025-05-11 06:16:25.566	\N	f
121	ecommerce/test/6P9-Rruyv	image	webp	2025-05-11 06:16:25.758	2025-05-11 06:16:25.758	\N	f
122	ecommerce/test/2JBalJOSh	image	webp	2025-05-11 06:16:25.873	2025-05-11 06:16:25.873	\N	f
123	ecommerce/test/1NSdLIfNg	image	webp	2025-05-11 06:16:26.646	2025-05-11 06:16:26.646	\N	f
124	ecommerce/test/9ocLgKdjm	image	webp	2025-05-11 06:16:27.566	2025-05-11 06:16:27.566	\N	f
125	ecommerce/test/10YPhCPCcL	image	webp	2025-05-11 06:16:27.632	2025-05-11 06:16:27.632	\N	f
126	ecommerce/test/3ooH-SY4Q	image	webp	2025-05-11 06:16:28.811	2025-05-11 06:16:28.811	\N	f
127	ecommerce/test/4BuKEL6uW	image	webp	2025-05-11 06:16:30.516	2025-05-11 06:16:30.516	\N	f
128	ecommerce/test/7UKPBTcum	image	webp	2025-05-11 06:19:20.273	2025-05-11 06:19:20.273	\N	f
129	ecommerce/test/1QbJzrMe-	image	webp	2025-05-11 06:19:20.952	2025-05-11 06:19:20.952	\N	f
130	ecommerce/test/5Jz_7pvep	image	webp	2025-05-11 06:19:21.255	2025-05-11 06:19:21.255	\N	f
131	ecommerce/test/454vT40OT	image	webp	2025-05-11 06:19:21.407	2025-05-11 06:19:21.407	\N	f
132	ecommerce/test/3aKrj0jsP	image	webp	2025-05-11 06:19:21.919	2025-05-11 06:19:21.919	\N	f
133	ecommerce/test/6w86sVDvS	image	jpg	2025-05-11 06:19:22.121	2025-05-11 06:19:22.121	\N	f
134	ecommerce/test/8tmi2U0VE	image	webp	2025-05-11 06:19:22.417	2025-05-11 06:19:22.417	\N	f
135	ecommerce/test/2W-4GA584	image	webp	2025-05-11 06:19:23.238	2025-05-11 06:19:23.238	\N	f
136	ecommerce/test/8Yza8Z9Nv	image	webp	2025-05-11 06:27:09.828	2025-05-11 06:27:09.828	\N	f
137	ecommerce/test/3J-r2EpQ2	image	webp	2025-05-11 06:27:09.877	2025-05-11 06:27:09.877	\N	f
138	ecommerce/test/5XS68HDwC	image	webp	2025-05-11 06:27:10.477	2025-05-11 06:27:10.477	\N	f
139	ecommerce/test/2udSew6f0	image	webp	2025-05-11 06:27:10.897	2025-05-11 06:27:10.897	\N	f
140	ecommerce/test/96fG_DMwK	image	webp	2025-05-11 06:27:11.305	2025-05-11 06:27:11.305	\N	f
141	ecommerce/test/6743jdzKy	image	webp	2025-05-11 06:27:12.76	2025-05-11 06:27:12.76	\N	f
142	ecommerce/test/7mpFizL2b	image	webp	2025-05-11 06:27:13.449	2025-05-11 06:27:13.449	\N	f
143	ecommerce/test/47M_YHq9d	image	png	2025-05-11 06:27:14.081	2025-05-11 06:27:14.081	\N	f
144	ecommerce/test/1Sl-cLeIX	image	webp	2025-05-11 06:27:14.691	2025-05-11 06:27:14.691	\N	f
145	ecommerce/test/4e2CVgDvy	image	webp	2025-05-11 06:30:18.371	2025-05-11 06:30:18.371	\N	f
146	ecommerce/test/28abBfYIT	image	webp	2025-05-11 06:30:18.664	2025-05-11 06:30:18.664	\N	f
147	ecommerce/test/8DoAzveiB	image	webp	2025-05-11 06:30:18.986	2025-05-11 06:30:18.986	\N	f
148	ecommerce/test/5qkpKz8n7	image	webp	2025-05-11 06:30:19.045	2025-05-11 06:30:19.045	\N	f
149	ecommerce/test/33bPn6BWA	image	webp	2025-05-11 06:30:19.81	2025-05-11 06:30:19.81	\N	f
150	ecommerce/test/6ihn7g2ta	image	webp	2025-05-11 06:30:19.906	2025-05-11 06:30:19.906	\N	f
151	ecommerce/test/1ryw2u_TZ	image	webp	2025-05-11 06:30:20.316	2025-05-11 06:30:20.316	\N	f
152	ecommerce/test/7CsfXKlzj	image	jpg	2025-05-11 06:30:20.565	2025-05-11 06:30:20.565	\N	f
153	ecommerce/test/8erNn_eH7	image	webp	2025-05-11 06:33:10.525	2025-05-11 06:33:10.525	\N	f
154	ecommerce/test/7i0br0IHC	image	jpg	2025-05-11 06:33:10.818	2025-05-11 06:33:10.818	\N	f
155	ecommerce/test/5kKCIM8c8	image	jpg	2025-05-11 06:33:10.852	2025-05-11 06:33:10.852	\N	f
156	ecommerce/test/40tf024Bi	image	webp	2025-05-11 06:33:10.918	2025-05-11 06:33:10.918	\N	f
157	ecommerce/test/1-JeO1Wo-	image	webp	2025-05-11 06:33:11.02	2025-05-11 06:33:11.02	\N	f
158	ecommerce/test/6Bg6343_o	image	jpg	2025-05-11 06:33:11.161	2025-05-11 06:33:11.161	\N	f
159	ecommerce/test/2nKtozEce	image	webp	2025-05-11 06:33:11.735	2025-05-11 06:33:11.735	\N	f
160	ecommerce/test/3XH9hr860	image	webp	2025-05-11 06:33:12.546	2025-05-11 06:33:12.546	\N	f
161	ecommerce/test/4El3Pq-I6	image	webp	2025-05-11 06:36:07.273	2025-05-11 06:36:07.273	\N	f
162	ecommerce/test/2lmMGDPvA	image	webp	2025-05-11 06:36:07.273	2025-05-11 06:36:07.273	\N	f
163	ecommerce/test/8Wl8KnBWz	image	webp	2025-05-11 06:36:07.569	2025-05-11 06:36:07.569	\N	f
164	ecommerce/test/53s2waA4I	image	webp	2025-05-11 06:36:07.57	2025-05-11 06:36:07.57	\N	f
165	ecommerce/test/6XzozpmAf	image	webp	2025-05-11 06:36:08.056	2025-05-11 06:36:08.056	\N	f
166	ecommerce/test/3ghDumyvz	image	webp	2025-05-11 06:36:08.089	2025-05-11 06:36:08.089	\N	f
167	ecommerce/test/7rpHfF5_W	image	jpg	2025-05-11 06:36:08.851	2025-05-11 06:36:08.851	\N	f
168	ecommerce/test/1PDWtfxdZ	image	webp	2025-05-11 06:36:08.984	2025-05-11 06:36:08.984	\N	f
169	ecommerce/test/1388T9GHR	image	webp	2025-05-11 06:38:58.895	2025-05-11 06:38:58.895	\N	f
170	ecommerce/test/2CN2N4bZ5	image	webp	2025-05-11 06:38:59.09	2025-05-11 06:38:59.09	\N	f
171	ecommerce/test/4PXurmsX0	image	webp	2025-05-11 06:38:59.529	2025-05-11 06:38:59.529	\N	f
172	ecommerce/test/3VuWzToU8	image	jpg	2025-05-11 06:38:59.814	2025-05-11 06:38:59.814	\N	f
173	ecommerce/test/8oCUjeJXa	image	webp	2025-05-11 06:39:00.238	2025-05-11 06:39:00.238	\N	f
174	ecommerce/test/7PxsYOSBH	image	webp	2025-05-11 06:39:00.793	2025-05-11 06:39:00.793	\N	f
175	ecommerce/test/5qSK7WNSu	image	jpg	2025-05-11 06:39:01.361	2025-05-11 06:39:01.361	\N	f
176	ecommerce/test/6lHEskuqz	image	webp	2025-05-11 06:39:05.005	2025-05-11 06:39:05.005	\N	f
177	ecommerce/test/7cG_wdKjJ	image	webp	2025-05-11 06:41:07.056	2025-05-11 06:41:07.056	\N	f
178	ecommerce/test/3DYtjCnu4	image	webp	2025-05-11 06:41:07.462	2025-05-11 06:41:07.462	\N	f
179	ecommerce/test/5w9guf8SQ	image	webp	2025-05-11 06:41:07.486	2025-05-11 06:41:07.486	\N	f
180	ecommerce/test/8wmMQcC7_	image	webp	2025-05-11 06:41:07.791	2025-05-11 06:41:07.791	\N	f
181	ecommerce/test/2YcR0kOo1	image	webp	2025-05-11 06:41:07.843	2025-05-11 06:41:07.843	\N	f
182	ecommerce/test/6u2q3NwvP	image	webp	2025-05-11 06:41:07.947	2025-05-11 06:41:07.947	\N	f
183	ecommerce/test/1gs-lCa2x	image	webp	2025-05-11 06:41:08.516	2025-05-11 06:41:08.516	\N	f
184	ecommerce/test/4cdvbJGsP	image	webp	2025-05-11 06:41:08.956	2025-05-11 06:41:08.956	\N	f
185	ecommerce/test/3Wf4sLijl	image	webp	2025-05-11 06:43:00.739	2025-05-11 06:43:00.739	\N	f
186	ecommerce/test/7rEOs1xvD	image	webp	2025-05-11 06:43:00.834	2025-05-11 06:43:00.834	\N	f
187	ecommerce/test/8_FhJyKsu	image	webp	2025-05-11 06:43:00.998	2025-05-11 06:43:00.998	\N	f
188	ecommerce/test/1MkuaEJ9B	image	webp	2025-05-11 06:43:01.058	2025-05-11 06:43:01.058	\N	f
189	ecommerce/test/67JnNGSnI	image	webp	2025-05-11 06:43:01.462	2025-05-11 06:43:01.462	\N	f
190	ecommerce/test/5HgcL7zS1	image	webp	2025-05-11 06:43:02.062	2025-05-11 06:43:02.062	\N	f
191	ecommerce/test/2T_YM8mWl	image	webp	2025-05-11 06:43:02.676	2025-05-11 06:43:02.676	\N	f
192	ecommerce/test/42VGvH1O9	image	webp	2025-05-11 06:43:02.782	2025-05-11 06:43:02.782	\N	f
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (id, content, rating, user_id, product_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, name, created_at, updated_at) FROM stdin;
1	ADMIN	2025-05-14 01:35:14.722	\N
2	USER	2025-05-14 01:35:14.722	\N
\.


--
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.suppliers (id, name, email, phone, country, website, status, address_id, created_at, updated_at, deleted_at) FROM stdin;
11	Jade Bloom	contact@jadebloom.vn	0909123456	Vietnam	https://www.jadebloom.com	ACTIVE	4	2025-04-27 04:07:50.683	2025-04-27 04:07:50.683	\N
12	doTERRA	contact@doterra.vn	0911123456	Vietnam	https://www.doterra.com	ACTIVE	5	2025-04-27 04:07:50.683	2025-04-27 04:07:50.683	\N
13	Edens Garden	contact@edensgarden.vn	0988123456	Vietnam	https://www.edensgarden.com	ACTIVE	6	2025-04-27 04:07:50.683	2025-04-27 04:07:50.683	\N
15	Young Living	contact@youngliving.vn	0985635273	America	https://www.youngliving.com	ACTIVE	7	2025-04-27 04:11:26.836	\N	\N
16	Rocky Mountain Oils	contact@rockymountainoils.vn	0963647462	Franch	https://www.rockymountainoils.com	ACTIVE	8	2025-04-27 04:13:49.383	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, name, password, phone, avatar, status, dob, role_id, created_at, updated_at, deleted_at) FROM stdin;
1	ducvui2003@gmail.com	admin	$argon2id$v=19$m=65536,t=3,p=4$RGUnK8MzXKquPL0ADTNQCg$1pUa7Rx9w67LZvpzkvbUd9L8IuELTgJ1BzvxN7F6iDM			INACTIVE	\N	1	2025-05-14 01:35:14.722	\N	\N
\.


--
-- Data for Name: volumns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.volumns (id, name, value, unit, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: wishlists; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.wishlists (id, user_id, product_id, created_at, updated_at, deleted_at) FROM stdin;
\.


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

SELECT pg_catalog.setval('public.options_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.resources_id_seq', 1, false);


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
-- Name: volumns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.volumns_id_seq', 1, false);


--
-- Name: wishlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.wishlists_id_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: abouts abouts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.abouts
    ADD CONSTRAINT abouts_pkey PRIMARY KEY (id);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: customer_services customer_services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer_services
    ADD CONSTRAINT customer_services_pkey PRIMARY KEY (id);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: option_resources option_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.option_resources
    ADD CONSTRAINT option_resources_pkey PRIMARY KEY (id);


--
-- Name: options options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- Name: payment_transaction payment_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_transaction
    ADD CONSTRAINT payment_transaction_pkey PRIMARY KEY (id);


--
-- Name: policies policies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.policies
    ADD CONSTRAINT policies_pkey PRIMARY KEY (id);


--
-- Name: product_resources product_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_resources
    ADD CONSTRAINT product_resources_pkey PRIMARY KEY ("productId", "resourceId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: promotion_order_items promotion_order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotion_order_items
    ADD CONSTRAINT promotion_order_items_pkey PRIMARY KEY (id);


--
-- Name: promotion_orders promotion_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotion_orders
    ADD CONSTRAINT promotion_orders_pkey PRIMARY KEY (id);


--
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (id);


--
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: volumns volumns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.volumns
    ADD CONSTRAINT volumns_pkey PRIMARY KEY (id);


--
-- Name: wishlists wishlists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_pkey PRIMARY KEY (id);


--
-- Name: carts_user_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX carts_user_id_key ON public.carts USING btree (user_id);


--
-- Name: payment_order_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payment_order_id_key ON public.payment USING btree (order_id);


--
-- Name: promotions_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX promotions_code_key ON public.promotions USING btree (code);


--
-- Name: roles_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);


--
-- Name: suppliers_address_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX suppliers_address_id_key ON public.suppliers USING btree (address_id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: addresses addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: option_resources option_resources_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.option_resources
    ADD CONSTRAINT option_resources_id_fkey FOREIGN KEY (id) REFERENCES public.options(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: option_resources option_resources_resourceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.option_resources
    ADD CONSTRAINT "option_resources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES public.resources(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: options options_volumeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT "options_volumeId_fkey" FOREIGN KEY ("volumeId") REFERENCES public.volumns(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment payment_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: product_resources product_resources_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_resources
    ADD CONSTRAINT "product_resources_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: product_resources product_resources_resourceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_resources
    ADD CONSTRAINT "product_resources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES public.resources(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: promotion_order_items promotion_order_items_order_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotion_order_items
    ADD CONSTRAINT promotion_order_items_order_item_id_fkey FOREIGN KEY (order_item_id) REFERENCES public.order_items(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: promotion_order_items promotion_order_items_promotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotion_order_items
    ADD CONSTRAINT promotion_order_items_promotion_id_fkey FOREIGN KEY (promotion_id) REFERENCES public.promotions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: promotion_orders promotion_orders_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotion_orders
    ADD CONSTRAINT promotion_orders_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: promotion_orders promotion_orders_promotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotion_orders
    ADD CONSTRAINT promotion_orders_promotion_id_fkey FOREIGN KEY (promotion_id) REFERENCES public.promotions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: suppliers suppliers_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: wishlists wishlists_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: wishlists wishlists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

