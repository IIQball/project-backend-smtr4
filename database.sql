CREATE TABLE akuntoko (
    id CHAR (5) PRIMARY KEY NOT NULL,
    nama_toko VARCHAR (50) NOT NULL,
    username VARCHAR (30) NOT NULL,
    password VARCHAR (30) NOT NULL
);

INSERT INTO akuntoko (id, nama_toko, username, password)
VALUES ('A2', 'Toko Omega', 'tokoomega', 'omega098');