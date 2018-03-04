--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: delvrt; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA delvrt;


ALTER SCHEMA delvrt OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = delvrt, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: users; Type: TABLE; Schema: delvrt; Owner: admin
--

CREATE TABLE users (
    uid integer NOT NULL,
    uname text NOT NULL,
    passwd text NOT NULL,
    salt text NOT NULL,
    fname text,
    lname text,
    isdeleted boolean DEFAULT false,
    createdon timestamp with time zone,
    createdby integer,
    updatedon timestamp with time zone DEFAULT now() NOT NULL,
    updatedby integer
);


ALTER TABLE users OWNER TO admin;

--
-- Name: users_uid_seq; Type: SEQUENCE; Schema: delvrt; Owner: admin
--

CREATE SEQUENCE users_uid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_uid_seq OWNER TO admin;

--
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: delvrt; Owner: admin
--

ALTER SEQUENCE users_uid_seq OWNED BY users.uid;


--
-- Name: users uid; Type: DEFAULT; Schema: delvrt; Owner: admin
--

ALTER TABLE ONLY users ALTER COLUMN uid SET DEFAULT nextval('users_uid_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: delvrt; Owner: admin
--

INSERT INTO users VALUES (1, 'harsh', 'hc', 'h', 'Harsh', 'Chauhan', false, '2018-03-01 15:57:05.649061+05:30', -1, '2018-03-01 15:57:05.649061+05:30', -1);
INSERT INTO users VALUES (2, 'amrita', 'am', 'a', 'Amrita', 'Patel', false, '2018-03-01 15:57:27.640318+05:30', -1, '2018-03-01 15:57:27.640318+05:30', -1);


--
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: delvrt; Owner: admin
--

SELECT pg_catalog.setval('users_uid_seq', 2, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: delvrt; Owner: admin
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- Name: delvrt; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA delvrt TO web_an;


--
-- Name: users; Type: ACL; Schema: delvrt; Owner: admin
--

GRANT SELECT ON TABLE users TO web_an;


--
-- PostgreSQL database dump complete
--

