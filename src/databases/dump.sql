--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)

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
-- Name: heroku_ext; Type: SCHEMA; Schema: -; Owner: u6f140qq6a4vmq
--

CREATE SCHEMA heroku_ext;


ALTER SCHEMA heroku_ext OWNER TO u6f140qq6a4vmq;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: jogjfczucxyber
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "postId" integer,
    "userId" integer
);


ALTER TABLE public.likes OWNER TO jogjfczucxyber;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: jogjfczucxyber
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.likes_id_seq OWNER TO jogjfczucxyber;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jogjfczucxyber
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: jogjfczucxyber
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    url text NOT NULL,
    description text,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO jogjfczucxyber;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: jogjfczucxyber
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO jogjfczucxyber;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jogjfczucxyber
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: jogjfczucxyber
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tags OWNER TO jogjfczucxyber;

--
-- Name: tagsPosts; Type: TABLE; Schema: public; Owner: jogjfczucxyber
--

CREATE TABLE public."tagsPosts" (
    id integer NOT NULL,
    "tagId" integer,
    "postId" integer
);


ALTER TABLE public."tagsPosts" OWNER TO jogjfczucxyber;

--
-- Name: tagsPosts_id_seq; Type: SEQUENCE; Schema: public; Owner: jogjfczucxyber
--

CREATE SEQUENCE public."tagsPosts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."tagsPosts_id_seq" OWNER TO jogjfczucxyber;

--
-- Name: tagsPosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jogjfczucxyber
--

