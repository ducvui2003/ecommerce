--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg24.04+2)

-- Started on 2025-05-14 08:37:50 +07

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

DROP DATABASE IF EXISTS ecommerce;
--
-- TOC entry 3729 (class 1262 OID 16384)
-- Name: ecommerce; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE ecommerce OWNER TO root;

\connect ecommerce

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
-- TOC entry 5 (class 2615 OID 19434)
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO root;

--
-- TOC entry 908 (class 1247 OID 19458)
-- Name: CustomerStatus; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."CustomerStatus" AS ENUM (
    'PENDING',
    'RESOLVED',
    'REJECTED'
);


ALTER TYPE public."CustomerStatus" OWNER TO root;

--
-- TOC entry 911 (class 1247 OID 19466)
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'DELIVERING',
    'DELIVERED',
    'CANCELED',
    'COMPLETE'
);


ALTER TYPE public."OrderStatus" OWNER TO root;

--
-- TOC entry 914 (class 1247 OID 19480)
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'SUCCESS',
    'FAILED'
);


ALTER TYPE public."PaymentStatus" OWNER TO root;

--
-- TOC entry 902 (class 1247 OID 19445)
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."UserStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'BLOCKED'
);


ALTER TYPE public."UserStatus" OWNER TO root;

--
-- TOC entry 905 (class 1247 OID 19452)
-- Name: available_status; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public.available_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public.available_status OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 19435)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public._prisma_migrations OWNER TO root;

--
-- TOC entry 268 (class 1259 OID 19742)
-- Name: abouts; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.abouts OWNER TO root;

--
-- TOC entry 267 (class 1259 OID 19741)
-- Name: abouts_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.abouts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.abouts_id_seq OWNER TO root;

--
-- TOC entry 3731 (class 0 OID 0)
-- Dependencies: 267
-- Name: abouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.abouts_id_seq OWNED BY public.abouts.id;


--
-- TOC entry 223 (class 1259 OID 19512)
-- Name: addresses; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.addresses OWNER TO root;

--
-- TOC entry 222 (class 1259 OID 19511)
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_id_seq OWNER TO root;

