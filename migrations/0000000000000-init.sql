--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2024-07-07 17:04:00 WIB

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

--
-- TOC entry 3607 (class 1262 OID 16485)
-- Name: db_undian; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE db_undian WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE db_undian OWNER TO postgres;

\connect db_undian

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16497)
-- Name: tb_hadiah; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_hadiah (
    id integer NOT NULL,
    hadiah character varying(100) NOT NULL,
    qty integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.tb_hadiah OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16489)
-- Name: tb_hadiah_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_hadiah_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_hadiah_id_seq OWNER TO postgres;

--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 211
-- Name: tb_hadiah_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_hadiah_id_seq OWNED BY public.tb_hadiah.id;


--
-- TOC entry 209 (class 1259 OID 16486)
-- Name: tb_karyawan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_karyawan (
    nik character varying(50) NOT NULL,
    nama character varying(100) NOT NULL,
    departemen character varying(100) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.tb_karyawan OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16513)
-- Name: tb_undian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_undian (
    id integer NOT NULL,
    nik character varying(50),
    id_hadiah integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.tb_undian OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16512)
-- Name: tb_undian_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_undian_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_undian_id_seq OWNER TO postgres;

--
-- TOC entry 3610 (class 0 OID 0)
-- Dependencies: 213
-- Name: tb_undian_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_undian_id_seq OWNED BY public.tb_undian.id;