ALTER SEQUENCE public."tagsPosts_id_seq" OWNED BY public."tagsPosts".id;


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: jogjfczucxyber
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO jogjfczucxyber;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jogjfczucxyber
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: jogjfczucxyber
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    picture text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO jogjfczucxyber;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: jogjfczucxyber
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO jogjfczucxyber;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jogjfczucxyber
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: tagsPosts id; Type: DEFAULT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public."tagsPosts" ALTER COLUMN id SET DEFAULT nextval('public."tagsPosts_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: jogjfczucxyber
--

COPY public.likes (id, "postId", "userId") FROM stdin;
1	4	10
3	4	9
5	4	2
6	4	3
7	4	4
8	4	7
9	4	8
10	19	9
24	17	9
26	20	9
31	22	9
32	33	\N
33	33	\N
35	33	\N
36	33	\N
37	33	\N
38	33	\N
39	32	\N
40	31	\N
41	30	\N
42	33	9
43	32	9
44	31	9
46	34	1
48	29	1
49	33	1
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: jogjfczucxyber
--

COPY public.posts (id, url, description, "userId", "createdAt") FROM stdin;
1	https://joi.dev/api/?v=17.6.0#string		1	2022-08-09 20:17:51.174203
2	https://joi.dev/api/?v=17.6.0#string		1	2022-08-09 20:27:40.999511
3	https://www.figma.com/file/W3lZA9PUddEefwzdgiFZL4/T6-%7C-Projetão%3A-Linkr---Rede-Social-de-Links?node-id=7%3A37	testando no front também	1	2022-08-09 20:31:36.893394
4	https://www.npmjs.com/package/joi		1	2022-08-09 20:52:44.798
8	https://www.npmjs.com/package/react-debounce-input		1	2022-08-10 22:54:38.573836
10	https://www.npmjs.com/package/react-loader-spinner	Testando agora a implementação das tags na timeline	9	2022-08-11 19:03:40.891889
11	https://www.npmjs.com/package/react-loader-spinner	testando de novo esqueci das #tags #fé	9	2022-08-11 19:27:25.808596
12	https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener	Testando tambem #tags	1	2022-08-11 20:17:39.008916
13	https://www.npmjs.com/package/react-loader-spinner	mais testes #tags	9	2022-08-11 20:52:08.316143
14	https://www.npmjs.com/package/react-loader-spinner	mais um teste #tags1	9	2022-08-11 20:54:02.97312
15	https://www.npmjs.com/package/react-loader-spinner	mais um teste #tags2	9	2022-08-11 20:54:53.519869
16	https://www.npmjs.com/package/react-loader-spinner	testando inserção de tags na database #web-dev	9	2022-08-11 21:47:49.64941
17	https://www.npmjs.com/package/react-loader-spinner	testando inserção de tags na database #web-dev	9	2022-08-11 21:48:31.555969
18	https://www.npmjs.com/package/react-loader-spinner	testando inserção de tags na database #web-dev	9	2022-08-11 21:48:56.949734
19	https://www.npmjs.com/package/react-loader-spinner	testando inserção de tags na database #web-dev	9	2022-08-11 21:49:14.076088
20	https://developer.mozilla.org/en-US/	testando novamente inserção de tags no banco de dados #web-dev #fé #novo	9	2022-08-11 21:52:07.72168
21	 https://developer.mozilla.org/en-US/	testando mais uma vez inserção de tags no banco de dados #web-dev #fé #novo	9	2022-08-11 21:53:36.548929
22	 https://developer.mozilla.org/en-US/	testando	9	2022-08-11 21:59:57.740737
23	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in	testando	16	2022-08-12 20:33:14.184738
27	https://artigo.app/	#jogo	1	2022-08-15 11:14:27.798624
28	https://dev.to		1	2022-08-15 16:12:55.174945
29	https://dev.to	Compartilhando link #programacao #aprendizagem	1	2022-08-15 16:14:29.540301
30	https://valorant.fandom.com/wiki/Killjoy	Olá, prazer em conhecê-los! :)	21	2022-08-15 17:12:48.173709
31	https://developer.mozilla.org/en-US/docs/Web/CSS/@media	#programacao	22	2022-08-15 17:14:59.068152
32	https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox	#aprendizagem olha só como é legal o flexbox XD	22	2022-08-15 17:16:02.600125
33	https://styled-components.com/	CSS in JS #web-dev	23	2022-08-15 17:17:49.143036
34	https://www.npmjs.com/package/nodemon	Testando a atualização dos trending topics depois que posta #fé	9	2022-08-15 18:53:31.330929
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: jogjfczucxyber
--

COPY public.tags (id, name) FROM stdin;
1	web-dev
2	java-script
3	sql
4	fé
5	#web-dev
6	novo
7	jogo
8	programacao
9	aprendizagem
\.


--
-- Data for Name: tagsPosts; Type: TABLE DATA; Schema: public; Owner: jogjfczucxyber
--

COPY public."tagsPosts" (id, "tagId", "postId") FROM stdin;
5	5	19
6	1	20
7	1	21
8	4	21
9	6	21
10	7	27
11	8	29
12	9	29
13	8	31
14	9	32
15	1	33
16	4	34
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: jogjfczucxyber
--

COPY public.users (id, email, username, password, picture, "createdAt") FROM stdin;
1	mary@com.br	mary	$2b$10$oUDXGTI1uoMbwjXIr8/MyenouhnETrgAherN4d09t6kpYMH1BGdS6	https://crazyraccoon.jp/wp/wp-content/uploads/2022/06/HP_%E9%81%B8%E6%89%8B%E7%94%BB%E5%83%8F_Meiy.png	2022-08-09 02:15:32.756467
8	yugo@gmail.com	yugo	$2b$10$PFYblNGc7WVNNoQjsE7W7eiskhxrfpaT1c03jauAjJRsFQ4Kms2BW	https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png	2022-08-10 05:59:25.767311
9	yugo1@gmail.com	yugo1	$2b$10$G.bD4DdSoZaEYi/5AK0EL.ew2IsSX.Rved.F89Jhc8u.ZPwjH6pjK	https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png	2022-08-10 06:02:29.945187
10	ceci@email.com	Ceci	$2b$10$X5G1Du2BKhr3MaI0nopIDebTvrn4ToRhWQToGbbcarTdUyTpQ/Iba	https://t1.uc.ltmcdn.com/pt/posts/9/7/6/qual_e_o_significado_das_margaridas_11679_600.jpg	2022-08-10 12:32:04.924863
11	cecilia@email.com	cecilia	$2b$10$BKQrSScmki6L5LGu2UKA5OBrnNct0Mhap9TNQ2aye9Amjgf47g/4K	https://casa.abril.com.br/wp-content/uploads/2022/01/Como-plantar-e-cuidar-de-margarida-africana-15.jpg?quality=95&strip=info	2022-08-10 13:08:50.370293
12	yugo2@gmail.com	yugo2	$2b$10$s.u5zzLVhRbjsaLiZdEoruhRwmJgxVS.7y.QJwzIK3ohm3AtwPtA6	data:image/jpeg;base64,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	2022-08-10 18:01:11.726661
17	joao@joao.com	jo	$2b$10$hJSx4kzOxqERgPjvCoNQHuCnfwgkYzp4As/yEhMcr6GTuBgsys7sS	https://www.google.com/search?q=foto+de+gato&oq=foto+de+gato&aqs=chrome..69i57j0i512l7.5197j0j4&client=ms-android-motorola-rev2&sourceid=chrome-mobile&ie=UTF-8#imgrc=PWT62L63gAb4DM	2022-08-14 17:03:05.800182
18	visitante@email.com	Visitante	$2b$10$FVRbdhlFLN3DVy2hVBbMz.qojd1GJhbKX1sV0bn4p1bzpKYUsL1xm	https://images.vexels.com/media/users/3/137047/isolated/preview/5831a17a290077c646a48c4db78a81bb-icone-azul-do-perfil-de-usuario.png	2022-08-15 02:06:06.902061
19	marilene@email.com	Marilene	$2b$10$SGDHIQxvd3PGs5kqhulJPubwF4vgM7QNfNkmnKPCFxyGE9R.75e8C	https://assets.reedpopcdn.com/Pokemon-Scarlet-Violet-New-Pokemon-Header.jpg/BROK/resize/1200x1200%3E/format/jpg/quality/70/Pokemon-Scarlet-Violet-New-Pokemon-Header.jpg	2022-08-15 16:52:41.483206
3	guilherme@com.br	guilherme	$2b$10$MOIi6KhAg3VJ4x/pcjANUee9.v81nzKG61HqrMGsgyJoY.eMcchiq	https://uploads.jovemnerd.com.br/wp-content/uploads/2022/06/pokemon_scarlet_e_violet_memes__7g6s6bk-1210x544.jpg	2022-08-09 13:48:29.112114
4	julia@com.br	julia	$2b$10$g12KDJaEv.3Pi0gM4apsje/7yxXU.AsQKrCNf/QvwGQgNQJJpfcJ.	https://t.ctcdn.com.br/T8wdiYDE6g7JT2PBDIxjqADtHD4=/848x477/smart/filters:format(webp)/i618583.jpeg	2022-08-09 13:55:47.261459
7	Mary@com.br	mary1	$2b$10$KJVmp4OQMR1WAs0OOCOCWe24OPkhe7E1xLKYb/GYtRMpQyarB.tme	https://www.cnet.com/a/img/resize/e8e0ec83c12a0153ccf5a00d473dcdee2ed6eb7c/2022/06/01/c0e353c3-b433-456f-8c2e-1fc159492d81/pokemon-scarlet-violet-pawmi.png?auto=webp&width=1200	2022-08-09 14:16:55.396766
20	marya@com.br	Mary	$2b$10$Dy19DwQUpfSzQIjsGVeQE.O6nLulJ3Xz4MIE0nPXJS4/bkn5gu95u	https://nintendoboy.com.br/wp-content/uploads/2022/06/Pokemon-Scarlet-and-Violet_2022_06-01-22_041-768x1025-1.png	2022-08-15 16:53:31.254178
2	daniel@com.br	daniel	$2b$10$uMyJ97PQGesI4n2jouel7eSs4daZ.lOSQVlYaBqfj3W5C3KXbo25i	https://www.buff.game/wp-content/uploads/2021/08/V_AGENTS_587x900_Phx.png	2022-08-09 10:03:28.002359
13	marcela@com.br	marcela	$2b$10$Q7Cat7MI.enWtciRZfWAwe3zyO3eK..RJvXcQzd9ahqKoDPkGuWKq	https://www.pcgamesn.com/wp-content/uploads/2022/01/valorant-characters-fade.jpg	2022-08-10 21:19:02.981937
14	marcela1@com.br	marc ela	$2b$10$h/sy34DMt4.7HVCHoNVeXenRLC4JLADRrAp1FLzvuocFzd0wXcCG2	https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt40ac0503fb2e2051/61d3a6c5c9ed2d27fb5a0464/010522_NeonTrailer_Banner_v3.jpg?auto=webp&disable=upscale&height=549	2022-08-11 12:29:02.39665
15	marcela2@com.br	 marcela	$2b$10$5fhp/w1vA/5GQ6EOZi27bOluI0RD16XWmKu61VOaN6MSu5Ggrgtty	https://i.pinimg.com/originals/af/d0/c6/afd0c6d9c2e0fc3d5443d802f092e8f7.png	2022-08-11 12:29:25.857504
16	lara@com.br	lara	$2b$10$9JST.Yo4euLh/wlrwNotvuQPBP2krPfJfzdqCjq1969buVKv2SvSS	https://cdnb.artstation.com/p/assets/images/images/038/013/333/large/carol-morgan-wolfy-art-normal.jpg?1621944118&dl=1	2022-08-12 20:23:14.967724
21	marta@email.com	marta	$2b$10$a/vzZd5OUTJXLurbhsLUbuhfw58Ra/0TEp2Mv9MlfSFZ3HGzt.f/O	https://dimkts.com/wp-content/uploads/2022/01/riot-forced-to-explain-a-valorant-character-is-not-into-nfts.jpg	2022-08-15 17:11:58.987826
22	juliana@email.com	juliana	$2b$10$diF.CEAUrWzeBJnP83AxY.UUEMZEas.rupd3.0rktuMwKQ3vBTL02	https://www.coliseugeek.com.br/wp-content/uploads/2021/06/Falas-dos-personagens-de-Valorant-transformadas-em-musica.png	2022-08-15 17:14:18.53495
23	julio@email.com	julio	$2b$10$vw2k4ih.vzgi1.pq0Ez7XevY4CgrRIZEjuPQZenEFiy.H5F7sNBX.	https://www.gamersdecide.com/sites/default/files/styles/news_images/public/tumblr_6866ffcd591a0505cf7309e09e0cbf71_9d397e05_1280_1.jpg	2022-08-15 17:16:58.811138
24	maryjane@email.com	mary jane	$2b$10$/ObLHK8jlD5wj4CHnHhtyeWKYRuK7edKy.TwGIwHkTemA/oQ.6wf.	https://mansaodasartes.vteximg.com.br/arquivos/ids/172264-1000-1000/Homem_Aranha.jpg?v=637064260357070000	2022-08-15 17:23:37.428306
\.


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jogjfczucxyber
--

SELECT pg_catalog.setval('public.likes_id_seq', 49, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jogjfczucxyber
--

SELECT pg_catalog.setval('public.posts_id_seq', 37, true);


--
-- Name: tagsPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jogjfczucxyber
--

SELECT pg_catalog.setval('public."tagsPosts_id_seq"', 16, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jogjfczucxyber
--

SELECT pg_catalog.setval('public.tags_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jogjfczucxyber
--

SELECT pg_catalog.setval('public.users_id_seq', 24, true);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: tagsPosts tagsPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public."tagsPosts"
    ADD CONSTRAINT "tagsPosts_pkey" PRIMARY KEY (id);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: tagsPosts tagsPosts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public."tagsPosts"
    ADD CONSTRAINT "tagsPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: tagsPosts tagsPosts_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jogjfczucxyber
--

ALTER TABLE ONLY public."tagsPosts"
    ADD CONSTRAINT "tagsPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tags(id);


--
-- Name: SCHEMA heroku_ext; Type: ACL; Schema: -; Owner: u6f140qq6a4vmq
--

GRANT USAGE ON SCHEMA heroku_ext TO jogjfczucxyber;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: jogjfczucxyber
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO jogjfczucxyber;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO jogjfczucxyber;


--
-- PostgreSQL database dump complete
--

