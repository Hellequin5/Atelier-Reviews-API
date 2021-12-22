--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

-- Started on 2021-12-21 21:32:31 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE reviews_api;
--
-- TOC entry 3002 (class 1262 OID 16389)
-- Name: reviews_api; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE reviews_api WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect reviews_api

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 25490)
-- Name: characteristics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.characteristics (
    characteristic_table_id integer NOT NULL,
    id integer NOT NULL,
    product_id integer NOT NULL,
    name character varying(30) NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 25488)
-- Name: characteristics_characteristic_table_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.characteristics_characteristic_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 208
-- Name: characteristics_characteristic_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.characteristics_characteristic_table_id_seq OWNED BY public.characteristics.characteristic_table_id;


--
-- TOC entry 205 (class 1259 OID 25218)
-- Name: characteristics_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.characteristics_reviews (
    characteristic_review_table_id integer NOT NULL,
    id integer NOT NULL,
    characteristic_id integer NOT NULL,
    review_id integer NOT NULL,
    value integer NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 25216)
-- Name: characteristics_reviews_characteristic_review_table_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.characteristics_reviews_characteristic_review_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 204
-- Name: characteristics_reviews_characteristic_review_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.characteristics_reviews_characteristic_review_table_id_seq OWNED BY public.characteristics_reviews.characteristic_review_table_id;


--
-- TOC entry 203 (class 1259 OID 25150)
-- Name: photos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.photos (
    photo_id integer NOT NULL,
    id integer NOT NULL,
    review_id integer NOT NULL,
    url text NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 25148)
-- Name: photos_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.photos_photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3005 (class 0 OID 0)
-- Dependencies: 202
-- Name: photos_photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.photos_photo_id_seq OWNED BY public.photos.photo_id;


--
-- TOC entry 207 (class 1259 OID 25456)
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    review_table_id integer NOT NULL,
    id integer NOT NULL,
    product_id integer NOT NULL,
    rating integer NOT NULL,
    date date DEFAULT CURRENT_DATE,
    summary character varying(255) NOT NULL,
    body character varying(1000) NOT NULL,
    recommend boolean DEFAULT false,
    reported boolean DEFAULT false,
    reviewer_name character varying(255) DEFAULT NULL::character varying,
    reviewer_email character varying(255) DEFAULT NULL::character varying,
    response character varying(1000) DEFAULT NULL::character varying,
    helpfulness integer DEFAULT 0
);


--
-- TOC entry 210 (class 1259 OID 42167)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.reviews ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 25454)
-- Name: reviews_review_table_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reviews_review_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 206
-- Name: reviews_review_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reviews_review_table_id_seq OWNED BY public.reviews.review_table_id;


--
-- TOC entry 2862 (class 2604 OID 25493)
-- Name: characteristics characteristic_table_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.characteristics ALTER COLUMN characteristic_table_id SET DEFAULT nextval('public.characteristics_characteristic_table_id_seq'::regclass);


--
-- TOC entry 2853 (class 2604 OID 25221)
-- Name: characteristics_reviews characteristic_review_table_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.characteristics_reviews ALTER COLUMN characteristic_review_table_id SET DEFAULT nextval('public.characteristics_reviews_characteristic_review_table_id_seq'::regclass);


--
-- TOC entry 2852 (class 2604 OID 25153)
-- Name: photos photo_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.photos ALTER COLUMN photo_id SET DEFAULT nextval('public.photos_photo_id_seq'::regclass);


--
-- TOC entry 2854 (class 2604 OID 25459)
-- Name: reviews review_table_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_table_id SET DEFAULT nextval('public.reviews_review_table_id_seq'::regclass);


--
-- TOC entry 2870 (class 2606 OID 25495)
-- Name: characteristics characteristics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.characteristics
    ADD CONSTRAINT characteristics_pkey PRIMARY KEY (characteristic_table_id);


--
-- TOC entry 2866 (class 2606 OID 25223)
-- Name: characteristics_reviews characteristics_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.characteristics_reviews
    ADD CONSTRAINT characteristics_reviews_pkey PRIMARY KEY (characteristic_review_table_id);


--
-- TOC entry 2864 (class 2606 OID 25158)
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (photo_id);


--
-- TOC entry 2868 (class 2606 OID 25471)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_table_id);


-- Completed on 2021-12-21 21:32:31 CST

--
-- PostgreSQL database dump complete
--