--
-- TOC entry 3732 (class 0 OID 0)
-- Dependencies: 222
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- TOC entry 240 (class 1259 OID 19605)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.cart_items (
    id text NOT NULL,
    product_id integer NOT NULL,
    cart_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.cart_items OWNER TO root;

--
-- TOC entry 239 (class 1259 OID 19597)
-- Name: carts; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.carts OWNER TO root;

--
-- TOC entry 238 (class 1259 OID 19596)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO root;

--
-- TOC entry 3733 (class 0 OID 0)
-- Dependencies: 238
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 233 (class 1259 OID 19564)
-- Name: categories; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    status public.available_status DEFAULT 'INACTIVE'::public.available_status NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.categories OWNER TO root;

--
-- TOC entry 232 (class 1259 OID 19563)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO root;

--
-- TOC entry 3734 (class 0 OID 0)
-- Dependencies: 232
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 264 (class 1259 OID 19721)
-- Name: comments; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.comments OWNER TO root;

--
-- TOC entry 263 (class 1259 OID 19720)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO root;

--
-- TOC entry 3735 (class 0 OID 0)
-- Dependencies: 263
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 260 (class 1259 OID 19699)
-- Name: customer_services; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.customer_services OWNER TO root;

--
-- TOC entry 259 (class 1259 OID 19698)
-- Name: customer_services_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.customer_services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customer_services_id_seq OWNER TO root;

--
-- TOC entry 3736 (class 0 OID 0)
-- Dependencies: 259
-- Name: customer_services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.customer_services_id_seq OWNED BY public.customer_services.id;


--
-- TOC entry 270 (class 1259 OID 19753)
-- Name: faqs; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.faqs OWNER TO root;

--
-- TOC entry 269 (class 1259 OID 19752)
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faqs_id_seq OWNER TO root;

--
-- TOC entry 3737 (class 0 OID 0)
-- Dependencies: 269
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- TOC entry 262 (class 1259 OID 19710)
-- Name: notifications; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.notifications OWNER TO root;

--
-- TOC entry 261 (class 1259 OID 19709)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO root;

--
-- TOC entry 3738 (class 0 OID 0)
-- Dependencies: 261
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 237 (class 1259 OID 19591)
-- Name: option_resources; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.option_resources (
    id integer NOT NULL,
    "resourceId" integer NOT NULL
);


ALTER TABLE public.option_resources OWNER TO root;

--
-- TOC entry 231 (class 1259 OID 19553)
-- Name: options; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.options OWNER TO root;

--
-- TOC entry 230 (class 1259 OID 19552)
-- Name: options_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.options_id_seq OWNER TO root;

--
-- TOC entry 3739 (class 0 OID 0)
-- Dependencies: 230
-- Name: options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.options_id_seq OWNED BY public.options.id;


--
-- TOC entry 244 (class 1259 OID 19625)
-- Name: order_items; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(65,30) NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.order_items OWNER TO root;

--
-- TOC entry 243 (class 1259 OID 19624)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO root;

--
-- TOC entry 3740 (class 0 OID 0)
-- Dependencies: 243
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 242 (class 1259 OID 19614)
-- Name: orders; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.orders OWNER TO root;

--
-- TOC entry 241 (class 1259 OID 19613)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO root;

--
-- TOC entry 3741 (class 0 OID 0)
-- Dependencies: 241
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 246 (class 1259 OID 19633)
-- Name: payment; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.payment (
    id integer NOT NULL,
    order_id integer NOT NULL,
    status public."PaymentStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.payment OWNER TO root;

--
-- TOC entry 245 (class 1259 OID 19632)
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_id_seq OWNER TO root;

--
-- TOC entry 3742 (class 0 OID 0)
-- Dependencies: 245
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- TOC entry 248 (class 1259 OID 19641)
-- Name: payment_transaction; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.payment_transaction OWNER TO root;

--
-- TOC entry 247 (class 1259 OID 19640)
-- Name: payment_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.payment_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_transaction_id_seq OWNER TO root;

--
-- TOC entry 3743 (class 0 OID 0)
-- Dependencies: 247
-- Name: payment_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.payment_transaction_id_seq OWNED BY public.payment_transaction.id;


--
-- TOC entry 266 (class 1259 OID 19731)
-- Name: policies; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.policies OWNER TO root;

--
-- TOC entry 265 (class 1259 OID 19730)
-- Name: policies_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.policies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.policies_id_seq OWNER TO root;

--
-- TOC entry 3744 (class 0 OID 0)
-- Dependencies: 265
-- Name: policies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.policies_id_seq OWNED BY public.policies.id;


--
-- TOC entry 236 (class 1259 OID 19585)
-- Name: product_resources; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.product_resources (
    "productId" integer NOT NULL,
    "resourceId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.product_resources OWNER TO root;

--
-- TOC entry 227 (class 1259 OID 19533)
-- Name: products; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.products OWNER TO root;

--
-- TOC entry 226 (class 1259 OID 19532)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO root;

--
-- TOC entry 3745 (class 0 OID 0)
-- Dependencies: 226
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 254 (class 1259 OID 19673)
-- Name: promotion_order_items; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.promotion_order_items (
    id integer NOT NULL,
    promotion_id integer NOT NULL,
    order_item_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.promotion_order_items OWNER TO root;

--
-- TOC entry 253 (class 1259 OID 19672)
-- Name: promotion_order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.promotion_order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promotion_order_items_id_seq OWNER TO root;

--
-- TOC entry 3746 (class 0 OID 0)
-- Dependencies: 253
-- Name: promotion_order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.promotion_order_items_id_seq OWNED BY public.promotion_order_items.id;


--
-- TOC entry 252 (class 1259 OID 19665)
-- Name: promotion_orders; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.promotion_orders (
    id integer NOT NULL,
    promotion_id integer NOT NULL,
    order_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.promotion_orders OWNER TO root;

--
-- TOC entry 251 (class 1259 OID 19664)
-- Name: promotion_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.promotion_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promotion_orders_id_seq OWNER TO root;

--
-- TOC entry 3747 (class 0 OID 0)
-- Dependencies: 251
-- Name: promotion_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.promotion_orders_id_seq OWNED BY public.promotion_orders.id;


--
-- TOC entry 250 (class 1259 OID 19654)
-- Name: promotions; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.promotions OWNER TO root;

--
-- TOC entry 249 (class 1259 OID 19653)
-- Name: promotions_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.promotions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promotions_id_seq OWNER TO root;

--
-- TOC entry 3748 (class 0 OID 0)
-- Dependencies: 249
-- Name: promotions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.promotions_id_seq OWNED BY public.promotions.id;


--
-- TOC entry 235 (class 1259 OID 19575)
-- Name: resources; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.resources OWNER TO root;

--
-- TOC entry 234 (class 1259 OID 19574)
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resources_id_seq OWNER TO root;

--
-- TOC entry 3749 (class 0 OID 0)
-- Dependencies: 234
-- Name: resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;


--
-- TOC entry 256 (class 1259 OID 19681)
-- Name: reviews; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.reviews OWNER TO root;

--
-- TOC entry 255 (class 1259 OID 19680)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO root;

--
-- TOC entry 3750 (class 0 OID 0)
-- Dependencies: 255
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 221 (class 1259 OID 19502)
-- Name: roles; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public.roles OWNER TO root;

--
-- TOC entry 220 (class 1259 OID 19501)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO root;

--
-- TOC entry 3751 (class 0 OID 0)
-- Dependencies: 220
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 225 (class 1259 OID 19522)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.suppliers OWNER TO root;

--
-- TOC entry 224 (class 1259 OID 19521)
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_id_seq OWNER TO root;

--
-- TOC entry 3752 (class 0 OID 0)
-- Dependencies: 224
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- TOC entry 219 (class 1259 OID 19488)
-- Name: users; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.users OWNER TO root;

--
-- TOC entry 218 (class 1259 OID 19487)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO root;

--
-- TOC entry 3753 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 229 (class 1259 OID 19543)
-- Name: volumns; Type: TABLE; Schema: public; Owner: root
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


ALTER TABLE public.volumns OWNER TO root;

--
-- TOC entry 228 (class 1259 OID 19542)
-- Name: volumns_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.volumns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.volumns_id_seq OWNER TO root;

--
-- TOC entry 3754 (class 0 OID 0)
-- Dependencies: 228
-- Name: volumns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.volumns_id_seq OWNED BY public.volumns.id;


--
-- TOC entry 258 (class 1259 OID 19691)
-- Name: wishlists; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.wishlists (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.wishlists OWNER TO root;

--
-- TOC entry 257 (class 1259 OID 19690)
-- Name: wishlists_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.wishlists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wishlists_id_seq OWNER TO root;

--
-- TOC entry 3755 (class 0 OID 0)
-- Dependencies: 257
-- Name: wishlists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.wishlists_id_seq OWNED BY public.wishlists.id;


--
-- TOC entry 3428 (class 2604 OID 19745)
-- Name: abouts id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.abouts ALTER COLUMN id SET DEFAULT nextval('public.abouts_id_seq'::regclass);


--
-- TOC entry 3371 (class 2604 OID 19515)
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- TOC entry 3390 (class 2604 OID 19600)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 3383 (class 2604 OID 19567)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3423 (class 2604 OID 19724)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 3417 (class 2604 OID 19702)
-- Name: customer_services id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customer_services ALTER COLUMN id SET DEFAULT nextval('public.customer_services_id_seq'::regclass);


--
-- TOC entry 3431 (class 2604 OID 19756)
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- TOC entry 3420 (class 2604 OID 19713)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 3380 (class 2604 OID 19556)
-- Name: options id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.options ALTER COLUMN id SET DEFAULT nextval('public.options_id_seq'::regclass);


--
-- TOC entry 3397 (class 2604 OID 19628)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 3394 (class 2604 OID 19617)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3399 (class 2604 OID 19636)
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- TOC entry 3401 (class 2604 OID 19644)
-- Name: payment_transaction id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.payment_transaction ALTER COLUMN id SET DEFAULT nextval('public.payment_transaction_id_seq'::regclass);


--
-- TOC entry 3425 (class 2604 OID 19734)
-- Name: policies id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.policies ALTER COLUMN id SET DEFAULT nextval('public.policies_id_seq'::regclass);


--
-- TOC entry 3376 (class 2604 OID 19536)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3411 (class 2604 OID 19676)
-- Name: promotion_order_items id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotion_order_items ALTER COLUMN id SET DEFAULT nextval('public.promotion_order_items_id_seq'::regclass);


--
-- TOC entry 3409 (class 2604 OID 19668)
-- Name: promotion_orders id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotion_orders ALTER COLUMN id SET DEFAULT nextval('public.promotion_orders_id_seq'::regclass);


--
-- TOC entry 3406 (class 2604 OID 19657)
-- Name: promotions id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotions ALTER COLUMN id SET DEFAULT nextval('public.promotions_id_seq'::regclass);


--
-- TOC entry 3386 (class 2604 OID 19578)
-- Name: resources id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);


--
-- TOC entry 3413 (class 2604 OID 19684)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 3369 (class 2604 OID 19505)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3373 (class 2604 OID 19525)
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- TOC entry 3363 (class 2604 OID 19491)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3378 (class 2604 OID 19546)
-- Name: volumns id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.volumns ALTER COLUMN id SET DEFAULT nextval('public.volumns_id_seq'::regclass);


--
-- TOC entry 3415 (class 2604 OID 19694)
-- Name: wishlists id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.wishlists ALTER COLUMN id SET DEFAULT nextval('public.wishlists_id_seq'::regclass);


--
-- TOC entry 3670 (class 0 OID 19435)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public._prisma_migrations VALUES ('34ea52a7-98da-426b-9b9f-d9dfeb83eaa2', 'df03d2a45935cf825cfb62c2e99791b53ada24825319d6bb2a3b54b8cc611f02', '2025-05-14 01:27:24.800155+00', '20250501102044_init_database', NULL, NULL, '2025-05-14 01:27:24.731562+00', 1) ON CONFLICT DO NOTHING;


--
-- TOC entry 3721 (class 0 OID 19742)
-- Dependencies: 268
-- Data for Name: abouts; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3676 (class 0 OID 19512)
-- Dependencies: 223
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.addresses VALUES (4, '12 Nguyễn Huệ', 'Phường Bến Nghé', 'Quận 1', 'Hồ Chí Minh', 1, '2025-04-27 04:06:30.566', '2025-04-27 04:06:30.566', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.addresses VALUES (5, '35 Xuân Thủy', 'Phường Thảo Điền', 'Quận 2', 'Hồ Chí Minh', 1, '2025-04-27 04:06:30.566', '2025-04-27 04:06:30.566', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.addresses VALUES (6, '102 Hai Bà Trưng', 'Phường Tân Định', 'Quận 1', 'Hồ Chí Minh', 1, '2025-04-27 04:06:30.566', '2025-04-27 04:06:30.566', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.addresses VALUES (7, '45 Bạch Đằng', 'Phường 2', 'Quận Tân Bình', 'Hồ Chí Minh', 1, '2025-04-27 04:11:13.111', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.addresses VALUES (8, '65 Phan Bội Châu', 'Phường 4', 'Quận Tân Phú', 'Hồ Chí Minh', 1, '2025-04-27 04:13:42.397', NULL, NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3693 (class 0 OID 19605)
-- Dependencies: 240
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3692 (class 0 OID 19597)
-- Dependencies: 239
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3686 (class 0 OID 19564)
-- Dependencies: 233
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.categories VALUES (1, 'Tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.categories VALUES (2, 'Lọ đựng tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.categories VALUES (3, 'Máy xông tinh dầu', 'ACTIVE', '2025-04-27 04:17:47.076', '2025-04-27 04:17:47.076', NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3717 (class 0 OID 19721)
-- Dependencies: 264
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3713 (class 0 OID 19699)
-- Dependencies: 260
-- Data for Name: customer_services; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3723 (class 0 OID 19753)
-- Dependencies: 270
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3715 (class 0 OID 19710)
-- Dependencies: 262
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3690 (class 0 OID 19591)
-- Dependencies: 237
-- Data for Name: option_resources; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3684 (class 0 OID 19553)
-- Dependencies: 231
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3697 (class 0 OID 19625)
-- Dependencies: 244
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3695 (class 0 OID 19614)
-- Dependencies: 242
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3699 (class 0 OID 19633)
-- Dependencies: 246
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3701 (class 0 OID 19641)
-- Dependencies: 248
-- Data for Name: payment_transaction; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3719 (class 0 OID 19731)
-- Dependencies: 266
-- Data for Name: policies; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3689 (class 0 OID 19585)
-- Dependencies: 236
-- Data for Name: product_resources; Type: TABLE DATA; Schema: public; Owner: root
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


--
-- TOC entry 3680 (class 0 OID 19533)
-- Dependencies: 227
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.products VALUES (10, 'Máy xông tinh dầu', 'Máy xông tinh dầu 100ml', 1200000, 1100000, 3, 13, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (2, 'Tinh dầu Lavender', 'Tinh dầu Lavender nguyên chất', 500000, 450000, 1, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (8, 'Tinh dầu Orange', 'Tinh dầu cam tự nhiên', 400000, 350000, 1, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (6, 'Tinh dầu Lemongrass', 'Tinh dầu sả chanh', 350000, 320000, 1, 13, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (4, 'Tinh dầu Eucalyptus', 'Tinh dầu Eucalyptus thư giãn', 450000, 400000, 1, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (11, 'Lọ đựng tinh dầu 20ml', 'Lọ đựng tinh dầu 20ml thủy tinh', 150000, 140000, 2, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (9, 'Lọ đựng tinh dầu 10ml', 'Lọ đựng tinh dầu 10ml bằng thủy tinh', 100000, 90000, 2, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (3, 'Tinh dầu Peppermint', 'Tinh dầu Peppermint tự nhiên', 600000, 550000, 1, 11, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (7, 'Tinh dầu Tea Tree', 'Tinh dầu tràm trà', 550000, 500000, 1, 13, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (5, 'Tinh dầu Rose', 'Tinh dầu hoa hồng', 700000, 650000, 1, 12, '2025-04-27 04:23:32.889', '2025-04-27 04:23:32.889', NULL) ON CONFLICT DO NOTHING;
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

- Dòng Sản Phẩm có Nhiều Dung Tích :  5ml, 10ml, 15ml , 20ml, 30ml, 50ml, 100ml', 5000, 5000, 2, 11, '2025-05-11 10:52:08', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (12, 'Máy xông tinh dầu LORITA DK-BL02', 'Máy xông, máy khuếch tán tinh dầu LORITA DK-BL01 là dòng máy xông siêu âm với thiết kế Hình Trụ dài hoạ tiết bông lúa vân gỗ phù hợp với nhiều không gian, có tông màu nhẹ nhàng, thanh lịch.
Thường được đặt trên bàn, phòng khách, kệ tủ đầu giường,… tạo điểm nhấn trong thiết kế nội thất', 100000, 100000, 3, 11, '2025-05-11 05:35:50.738', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (13, 'Máy xông tinh dầu LORITA KDK-TT3D', 'Máy xông, máy khuếch tán tinh dầu LORITA KDK-TT3D  là dòng máy xông siêu âm với thiết kế hình Lọ hoa với đèn màu 3D và chất liệu thủy tinh, phù hợp với nhiều không gian.
Thường được đặt trên kệ tủ, bàn khách, bàn ăn,… đem đến cảm giác sang trọng, tạo điểm nhấn.', 650000, 650000, 3, 13, '2025-05-11 05:38:57.285', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (15, 'Tinh Dầu Trà Trắng (White Tea Essential Oil) Heny Garden', 'Tinh dầu White Tea hay còn gọi là tinh dầu trà trắng là một trong những “gương mặt” nổi bật trong thời gian gần đây bởi hương thơm thuần khiết và khả năng tuyệt vời mà nó mang lại.

Cùng Heny Garden khám phá một số công dụng cũng như nhiều cách sử dụng hay ho của loại tinh dầu này nhé. ', 119000, 119000, 1, 16, '2025-05-11 05:48:40.135', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (18, 'Tinh Dầu Vani (Sweet Vanilla Essential Oil) Heny Garden', 'Tinh dầu Vani đã xuất hiện từ rất lâu và được sử dụng phổ biến trên thế giới. Không chỉ là nguyên liệu phổ biến trong công thức làm bánh', 119000, 89000, 1, 12, '2025-05-11 13:03:03', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (19, 'Tinh Dầu Cà Phê (Coffee Essential Oil) Heny Garden', 'Tinh dầu Cà Phê khi được khuếch tán vào trong không khí sẽ khiến hương thơm nồng nàn ấm áp lan tỏa khắp ngôi nhà bạn', 119000, 89000, 1, 12, '2025-05-11 13:06:12', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (20, 'Tinh Dầu Gỗ Thông (Pine Essential Oil) Heny Garden', 'Tinh dầu Thông từ lâu đã gắn liền với đời sống con người, nhờ các lợi ích mà nó mang lại trong đời sống và sức khỏe. Ngày nay để thuận tiện hơn cho việc khai thác các lợi ích sức khỏe mà cây Thông mang lại, tinh dầu Thông đã được chiết xuất để được sử dụng rộng rãi hơn.  Tinh dầu Thông đã trở thành một hương thơm phổ biến trong mỹ phẩm, đồ vệ sinh cá nhân, xà phòng và chất tẩy rửa. Bài viết sản phẩm này nêu bật các lợi ích, đặc tính và cách sử dụng an toàn khác của Tinh dầu Thông.', 99000, 69000, 1, 12, '2025-05-11 13:09:23', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (21, 'Tinh Dầu Hương Thảo (Rosemary Essential Oil) Heny Garden', 'Hương Thảo được biết đến chủ yếu như 1 loại nguyên liệu ẩm thực, nhưng gần đây Tinh Dầu Hương Thảo lại được đánh giá cao về hương thơm đặc trưng cùng những lợi ích trong y học. Cùng Heny tìm hiểu các công dụng và lợi ich của cây Hương Thảo mang lại nhé.', 109000, 79000, 1, 12, '2025-05-11 13:11:51', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (22, 'Tinh Dầu Thơm Phối Hương Aquamarine (Viên Ngọc Của Đại Dương) Heny Garden', 'Tinh dầu thơm phối hương Aquamarine lấy cảm hứng từ hơi thở của vùng biển lộng gió Windansea tại San Diego', 189000, 149000, 1, 12, '2025-05-11 13:14:59', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (23, 'Tinh Dầu Đàn Hương (Sandalwood Essential Oil) Heny Garden', 'Tinh dầu Đàn Hương được chiết xuất từ một loại cây rất có giá trị, có mùi hương cổ điển và là thành phần được tìm thấy trong nhiều loại nước hoa.  Giá trị mà tinh dầu gỗ Đàn hương mang lại không chỉ là hương thơm, mà còn nhiều lợi ích khác cho sức khỏe: điều trị mất ngủ, cân bằng cảm xúc và tâm trạng, làm lành vết thương,...', 229000, 189000, 1, 12, '2025-05-11 13:17:55', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (24, 'Tinh Dầu Thơm Phối Hương Black Ocean (Đại Dương Đen) Heny Garden', 'Tinh dầu thơm phối hương Black Ocean không miêu tả năng lượng sảng khoái và tràn đầy tinh thần như những tay lướt sóng cừ khôi trên vùng biển lộng gió Windansea', 179000, 149000, 1, 12, '2025-05-11 13:25:21', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (17, 'Tinh Dầu Phối Hương Tropical Paradise (Thiên Đường Nhiệt Đới) Xông Thơm Phòng HENY GARDEN', 'Tinh dầu phối hương Tropical Paradise (Thiên Đường Nhiệt Đới) đem đến một mùi hương giống như gió mang theo hương thơm của dừa và các loài hoa tươi. Bạn sẽ cảm nhận được sự dịu mát và tươi mới, như là một cuộc phiêu lưu vào một thiên đường nhiệt đới.', 179000, 149000, 1, 12, '2025-05-11 05:59:23.039', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (14, 'Tinh Dầu Phối Hương Yummy Kiwi (Kiwi Hảo Hạng) Xông Thơm Phòng HENY GARDEN', '- Tinh dầu thơm phối hương Yummy Kiwi (Kiwi Hảo Hạng)

- Mùi hương là sự phối hợp giữa các tầng Top/Mid/Base note (hương Đầu/ Giữa/ Cuối) tạo nên sự độc đáo và lưu luyến hơn so với tinh dầu đơn hương.

- Nốt hương chính: Kiwi, Sữa dừa, Xoài chín

- Nốt hương bổ trợ: Chanh dây, Hoa ly, Hoa cam, Hổ phách, Dưa lưới

- Dung tích: 10mL

- Thương hiệu: Heny Garden

- Thời hạn sử dụng: 2 năm

- Heny Garden bảo chứng chất lượng sản phẩm với đánh giá 5 sao.', 179000, 149000, 1, 15, '2025-05-11 05:42:52.348', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (16, 'Tinh Dầu Hoa Nhài (Elegant Jasmine Essential Oil) Heny Garden', 'Tinh dầu Hoa Nhài (tinh dầu hoa Lài) được chiết xuất từ những đóa hoa nhài trắng muốt - một loài hoa chỉ nở vào ban đêm. Hoa lài được yêu thích nhờ vào hương thơm lãng mạn', 179000, 149000, 1, 12, '2025-05-11 05:53:05.428', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (25, 'Tinh Dầu Sả Hoa Hồng (Palmarosa Essential Oil) Heny Garden', 'Tinh dầu Sả Hoa Hồng đã được sử dụng ngàn năm trong lĩnh vực Y học tại Trung Quốc và Ấn Độ. Ngày nay', 99000, 69000, 1, 12, '2025-05-11 13:28:28', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (26, 'Tinh Dầu Quế (Cinnamon Essential Oil) Heny Garden', 'Tinh dầu Quế cay nồng, ngọt ngào, quen thuộc với nhiều người vì quế là nguyên liệu phổ biến trong ẩm thực. Dầu quế được đánh giá cao vì hương thơm tươi mới và những lợi ích về sức khỏe và sắc đẹp mà nó mang lại nhờ những khả năng kháng khuẩn, chống nấm, chống oxy hoá.
Nhưng nhiều người vẫn còn băn khoăn rằng tinh dầu Quế có tốt hay không? Vậy hãy cùng Heny tìm hiểu các lợi ích mà tinh dầu Quế mang lại và giải đáp thắc mắc trên nhé. ', 99000, 69000, 1, 12, '2025-05-11 13:31:54', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (27, 'Tinh Dầu Ngọc Lan Tây (Ylang Ylang Essential Oil) Heny Garden', 'Tinh dầu Ngọc Lan Tây (Ylang Ylang essential oil) với hương quyến rũ, nữ tính và lãng mạn, hoa Ngọc Lan Tây thường được sử dụng làm nước hoa, liệu pháp điều trị tâm lý và chăm sóc da tóc. 
Nếu là một người yêu thích hương thơm, nhất là nước hoa, chắc hẳn bạn đã từng thấy sự xuất hiện của Hoa Ngọc Lan Tây trong thành phần, điển hình như nước hoa Chanel No5', 149000, 119000, 1, 12, '2025-05-11 13:34:58', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (28, 'Tinh Dầu Hoàng Đàn - Tuyết Tùng (Cedarwood Essential Oil) Heny Garden', 'Tinh dầu Hoàng Đàn (tinh dầu gỗ Tuyết Tùng) có hương gỗ ngọt nồng ấm, dễ chịu, tạo hương thơm thư giãn, dịu êm khi được khuếch tán. Tinh dầu Cedarwood là một thành phần bổ sung tuyệt vời cho các sản phẩm chăm sóc da và tóc, còn được tìm thấy trong nước hoa, chống côn trùng và khử mùi.', 139000, 99000, 1, 12, '2025-05-11 13:37:37', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (29, 'Tinh Dầu Thơm Phối Hương The Stars (Vì Sao Trên Trời) Heny Garden', 'Tinh dầu thơm phối hương The Stars tái hiện khoảnh khắc đứng giữa bầu trời trong một đêm lộng gió tại căn hộ penthouse tọa lạc tại quận 7 năm ngoái. Vào cái buổi đêm ấy, tiết trời se lạnh, đầy sao và im lặng đến lạ. Khác biệt với vòng xoay kèm sự náo nhiệt, ồn ào của một ngày dài; Dường như lúc này vạn vật đều nín thở vì sợ làm tan vỡ bầu không khí yên tĩnh.', 189000, 149000, 1, 12, '2025-05-11 13:39:54', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.products VALUES (30, 'Tinh Dầu Thơm Phối Hương Christmas Spirit (Giáng Sinh Rộn Ràng) Heny Garden', 'Tinh dầu thơm phối hương Christmas Spirit đem đến không khí một ngày lễ Giáng Sinh quây quần thưởng thức một bữa tối ấm cúng và trao quà vào lúc nửa đêm tại hầu hết các quốc gia Châu Âu. Người ta thường nhớ đến hương vị ngọt ấm của món tráng miệng bánh táo quế trong bữa tối đêm Giáng Sinh. Nhớ đến khoảnh khắc hồi hộp trao quà bên cạnh chiếc lò sưởi, hòa với hương thơm mát lạnh từ cây Thông lấp lánh ánh đèn. Nhớ đến mùi hương đặc trưng như Christmas Spirit.', 189000, 149000, 1, 12, '2025-05-11 13:41:55', NULL, NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3707 (class 0 OID 19673)
-- Dependencies: 254
-- Data for Name: promotion_order_items; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3705 (class 0 OID 19665)
-- Dependencies: 252
-- Data for Name: promotion_orders; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3703 (class 0 OID 19654)
-- Dependencies: 250
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3688 (class 0 OID 19575)
-- Dependencies: 235
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: root
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


--
-- TOC entry 3709 (class 0 OID 19681)
-- Dependencies: 256
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3674 (class 0 OID 19502)
-- Dependencies: 221
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.roles VALUES (1, 'ADMIN', '2025-05-14 01:35:14.722', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.roles VALUES (2, 'USER', '2025-05-14 01:35:14.722', NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3678 (class 0 OID 19522)
-- Dependencies: 225
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.suppliers VALUES (11, 'Jade Bloom', 'contact@jadebloom.vn', '0909123456', 'Vietnam', 'https://www.jadebloom.com', 'ACTIVE', 4, '2025-04-27 04:07:50.683', '2025-04-27 04:07:50.683', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.suppliers VALUES (12, 'doTERRA', 'contact@doterra.vn', '0911123456', 'Vietnam', 'https://www.doterra.com', 'ACTIVE', 5, '2025-04-27 04:07:50.683', '2025-04-27 04:07:50.683', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.suppliers VALUES (13, 'Edens Garden', 'contact@edensgarden.vn', '0988123456', 'Vietnam', 'https://www.edensgarden.com', 'ACTIVE', 6, '2025-04-27 04:07:50.683', '2025-04-27 04:07:50.683', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.suppliers VALUES (15, 'Young Living', 'contact@youngliving.vn', '0985635273', 'America', 'https://www.youngliving.com', 'ACTIVE', 7, '2025-04-27 04:11:26.836', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.suppliers VALUES (16, 'Rocky Mountain Oils', 'contact@rockymountainoils.vn', '0963647462', 'Franch', 'https://www.rockymountainoils.com', 'ACTIVE', 8, '2025-04-27 04:13:49.383', NULL, NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3672 (class 0 OID 19488)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.users VALUES (1, 'ducvui2003@gmail.com', 'admin', '$argon2id$v=19$m=65536,t=3,p=4$RGUnK8MzXKquPL0ADTNQCg$1pUa7Rx9w67LZvpzkvbUd9L8IuELTgJ1BzvxN7F6iDM', '', '', 'INACTIVE', NULL, 1, '2025-05-14 01:35:14.722', NULL, NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3682 (class 0 OID 19543)
-- Dependencies: 229
-- Data for Name: volumns; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3711 (class 0 OID 19691)
-- Dependencies: 258
-- Data for Name: wishlists; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 3756 (class 0 OID 0)
-- Dependencies: 267
-- Name: abouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.abouts_id_seq', 1, false);


--
-- TOC entry 3757 (class 0 OID 0)
-- Dependencies: 222
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.addresses_id_seq', 1, false);


--
-- TOC entry 3758 (class 0 OID 0)
-- Dependencies: 238
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- TOC entry 3759 (class 0 OID 0)
-- Dependencies: 232
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- TOC entry 3760 (class 0 OID 0)
-- Dependencies: 263
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- TOC entry 3761 (class 0 OID 0)
-- Dependencies: 259
-- Name: customer_services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.customer_services_id_seq', 1, false);


--
-- TOC entry 3762 (class 0 OID 0)
-- Dependencies: 269
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.faqs_id_seq', 1, false);


--
-- TOC entry 3763 (class 0 OID 0)
-- Dependencies: 261
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- TOC entry 3764 (class 0 OID 0)
-- Dependencies: 230
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.options_id_seq', 1, false);


--
-- TOC entry 3765 (class 0 OID 0)
-- Dependencies: 243
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- TOC entry 3766 (class 0 OID 0)
-- Dependencies: 241
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 3767 (class 0 OID 0)
-- Dependencies: 245
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.payment_id_seq', 1, false);


--
-- TOC entry 3768 (class 0 OID 0)
-- Dependencies: 247
-- Name: payment_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.payment_transaction_id_seq', 1, false);


--
-- TOC entry 3769 (class 0 OID 0)
-- Dependencies: 265
-- Name: policies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.policies_id_seq', 1, false);


--
-- TOC entry 3770 (class 0 OID 0)
-- Dependencies: 226
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- TOC entry 3771 (class 0 OID 0)
-- Dependencies: 253
-- Name: promotion_order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.promotion_order_items_id_seq', 1, false);


--
-- TOC entry 3772 (class 0 OID 0)
-- Dependencies: 251
-- Name: promotion_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.promotion_orders_id_seq', 1, false);


--
-- TOC entry 3773 (class 0 OID 0)
-- Dependencies: 249
-- Name: promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.promotions_id_seq', 1, false);


--
-- TOC entry 3774 (class 0 OID 0)
-- Dependencies: 234
-- Name: resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.resources_id_seq', 1, false);


--
-- TOC entry 3775 (class 0 OID 0)
-- Dependencies: 255
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 3776 (class 0 OID 0)
-- Dependencies: 220
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 3777 (class 0 OID 0)
-- Dependencies: 224
-- Name: suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.suppliers_id_seq', 1, false);


--
-- TOC entry 3778 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 3779 (class 0 OID 0)
-- Dependencies: 228
-- Name: volumns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.volumns_id_seq', 1, false);


--
-- TOC entry 3780 (class 0 OID 0)
-- Dependencies: 257
-- Name: wishlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.wishlists_id_seq', 1, false);


--
-- TOC entry 3435 (class 2606 OID 19443)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3495 (class 2606 OID 19751)
-- Name: abouts abouts_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.abouts
    ADD CONSTRAINT abouts_pkey PRIMARY KEY (id);


--
-- TOC entry 3443 (class 2606 OID 19520)
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- TOC entry 3465 (class 2606 OID 19612)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3462 (class 2606 OID 19604)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 3454 (class 2606 OID 19573)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3491 (class 2606 OID 19729)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3487 (class 2606 OID 19708)
-- Name: customer_services customer_services_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customer_services
    ADD CONSTRAINT customer_services_pkey PRIMARY KEY (id);


--
-- TOC entry 3497 (class 2606 OID 19762)
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- TOC entry 3489 (class 2606 OID 19719)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 3460 (class 2606 OID 19595)
-- Name: option_resources option_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.option_resources
    ADD CONSTRAINT option_resources_pkey PRIMARY KEY (id);


--
-- TOC entry 3452 (class 2606 OID 19562)
-- Name: options options_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);


--
-- TOC entry 3469 (class 2606 OID 19631)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3467 (class 2606 OID 19623)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3472 (class 2606 OID 19639)
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- TOC entry 3474 (class 2606 OID 19652)
-- Name: payment_transaction payment_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.payment_transaction
    ADD CONSTRAINT payment_transaction_pkey PRIMARY KEY (id);


--
-- TOC entry 3493 (class 2606 OID 19740)
-- Name: policies policies_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.policies
    ADD CONSTRAINT policies_pkey PRIMARY KEY (id);


--
-- TOC entry 3458 (class 2606 OID 19590)
-- Name: product_resources product_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product_resources
    ADD CONSTRAINT product_resources_pkey PRIMARY KEY ("productId", "resourceId");


--
-- TOC entry 3448 (class 2606 OID 19541)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3481 (class 2606 OID 19679)
-- Name: promotion_order_items promotion_order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotion_order_items
    ADD CONSTRAINT promotion_order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3479 (class 2606 OID 19671)
-- Name: promotion_orders promotion_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotion_orders
    ADD CONSTRAINT promotion_orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3477 (class 2606 OID 19663)
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (id);


--
-- TOC entry 3456 (class 2606 OID 19584)
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- TOC entry 3483 (class 2606 OID 19689)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 3441 (class 2606 OID 19510)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3446 (class 2606 OID 19531)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- TOC entry 3438 (class 2606 OID 19500)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3450 (class 2606 OID 19551)
-- Name: volumns volumns_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.volumns
    ADD CONSTRAINT volumns_pkey PRIMARY KEY (id);


--
-- TOC entry 3485 (class 2606 OID 19697)
-- Name: wishlists wishlists_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_pkey PRIMARY KEY (id);


--
-- TOC entry 3463 (class 1259 OID 19766)
-- Name: carts_user_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX carts_user_id_key ON public.carts USING btree (user_id);


--
-- TOC entry 3470 (class 1259 OID 19767)
-- Name: payment_order_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX payment_order_id_key ON public.payment USING btree (order_id);


--
-- TOC entry 3475 (class 1259 OID 19768)
-- Name: promotions_code_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX promotions_code_key ON public.promotions USING btree (code);


--
-- TOC entry 3439 (class 1259 OID 19764)
-- Name: roles_name_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);


--
-- TOC entry 3444 (class 1259 OID 19765)
-- Name: suppliers_address_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX suppliers_address_id_key ON public.suppliers USING btree (address_id);


--
-- TOC entry 3436 (class 1259 OID 19763)
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- TOC entry 3499 (class 2606 OID 19774)
-- Name: addresses addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3509 (class 2606 OID 19829)
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3510 (class 2606 OID 19824)
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3508 (class 2606 OID 19819)
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3523 (class 2606 OID 19899)
-- Name: comments comments_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3524 (class 2606 OID 19894)
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3506 (class 2606 OID 19809)
-- Name: option_resources option_resources_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.option_resources
    ADD CONSTRAINT option_resources_id_fkey FOREIGN KEY (id) REFERENCES public.options(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3507 (class 2606 OID 19814)
-- Name: option_resources option_resources_resourceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.option_resources
    ADD CONSTRAINT "option_resources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES public.resources(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3503 (class 2606 OID 19794)
-- Name: options options_volumeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT "options_volumeId_fkey" FOREIGN KEY ("volumeId") REFERENCES public.volumns(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3512 (class 2606 OID 19839)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3513 (class 2606 OID 19844)
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3511 (class 2606 OID 19834)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3514 (class 2606 OID 19849)
-- Name: payment payment_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3504 (class 2606 OID 19799)
-- Name: product_resources product_resources_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product_resources
    ADD CONSTRAINT "product_resources_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3505 (class 2606 OID 19804)
-- Name: product_resources product_resources_resourceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.product_resources
    ADD CONSTRAINT "product_resources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES public.resources(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3501 (class 2606 OID 19784)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3502 (class 2606 OID 19789)
-- Name: products products_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3517 (class 2606 OID 19869)
-- Name: promotion_order_items promotion_order_items_order_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotion_order_items
    ADD CONSTRAINT promotion_order_items_order_item_id_fkey FOREIGN KEY (order_item_id) REFERENCES public.order_items(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3518 (class 2606 OID 19864)
-- Name: promotion_order_items promotion_order_items_promotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotion_order_items
    ADD CONSTRAINT promotion_order_items_promotion_id_fkey FOREIGN KEY (promotion_id) REFERENCES public.promotions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3515 (class 2606 OID 19859)
-- Name: promotion_orders promotion_orders_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotion_orders
    ADD CONSTRAINT promotion_orders_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3516 (class 2606 OID 19854)
-- Name: promotion_orders promotion_orders_promotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.promotion_orders
    ADD CONSTRAINT promotion_orders_promotion_id_fkey FOREIGN KEY (promotion_id) REFERENCES public.promotions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3519 (class 2606 OID 19879)
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3520 (class 2606 OID 19874)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3500 (class 2606 OID 19779)
-- Name: suppliers suppliers_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3498 (class 2606 OID 19769)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3521 (class 2606 OID 19889)
-- Name: wishlists wishlists_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3522 (class 2606 OID 19884)
-- Name: wishlists wishlists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3730 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-05-14 08:37:50 +07

--
-- PostgreSQL database dump complete
--