--
-- TOC entry 210 (class 1259 OID 16488)
-- Name: tb_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_users (
    id uuid NOT NULL,
    nama character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.tb_users OWNER TO postgres;

--
-- TOC entry 3444 (class 2604 OID 16503)
-- Name: tb_hadiah id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_hadiah ALTER COLUMN id SET DEFAULT nextval('public.tb_hadiah_id_seq'::regclass);


--
-- TOC entry 3445 (class 2604 OID 16516)
-- Name: tb_undian id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_undian ALTER COLUMN id SET DEFAULT nextval('public.tb_undian_id_seq'::regclass);


--
-- TOC entry 3599 (class 0 OID 16497)
-- Dependencies: 212
-- Data for Name: tb_hadiah; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_hadiah VALUES (2, 'TV 32 Inch', 1, '2024-07-07 00:03:51.513', NULL);
INSERT INTO public.tb_hadiah VALUES (3, 'Lemari es samsung', 1, '2024-07-07 00:38:59.003', NULL);
INSERT INTO public.tb_hadiah VALUES (5, 'kipas angin maspion', 2, '2024-07-07 04:58:29.326', NULL);
INSERT INTO public.tb_hadiah VALUES (6, 'kompor gas', 2, '2024-07-07 04:58:47.342', NULL);


--
-- TOC entry 3596 (class 0 OID 16486)
-- Dependencies: 209
-- Data for Name: tb_karyawan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_karyawan VALUES ('0009', 'ASMAN HIDAYAT', 'PGA', '2024-07-07 01:34:56.78', NULL);
INSERT INTO public.tb_karyawan VALUES ('0032', 'ABU KOSIM AL JUNAIDI', 'MACHINING', '2024-07-07 01:34:56.787', NULL);
INSERT INTO public.tb_karyawan VALUES ('0151', 'AYU MASYITHOH', 'PGA', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0088', 'AZFANSA SALASI', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0738', 'KHASAN FATONI', 'MANUFACTURING', '2024-07-07 01:34:56.789', NULL);
INSERT INTO public.tb_karyawan VALUES ('0014', 'DWI HARIYADI', 'SEKRETARIAT ISO', '2024-07-07 01:34:56.783', NULL);
INSERT INTO public.tb_karyawan VALUES ('0057', 'SITI SULAIKHA', 'PGA', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0119', 'MUHAMMAD ALFIN', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0178', 'ACHMAD SOFYAN EFFENDI', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0183', 'PURWO NUGROHO', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0019', 'NUR LATIFAH', 'PPIC', '2024-07-07 01:34:56.784', NULL);
INSERT INTO public.tb_karyawan VALUES ('0059', 'FAUZAN', 'PGA', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0354', 'NAFISAH', 'ACCOUNTING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0160', 'TOSIM', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0264', 'A''AN ACHIYAR', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0005', 'HARYONO', 'HSE', '2024-07-07 01:34:56.77', NULL);
INSERT INTO public.tb_karyawan VALUES ('0135', 'MOHAMMAD SUDIRO', 'PGA', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0550', 'NANANG HARI SETIAWAN', 'ACCOUNTING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0180', 'MOH YUSUF', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0739', 'M. IRFAN KHUSNUDDIN', 'MANUFACTURING', '2024-07-07 01:34:56.79', NULL);
INSERT INTO public.tb_karyawan VALUES ('0008', 'MANSUR WIDAYAT', 'CASTING', '2024-07-07 01:34:56.778', NULL);
INSERT INTO public.tb_karyawan VALUES ('0056', 'DEDIK KURNIAWAN', 'PGA', '2024-07-07 01:34:56.787', NULL);
INSERT INTO public.tb_karyawan VALUES ('0935', 'DELIMA PUTRI MUJIANI', 'PGA', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0737', 'VICKY NUR DIANSA', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0566', 'HELMY YAHYA ALFARIZI', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0007', 'RAHMAD SANTOSO', 'GRINDING', '2024-07-07 01:34:56.777', NULL);
INSERT INTO public.tb_karyawan VALUES ('0150', 'FITRIYA AGUSTINA', 'ACCOUNTING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0158', 'OKTIEVANI MAULANA PRIMA', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0254', 'ADI TIYASWANTO', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0029', 'HARTONO', 'MAINTENANCE', '2024-07-07 01:34:56.786', NULL);
INSERT INTO public.tb_karyawan VALUES ('0127', 'SYARIFUDIN', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0206', 'BRAMADI SAPUTRO', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0022', 'ATIM SEPTIONO', 'UTILITY', '2024-07-07 01:34:56.784', NULL);
INSERT INTO public.tb_karyawan VALUES ('0182', 'SEPTIAN ARIEF HIDAYAT', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0031', 'KHOLILUL ROHMAN', 'IT', '2024-07-07 01:34:56.787', NULL);
INSERT INTO public.tb_karyawan VALUES ('0188', 'SLAMET HASANUDIN', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);
INSERT INTO public.tb_karyawan VALUES ('0024', 'FAJAR NUGRAHA', 'CASTING', '2024-07-07 01:34:56.785', NULL);
INSERT INTO public.tb_karyawan VALUES ('0276', 'FERY ARIAWAN', 'MANUFACTURING', '2024-07-07 01:34:56.788', NULL);


--
-- TOC entry 3601 (class 0 OID 16513)
-- Dependencies: 214
-- Data for Name: tb_undian; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_undian VALUES (1, '0032', 2, '2024-07-07 00:00:00', NULL);
INSERT INTO public.tb_undian VALUES (4, '0127', 3, '2024-07-07 04:57:44.627', NULL);
INSERT INTO public.tb_undian VALUES (5, '0029', 5, '2024-07-07 04:59:10.491', NULL);
INSERT INTO public.tb_undian VALUES (6, '0254', 5, '2024-07-07 04:59:29.286', NULL);
INSERT INTO public.tb_undian VALUES (7, '0088', 6, '2024-07-07 04:59:49.078', NULL);


--
-- TOC entry 3597 (class 0 OID 16488)
-- Dependencies: 210
-- Data for Name: tb_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_users VALUES ('73860fcd-08d2-4ce4-9db5-b28672416fa4', 'admin', 'admin@gmail.com', '$2a$10$Np64/b0U5BRFrMCpEkmj/OAifip.FC9UA.XQQRLxMT8fG7qtmXdaq', '2024-07-06 23:34:01.727', NULL);


--
-- TOC entry 3611 (class 0 OID 0)
-- Dependencies: 211
-- Name: tb_hadiah_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_hadiah_id_seq', 6, true);


--
-- TOC entry 3612 (class 0 OID 0)
-- Dependencies: 213
-- Name: tb_undian_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_undian_id_seq', 7, true);


--
-- TOC entry 3453 (class 2606 OID 16509)
-- Name: tb_hadiah tb_hadiah_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_hadiah
    ADD CONSTRAINT tb_hadiah_pkey PRIMARY KEY (id);


--
-- TOC entry 3447 (class 2606 OID 16505)
-- Name: tb_karyawan tb_karyawan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_karyawan
    ADD CONSTRAINT tb_karyawan_pkey PRIMARY KEY (nik);


--
-- TOC entry 3455 (class 2606 OID 16518)
-- Name: tb_undian tb_undian_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_undian
    ADD CONSTRAINT tb_undian_pkey PRIMARY KEY (id);


--
-- TOC entry 3449 (class 2606 OID 16511)
-- Name: tb_users tb_users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_users
    ADD CONSTRAINT tb_users_email_key UNIQUE (email);


--
-- TOC entry 3451 (class 2606 OID 16504)
-- Name: tb_users tb_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_users
    ADD CONSTRAINT tb_users_pkey PRIMARY KEY (id);


--
-- TOC entry 3456 (class 2606 OID 16519)
-- Name: tb_undian tb_undian_nik_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_undian
    ADD CONSTRAINT tb_undian_nik_fkey FOREIGN KEY (nik) REFERENCES public.tb_karyawan(nik) ON DELETE CASCADE;


-- Completed on 2024-07-07 17:04:00 WIB

--
-- PostgreSQL database dump complete
--

