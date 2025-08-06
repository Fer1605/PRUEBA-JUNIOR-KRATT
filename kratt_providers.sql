--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: providers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.providers (
    id integer NOT NULL,
    company_name character varying(255) NOT NULL,
    contact_person character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    supplier_type character varying(50) NOT NULL,
    nit_or_rtu character varying(100) NOT NULL,
    phone character varying(50) NOT NULL,
    city character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.providers OWNER TO postgres;

--
-- Name: providers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.providers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.providers_id_seq OWNER TO postgres;

--
-- Name: providers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.providers_id_seq OWNED BY public.providers.id;


--
-- Name: providers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers ALTER COLUMN id SET DEFAULT nextval('public.providers_id_seq'::regclass);


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.providers (id, company_name, contact_person, email, supplier_type, nit_or_rtu, phone, city, created_at) FROM stdin;
2	EcoSoluciones GT	Laura Méndez	laura@ecosol.com	insumos	897562-K	45678901	Guatemala	2025-08-05 22:55:18.76731
19	BioEco Guatemala S.A.	Mariana López	mariana.lopez@bioeco.gt	Servicios ambientales	1023498-1A	+50222998877	Guatemala	2025-08-06 17:04:05.408216
20	TecnoRedes S.R.L.	Andrés González	andres@tecnoredes.com	Tecnología	987654321-B	+50245671234	Quetzaltenango	2025-08-06 17:04:05.408216
21	AgroAndes	Rosa María Velázquez	rosa.velazquez@agroandes.org	Agricultura	AG56-23178	+50233778899	Chimaltenango	2025-08-06 17:04:05.408216
22	Seguridad Total S.A.	Javier Ruano	j.ruano@seguridadtotal.gt	Seguridad	SEG-98431A	+50277889900	Escuintla	2025-08-06 17:04:05.408216
23	Global Print Solutions	Ingrid Chávez	ingridc@gprintsolutions.com	Papelería	RTU-887631	+50231225487	Cobán	2025-08-06 17:04:05.408216
24	LimpioExpress	Pablo García	pgarcia@limpioexpress.com	Limpieza industrial	LIM-200118	+50222334455	Mixco	2025-08-06 17:04:05.408216
25	Helados del Sol	Ana María Rodríguez	contacto@heladosdelsol.gt	Alimentos	NIT-332217	+50233445566	Antigua	2025-08-06 17:04:05.408216
26	Constructora El Pilar	Diego Martínez	d.martinez@elpilarconstru.com	Construcción	CON-001233	+50244556677	Jalapa	2025-08-06 17:04:05.408216
27	Soluciones Médicas Vitalis	Dra. Laura Estrada	laura.estrada@vitalismed.com	Suministros médicos	SMV-790045	+50255667788	Zacapa	2025-08-06 17:04:05.408216
\.


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.providers_id_seq', 27, true);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

