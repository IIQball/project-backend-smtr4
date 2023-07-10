insert into user (username, password, noHp, email)
values ('distrOutfit', 'distrOutfit', '081234567812', 'distroutfit@gmail.com');

insert into akun_toko (idUser, namaToko, username, password)
values (1,'distrOutfit', 'distrOutfit01', 'passwordDistrOutfit'),
       (1,'distrOutfit02', 'distrOutfit02', 'passwordDistrOutfit');

insert into data_barang (kodeBarang, namaBarang, harga, gambar, ukuran, idToko, idUser)
values ('P001', 'Kaos Polos', 50000, 'kaos_polos.jpg', 'M', 1, 1),
('P002', 'Kaos Polos', 50000, 'kaos_polos.jpg', 'L', 1, 1),
('P003', 'Kaos Polos', 50000, 'kaos_polos.jpg', '2XL', 1, 1);

insert into stok_barang (idUser, idToko, kodeBarang, stok)
values (1, 1,'P001', 100),
(1, 1,'P002', 50),
(1, 1,'P003', 500);

insert into transaksi(nomorStruk, idUser, idToko,kodeBarang,qty,tanggal)
values ('TK1-5JUN23-1', 1, 1, 'P001', 1, '2023-6-5'),
('TK1-5JUN23-1', 1, 1, 'P002', 1, '2023-6-5'),
('TK1-5JUN23-1', 1, 1, 'P003', 1, '2023-6-5');