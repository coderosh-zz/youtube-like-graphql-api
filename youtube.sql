--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: reaction; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.reaction AS ENUM (
    'like',
    'dislike'
);


ALTER TYPE public.reaction OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    text text NOT NULL,
    "user" uuid,
    video uuid,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    reaction public.reaction,
    video uuid,
    "user" uuid
);


ALTER TABLE public.reactions OWNER TO postgres;

--
-- Name: replies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.replies (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    text text NOT NULL,
    "user" uuid,
    comment uuid,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.replies OWNER TO postgres;

--
-- Name: searchhistories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.searchhistories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    text text NOT NULL,
    "user" uuid
);


ALTER TABLE public.searchhistories OWNER TO postgres;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    subscriber uuid,
    channel uuid,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    channel character varying(255),
    password character varying(255) NOT NULL,
    profile character varying(255) NOT NULL,
    banner character varying(255),
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fullname character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    views integer DEFAULT 0 NOT NULL,
    creator uuid,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    url text NOT NULL
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: watchhistories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.watchhistories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "user" uuid,
    video uuid
);


ALTER TABLE public.watchhistories OWNER TO postgres;

--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, text, "user", video, createdat) FROM stdin;
\.


--
-- Data for Name: reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reactions (id, reaction, video, "user") FROM stdin;
\.


--
-- Data for Name: replies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.replies (id, text, "user", comment, createdat) FROM stdin;
\.


--
-- Data for Name: searchhistories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.searchhistories (id, text, "user") FROM stdin;
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (id, subscriber, channel, createdat) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, channel, password, profile, banner, createdat, fullname) FROM stdin;
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (id, title, description, views, creator, createdat, url) FROM stdin;
\.


--
-- Data for Name: watchhistories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.watchhistories (id, "user", video) FROM stdin;
\.


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: reactions reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_pkey PRIMARY KEY (id);


--
-- Name: replies replies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_pkey PRIMARY KEY (id);


--
-- Name: searchhistories searchhistories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.searchhistories
    ADD CONSTRAINT searchhistories_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: watchhistories watchhistories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchhistories
    ADD CONSTRAINT watchhistories_pkey PRIMARY KEY (id);


--
-- Name: comments comments_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_userid_fkey FOREIGN KEY ("user") REFERENCES public.users(id);


--
-- Name: comments comments_videoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_videoid_fkey FOREIGN KEY (video) REFERENCES public.videos(id);


--
-- Name: reactions reactions_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_userid_fkey FOREIGN KEY ("user") REFERENCES public.users(id);


--
-- Name: reactions reactions_videoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_videoid_fkey FOREIGN KEY (video) REFERENCES public.videos(id);


--
-- Name: replies replies_commentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_commentid_fkey FOREIGN KEY (comment) REFERENCES public.comments(id);


--
-- Name: replies replies_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_userid_fkey FOREIGN KEY ("user") REFERENCES public.users(id);


--
-- Name: searchhistories searchhistories_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.searchhistories
    ADD CONSTRAINT searchhistories_userid_fkey FOREIGN KEY ("user") REFERENCES public.users(id);


--
-- Name: subscriptions subscriptions_channel_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_channel_fkey FOREIGN KEY (channel) REFERENCES public.users(id);


--
-- Name: subscriptions subscriptions_subscriber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_subscriber_fkey FOREIGN KEY (subscriber) REFERENCES public.users(id);


--
-- Name: videos videos_creator_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_creator_fkey FOREIGN KEY (creator) REFERENCES public.users(id);


--
-- Name: watchhistories watchhistories_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchhistories
    ADD CONSTRAINT watchhistories_userid_fkey FOREIGN KEY ("user") REFERENCES public.users(id);


--
-- Name: watchhistories watchhistories_videoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchhistories
    ADD CONSTRAINT watchhistories_videoid_fkey FOREIGN KEY (video) REFERENCES public.videos(id);


--
-- PostgreSQL database dump complete
--

