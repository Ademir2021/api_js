PGDMP                          {            test    13.11 (Debian 13.11-0+deb11u1)    13.11 (Debian 13.11-0+deb11u1) S    *           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            +           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ,           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            -           1262    22836    test    DATABASE     Y   CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'pt_BR.UTF-8';
    DROP DATABASE test;
                postgres    false            �            1255    22998    fc_calc_note() 	   PROCEDURE     �  CREATE PROCEDURE public.fc_calc_note()
    LANGUAGE plpgsql
    AS $$
DECLARE
note int := 1;
max_note int :=0;
BEGIN
max_note := (SELECT MAX(id_sale) from sales);
FOR  note IN note.. max_note
LOOP
UPDATE sales SET val_rec = ( SELECT SUM( total_product ) FROM itens_sale WHERE fk_sale = note ) WHERE id_sale = note;
UPDATE sales SET total_sale = val_rec - disc_sale WHERE id_sale = note;
END LOOP;
END;
$$;
 &   DROP PROCEDURE public.fc_calc_note();
       public          postgres    false            �            1255    22981    fc_sum_note()    FUNCTION     �  CREATE FUNCTION public.fc_sum_note() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
UPDATE itens_sale
SET total_product = val_product * amount_product
WHERE fk_sale = NEW.fk_sale;
UPDATE sales SET val_rec = ( SELECT SUM( total_product )
FROM itens_sale WHERE fk_sale = NEW.fk_sale )
WHERE id_sale = NEW.fk_sale;                          
UPDATE sales
SET total_sale = val_rec - disc_sale
WHERE id_sale = NEW.fk_sale;
RETURN NEW;
END;
$$;
 $   DROP FUNCTION public.fc_sum_note();
       public          postgres    false            �            1255    23188    total_sales(integer)    FUNCTION     �   CREATE FUNCTION public.total_sales(note_init integer) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
DECLARE 
total_sales NUMERIC := 0;  
BEGIN  
SELECT SUM(total_sale) INTO total_sales FROM sales
WHERE id_sale > note_init;  
RETURN total_sales;
END; $$;
 5   DROP FUNCTION public.total_sales(note_init integer);
       public          postgres    false            �            1259    22861    brands    TABLE     �   CREATE TABLE public.brands (
    id_brand integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    name_brand character varying(60) NOT NULL
);
    DROP TABLE public.brands;
       public         heap    postgres    false            �            1259    22859    brands_id_brand_seq    SEQUENCE     �   CREATE SEQUENCE public.brands_id_brand_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.brands_id_brand_seq;
       public          postgres    false    205            .           0    0    brands_id_brand_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.brands_id_brand_seq OWNED BY public.brands.id_brand;
          public          postgres    false    204            �            1259    23238    contacts    TABLE     T  CREATE TABLE public.contacts (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    name character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    phone character varying(11) NOT NULL,
    comments character varying(250) NOT NULL
);
    DROP TABLE public.contacts;
       public         heap    postgres    false            �            1259    23236    contacts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.contacts_id_seq;
       public          postgres    false    219            /           0    0    contacts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;
          public          postgres    false    218            �            1259    22841    filiais    TABLE     �  CREATE TABLE public.filiais (
    id_filial integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    name_filial character varying(60) NOT NULL,
    fantasia character varying(60) NOT NULL,
    address character varying(60) NOT NULL,
    cnpj character varying(14) NOT NULL,
    inscric character varying(14) NOT NULL,
    phone character varying(11) NOT NULL,
    email character varying(60) NOT NULL
);
    DROP TABLE public.filiais;
       public         heap    postgres    false            �            1259    22839    filiais_id_filial_seq    SEQUENCE     �   CREATE SEQUENCE public.filiais_id_filial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.filiais_id_filial_seq;
       public          postgres    false    201            0           0    0    filiais_id_filial_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.filiais_id_filial_seq OWNED BY public.filiais.id_filial;
          public          postgres    false    200            �            1259    22906 
   itens_sale    TABLE     A  CREATE TABLE public.itens_sale (
    id_item_sequen integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    fk_sale integer NOT NULL,
    fk_product integer NOT NULL,
    amount_product integer NOT NULL,
    val_product numeric(18,2) NOT NULL,
    total_product numeric(18,2) NOT NULL
);
    DROP TABLE public.itens_sale;
       public         heap    postgres    false            �            1259    22888    products    TABLE     �  CREATE TABLE public.products (
    id_product integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    descric_product character varying(60) NOT NULL,
    val_max_product numeric(18,2) NOT NULL,
    val_min_product numeric(18,2) NOT NULL,
    fk_brand integer NOT NULL,
    fk_sector integer NOT NULL,
    bar_code character varying(200) NOT NULL,
    image character varying(30)
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    22897    sales    TABLE     I  CREATE TABLE public.sales (
    id_sale integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    fk_name_pers integer NOT NULL,
    val_rec numeric(18,2),
    disc_sale numeric(18,2) NOT NULL,
    total_sale numeric(18,2),
    fk_name_filial integer NOT NULL,
    fk_name_user integer NOT NULL
);
    DROP TABLE public.sales;
       public         heap    postgres    false            �            1259    22870    sectors    TABLE     �   CREATE TABLE public.sectors (
    id_sector integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    name_sector character varying(60) NOT NULL
);
    DROP TABLE public.sectors;
       public         heap    postgres    false            �            1259    22958 
   itens_nota    VIEW     �  CREATE VIEW public.itens_nota AS
 SELECT sales.id_sale AS id_venda,
    itens_sale.fk_product AS item,
    products.descric_product AS descricao,
    brands.name_brand AS marca,
    sectors.name_sector AS setor,
    itens_sale.amount_product AS quant,
    itens_sale.val_product AS valor,
    itens_sale.total_product AS total
   FROM ((((public.sales
     JOIN public.itens_sale ON ((sales.id_sale = itens_sale.fk_sale)))
     JOIN public.products ON ((products.id_product = itens_sale.fk_product)))
     JOIN public.brands ON ((brands.id_brand = products.fk_brand)))
     JOIN public.sectors ON ((sectors.id_sector = products.fk_sector)));
    DROP VIEW public.itens_nota;
       public          postgres    false    215    215    215    215    215    213    211    211    211    211    207    207    205    205            �            1259    22904    itens_sale_id_item_sequen_seq    SEQUENCE     �   CREATE SEQUENCE public.itens_sale_id_item_sequen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.itens_sale_id_item_sequen_seq;
       public          postgres    false    215            1           0    0    itens_sale_id_item_sequen_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.itens_sale_id_item_sequen_seq OWNED BY public.itens_sale.id_item_sequen;
          public          postgres    false    214            �            1259    22879    persons    TABLE     �  CREATE TABLE public.persons (
    id_person integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    name_pers character varying(60) NOT NULL,
    cpf_pers character varying(11) NOT NULL,
    address_pers character varying(60) NOT NULL,
    fk_name_filial integer NOT NULL,
    fk_id_user integer NOT NULL,
    phone_pers character varying(11) NOT NULL
);
    DROP TABLE public.persons;
       public         heap    postgres    false            �            1259    22850    users    TABLE     c  CREATE TABLE public.users (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    name character varying(60) NOT NULL,
    username character varying(60) NOT NULL,
    password character varying(255) NOT NULL,
    privilege character varying(255) DEFAULT 2 NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    22963    nota    VIEW     /  CREATE VIEW public.nota AS
 SELECT sales.id_sale AS nota,
    filiais.name_filial AS filial,
    filiais.fantasia,
    filiais.address AS f_endereco,
    filiais.cnpj,
    filiais.inscric AS inscricao,
    filiais.phone AS f_telefone,
    filiais.email AS f_email,
    persons.name_pers AS comprador,
    persons.cpf_pers AS cpf,
    persons.address_pers AS endereco,
    persons.phone_pers AS telefone,
    users.name AS usuario,
    users.username AS email,
    sales.created_at AS emitida,
    sales.val_rec,
    sales.disc_sale AS desc_venda,
    sales.total_sale AS total_venda
   FROM (((public.sales
     JOIN public.filiais ON ((filiais.id_filial = sales.fk_name_filial)))
     JOIN public.persons ON ((persons.id_person = sales.fk_name_pers)))
     JOIN public.users ON ((users.id = sales.fk_name_user)));
    DROP VIEW public.nota;
       public          postgres    false    201    213    209    209    201    201    201    209    213    209    209    201    201    201    213    213    213    213    203    203    213    203    201    213            �            1259    22877    persons_id_person_seq    SEQUENCE     �   CREATE SEQUENCE public.persons_id_person_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.persons_id_person_seq;
       public          postgres    false    209            2           0    0    persons_id_person_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.persons_id_person_seq OWNED BY public.persons.id_person;
          public          postgres    false    208            �            1259    22886    products_id_product_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_product_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.products_id_product_seq;
       public          postgres    false    211            3           0    0    products_id_product_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.products_id_product_seq OWNED BY public.products.id_product;
          public          postgres    false    210            �            1259    22895    sales_id_sale_seq    SEQUENCE     �   CREATE SEQUENCE public.sales_id_sale_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.sales_id_sale_seq;
       public          postgres    false    213            4           0    0    sales_id_sale_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.sales_id_sale_seq OWNED BY public.sales.id_sale;
          public          postgres    false    212            �            1259    22868    sectors_id_sector_seq    SEQUENCE     �   CREATE SEQUENCE public.sectors_id_sector_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.sectors_id_sector_seq;
       public          postgres    false    207            5           0    0    sectors_id_sector_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.sectors_id_sector_seq OWNED BY public.sectors.id_sector;
          public          postgres    false    206            �            1259    22848    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            6           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            f           2604    22864    brands id_brand    DEFAULT     r   ALTER TABLE ONLY public.brands ALTER COLUMN id_brand SET DEFAULT nextval('public.brands_id_brand_seq'::regclass);
 >   ALTER TABLE public.brands ALTER COLUMN id_brand DROP DEFAULT;
       public          postgres    false    205    204    205            r           2604    23241    contacts id    DEFAULT     j   ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);
 :   ALTER TABLE public.contacts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            a           2604    22844    filiais id_filial    DEFAULT     v   ALTER TABLE ONLY public.filiais ALTER COLUMN id_filial SET DEFAULT nextval('public.filiais_id_filial_seq'::regclass);
 @   ALTER TABLE public.filiais ALTER COLUMN id_filial DROP DEFAULT;
       public          postgres    false    201    200    201            p           2604    22909    itens_sale id_item_sequen    DEFAULT     �   ALTER TABLE ONLY public.itens_sale ALTER COLUMN id_item_sequen SET DEFAULT nextval('public.itens_sale_id_item_sequen_seq'::regclass);
 H   ALTER TABLE public.itens_sale ALTER COLUMN id_item_sequen DROP DEFAULT;
       public          postgres    false    215    214    215            j           2604    22882    persons id_person    DEFAULT     v   ALTER TABLE ONLY public.persons ALTER COLUMN id_person SET DEFAULT nextval('public.persons_id_person_seq'::regclass);
 @   ALTER TABLE public.persons ALTER COLUMN id_person DROP DEFAULT;
       public          postgres    false    209    208    209            l           2604    22891    products id_product    DEFAULT     z   ALTER TABLE ONLY public.products ALTER COLUMN id_product SET DEFAULT nextval('public.products_id_product_seq'::regclass);
 B   ALTER TABLE public.products ALTER COLUMN id_product DROP DEFAULT;
       public          postgres    false    211    210    211            n           2604    22900    sales id_sale    DEFAULT     n   ALTER TABLE ONLY public.sales ALTER COLUMN id_sale SET DEFAULT nextval('public.sales_id_sale_seq'::regclass);
 <   ALTER TABLE public.sales ALTER COLUMN id_sale DROP DEFAULT;
       public          postgres    false    213    212    213            h           2604    22873    sectors id_sector    DEFAULT     v   ALTER TABLE ONLY public.sectors ALTER COLUMN id_sector SET DEFAULT nextval('public.sectors_id_sector_seq'::regclass);
 @   ALTER TABLE public.sectors ALTER COLUMN id_sector DROP DEFAULT;
       public          postgres    false    207    206    207            c           2604    22853    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203                      0    22861    brands 
   TABLE DATA           N   COPY public.brands (id_brand, created_at, updated_at, name_brand) FROM stdin;
    public          postgres    false    205   p       '          0    23238    contacts 
   TABLE DATA           \   COPY public.contacts (id, created_at, updated_at, name, email, phone, comments) FROM stdin;
    public          postgres    false    219   ^p                 0    22841    filiais 
   TABLE DATA           �   COPY public.filiais (id_filial, created_at, updated_at, name_filial, fantasia, address, cnpj, inscric, phone, email) FROM stdin;
    public          postgres    false    201   {p       %          0    22906 
   itens_sale 
   TABLE DATA           �   COPY public.itens_sale (id_item_sequen, created_at, fk_sale, fk_product, amount_product, val_product, total_product) FROM stdin;
    public          postgres    false    215    q                 0    22879    persons 
   TABLE DATA           �   COPY public.persons (id_person, created_at, updated_at, name_pers, cpf_pers, address_pers, fk_name_filial, fk_id_user, phone_pers) FROM stdin;
    public          postgres    false    209   ~x       !          0    22888    products 
   TABLE DATA           �   COPY public.products (id_product, created_at, updated_at, descric_product, val_max_product, val_min_product, fk_brand, fk_sector, bar_code, image) FROM stdin;
    public          postgres    false    211   {y       #          0    22897    sales 
   TABLE DATA           �   COPY public.sales (id_sale, created_at, fk_name_pers, val_rec, disc_sale, total_sale, fk_name_filial, fk_name_user) FROM stdin;
    public          postgres    false    213   �~                 0    22870    sectors 
   TABLE DATA           Q   COPY public.sectors (id_sector, created_at, updated_at, name_sector) FROM stdin;
    public          postgres    false    207   ��                 0    22850    users 
   TABLE DATA           `   COPY public.users (id, created_at, updated_at, name, username, password, privilege) FROM stdin;
    public          postgres    false    203   B�       7           0    0    brands_id_brand_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.brands_id_brand_seq', 1, true);
          public          postgres    false    204            8           0    0    contacts_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.contacts_id_seq', 1, false);
          public          postgres    false    218            9           0    0    filiais_id_filial_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.filiais_id_filial_seq', 1, true);
          public          postgres    false    200            :           0    0    itens_sale_id_item_sequen_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.itens_sale_id_item_sequen_seq', 331, true);
          public          postgres    false    214            ;           0    0    persons_id_person_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.persons_id_person_seq', 7, true);
          public          postgres    false    208            <           0    0    products_id_product_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.products_id_product_seq', 25, true);
          public          postgres    false    210            =           0    0    sales_id_sale_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.sales_id_sale_seq', 40, true);
          public          postgres    false    212            >           0    0    sectors_id_sector_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.sectors_id_sector_seq', 5, true);
          public          postgres    false    206            ?           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    202            {           2606    22867    brands brands_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id_brand);
 <   ALTER TABLE ONLY public.brands DROP CONSTRAINT brands_pkey;
       public            postgres    false    205            �           2606    23244    contacts contacts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.contacts DROP CONSTRAINT contacts_pkey;
       public            postgres    false    219            u           2606    22847    filiais filiais_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.filiais
    ADD CONSTRAINT filiais_pkey PRIMARY KEY (id_filial);
 >   ALTER TABLE ONLY public.filiais DROP CONSTRAINT filiais_pkey;
       public            postgres    false    201            �           2606    22912    itens_sale itens_sale_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.itens_sale
    ADD CONSTRAINT itens_sale_pkey PRIMARY KEY (id_item_sequen, fk_sale);
 D   ALTER TABLE ONLY public.itens_sale DROP CONSTRAINT itens_sale_pkey;
       public            postgres    false    215    215                       2606    22885    persons persons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT persons_pkey PRIMARY KEY (id_person);
 >   ALTER TABLE ONLY public.persons DROP CONSTRAINT persons_pkey;
       public            postgres    false    209            �           2606    22894    products products_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id_product);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    211            �           2606    22903    sales sales_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id_sale);
 :   ALTER TABLE ONLY public.sales DROP CONSTRAINT sales_pkey;
       public            postgres    false    213            }           2606    22876    sectors sectors_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (id_sector);
 >   ALTER TABLE ONLY public.sectors DROP CONSTRAINT sectors_pkey;
       public            postgres    false    207            w           2606    22856    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            y           2606    22858    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    203            �           2620    22982    itens_sale trg_sum_note    TRIGGER     r   CREATE TRIGGER trg_sum_note AFTER INSERT ON public.itens_sale FOR EACH ROW EXECUTE FUNCTION public.fc_sum_note();
 0   DROP TRIGGER trg_sum_note ON public.itens_sale;
       public          postgres    false    215    220            �           2606    22938    products brand_fk_brand    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT brand_fk_brand FOREIGN KEY (fk_brand) REFERENCES public.brands(id_brand) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.products DROP CONSTRAINT brand_fk_brand;
       public          postgres    false    205    2939    211            �           2606    22928    sales filial_fk_name_filial    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT filial_fk_name_filial FOREIGN KEY (fk_name_filial) REFERENCES public.filiais(id_filial) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.sales DROP CONSTRAINT filial_fk_name_filial;
       public          postgres    false    213    2933    201            �           2606    22953    persons person_fk_id_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT person_fk_id_user FOREIGN KEY (fk_id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.persons DROP CONSTRAINT person_fk_id_user;
       public          postgres    false    209    2935    203            �           2606    22948    persons person_fk_name_filial    FK CONSTRAINT     �   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT person_fk_name_filial FOREIGN KEY (fk_name_filial) REFERENCES public.filiais(id_filial) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.persons DROP CONSTRAINT person_fk_name_filial;
       public          postgres    false    2933    201    209            �           2606    22923    sales person_fk_name_pers    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT person_fk_name_pers FOREIGN KEY (fk_name_pers) REFERENCES public.persons(id_person) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.sales DROP CONSTRAINT person_fk_name_pers;
       public          postgres    false    209    213    2943            �           2606    22918    itens_sale product_fk_product    FK CONSTRAINT     �   ALTER TABLE ONLY public.itens_sale
    ADD CONSTRAINT product_fk_product FOREIGN KEY (fk_product) REFERENCES public.products(id_product) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.itens_sale DROP CONSTRAINT product_fk_product;
       public          postgres    false    215    2945    211            �           2606    22913    itens_sale sale_fk_sale    FK CONSTRAINT     �   ALTER TABLE ONLY public.itens_sale
    ADD CONSTRAINT sale_fk_sale FOREIGN KEY (fk_sale) REFERENCES public.sales(id_sale) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.itens_sale DROP CONSTRAINT sale_fk_sale;
       public          postgres    false    215    213    2947            �           2606    22943    products sector_fk_sector    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT sector_fk_sector FOREIGN KEY (fk_sector) REFERENCES public.sectors(id_sector) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.products DROP CONSTRAINT sector_fk_sector;
       public          postgres    false    207    2941    211            �           2606    22933    sales user_fk_name_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT user_fk_name_user FOREIGN KEY (fk_name_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.sales DROP CONSTRAINT user_fk_name_user;
       public          postgres    false    213    203    2935               3   x�3�4202�50�56P04�24�25�3��07����tO-J������ ���      '      x������ � �         �   x�ʱ
�0 ����*w���� T��]��"����u}<IR�T�����˺�LV��|0��[�7���ݶZ��.���i�nx�So�1`�{�1��rG�,s�TVJ+"b&��;�y�u!�����}~���l	^|2!���*S      %   N  x�m�ۍ\�E��QLS_"U�L�q�MJ�[�!�p��,K"7�f������?4?�>doְI/���K�{�������B��f�e�b�! 3ke_a�0��8F8�=$�,@�!�2�36��n�rܪ)�e�6�J���ۉƁ��ܘ<!y��vk���_�[���LV�v����k��/o/��[Z�CB}���6�~Π��!}O� ̐.�m�yL�	b.��^=��l&di7���ڌ����J��(��Jn��[z�� �̱��^o����J)C;	-�T��܀���p4�%R���*S�H���̎��?c}�G�L$a#�6���9	ȇ����hm#Cei�!��3�%�+�~�ОPI��% ε�hlX�Bz&���͐�fM��BQ���?�ܖy���$C��=g������1�|OX)�����mh�E=ű���R3s���Q �
8��2����5pCh��IYz��[��p�*g�}E@��B�����0m�V�!BI�^в�����*��-�ìI�N�����[nl�اxR���)�C1���I��Q����g@�24�Z�p�B��Ss�$��r�k4mr!�ի�SzƇZ1]��CA破�Nt��o?PYM�G��7�[��o?�˘+��������ߙcݩ� �O�Kqf��9t����Y�B���w���q��̜="��`��I�b�g�Vh2��f�-Ic�C���uR��y���>��;q����?"�� g�� ҥt�B&D�Լǹg�����w���֩�i�ÙjM5Ǯ��{�G�AK)�ǽ���2k�Q̝4���N�3e^*��:��9����g� ����A����G͔q��TG���9ȸ�� f��%2v�L���e]~�����)�Ɇ{q��\[�$�(��"��@�!�T�O�p��Ϟ�h�5�tJ�a_��p$�H���gBhֵ`�u����W����>n �0�t�\-�l�(�V=�@z��2?˾��!�e�o	��C��}N�ߜ����"J����I,q���g:RZ�;� ��/O�������+w�;�����@|�H%�?����7�w��M�^� �R�#Q"�g�w� ��6�>�]�7��0�ΰ�n̎O���h)���YR�����N��sp�"��gR�'��>dZ���idʫ�ώ�O�.t��a�&��jBw�����b�	ُ��U�`�E��rEܪ߈�G��~�")3.H�=�?<T����Q��Y�l�q�_�}�d�U��M��#2g�}��E�Z
�i��(�������(��(G��}=:�)���L�2��z�����Or>)��`[�_���1��q�q�_�dm|L�of�=�nc_-��[�L�{�Ck�,	��������&���o6��~ƌ�c��-g��k�	�SfPp]��4��0C^Vao�_�k"�	�����D��s�vF;F�Fzm�����i礗f`�+Cw�����Pbg4LY�/�t��L�)�]�|�n�W��8���g�y�f}FD�q��Ξ��L�QF�+K�:���s�>���s5ԩ�f����T�UT*�v�&�;;ʭ�fgǹۗ���^��ߜ�s�=�ϔ�7e��g �%�Z)��EkO$�I<��d̋�1�e���0��
&Br��W>���ܝ�ZmI��;���Ģ1�.����Zw#x ����v�lݍ�adw5�5)l��I>��~d��[0ϖ	8�]��1�{ YY��ǌ��#��
�W�«E$�'��e�������)w�"W�u��}g㵑�����GF׿         �   x�]��n�0Eg�+�QI�����S��Em4p��3���@��r�%p�" ���1��s���O��h e'�Ȋ爬�c=����g1�j��T۱��DRH�Tw��3�2_��zr��AbT�Üb����{��,
���-�
(C�佈��2�b��v+������2��^����J&����!���20�p�F�1Yb/��i*�G�C3�e��x�
�9Bώ��{x�����9F�[���Y�      !   V  x�mV�n�F}^�"���ݝ��Mrl'����� (�R�P�KR����C>$?��%)�-�M33�P�̘��\���"�bz�ef\R1�1�Hc�%�yF�i��E��e�-R��_�B�˼���,�#J�'��.�J�&ϒ�?��_����~��\M�##�Yu�8�6Vx�EJ3i��+L��'*��}���tu����<����&���wr�tǅq#��1E���������]�n��Y�v}X�n��Ɩ���z(3 J�H�M��v�>m�oՔ�\,Tęux����C�kz���M��$"�D��X����d�d�(i��!���t�AJ-_�sK�GF2��.��%�ۜ�wy,�"��>������� ��k�}Dc�J���-31�Rd���cW{�.o��m^m��;2OD?Q���T8P�q��l���Y���gS�O��)��OC���(��Ӥ9ǀ�w�D�$���s��+�4�L�ҁ!ոq
�8���Q��9f8�Λ�ů����B*����_����8�UJ�x�_v�6�fف��hո��������_8'�\r?sLHi��ȍ�aC�
��}�Y��iI���.ӆ^^?<ar]�T�'?�"��R�R�D�3�� �,�H�6Μo9�\�Q}l�A�Ȳ�
�	���P����ӧ�9Ѭ��} Z\>��4����� ?�9���YMWE���ZP�t�w��L2#�"w�����?@��	����]��Ʒo�@��7���k����R3��=�G8Oh�!W8��,�J���4����3�����>�5��7.l�+�k��[�̛���h=�5�p�^-� �18ȷ��g�+��'�C�t8a�i��Ӧ�	�`0ڌ"�pp;�����4�TF��[W��Œ>��j�M?]������$.�e�x�)M�.)#�^{�Bѫҳ�.*� On	o���ݲM�d�z�2/,J�FC�)�z%oN|9�?\Bs���8Α�%M�%r�����7�!�
�z�1��D`���׉�A'�q�K�<� n�!Ii9����}��A5e1θ5������e��^!ףB���O��@ҪKꠥ�fIֿ���(b�\�{/��sO�hX�h�c��e�_)/�0b�������P4BM�V��������DX�����[\�cU��F䶨�eNo�L��� �_�9k%��ϐ���fߎ3:0?%j����J+���D��-�,p�|CpO�qL�dszC`%��kp1�F-��J���N�Y�.��w��x�i�oi�m1':����&mwusH��A�[��u����5����ʽ��      #   �  x�]Sٍ�0�UL�>R��_��a�a���Q���  ���A{a,��:9Xm�p�
C�'�0��d� �b��'TqZ#�`=l~p�B_�p����S`�4�%��wƂ!�:��<|��7�m�( ''LwN�U��)��,��Ģ����p�������I�Iu�`#)ϱ}��ڂ��AL�����0�?!���آ\�	�p$�6��>I���M���T�����fM~�rh��F)�H}iy�)��R�j��/�IO[�ߑEX�Ѧ�x�)��H;O��R�xh��u,��m�1rǔn�݊o^uǤKp&+s\��O������<R�j��Pw���5?+�R9��� �:e�n��K��cw���[�|I����6QR���^K]��d���V�eê`�"ۑ�B��a��I�D���Ԅdݙ3��yW�~�q���         �   x�]�1
�0 ��zE>cI�m��K��NYLp!�4�ڄ.�~á!Gܻг�P2�,Β��j���ԭ�@?{�9�ψ�Ge���V�U�?�U�9Z�I�wx}��m)m��%�Em�(r�G��. gG{Qѣ��=a� ���,Q         �   x�u�AO�0���Wp຦�Z
�I�A�P�.&^*��9ڍ�-��՘hb��͓��<�� �9��OA1�(�����}+J<��}B��^խۙ�ŦQ :�$�-wt|~o�r=��.ytFcf�W'.U�ć���A�2���1�������?�!��`�#A�O�B������Lw���/��lg��vrö����gw<s�[���4�<�&��e���S��l�)�D��y�[�U�     