create database db_toko;
use db_toko;

create table user(
	idUser int primary key auto_increment,
    username char(20),
    password char(20),
    noHp char(15),
    email char(30)
);

create table akun_toko(
	idToko int primary key auto_increment,
    idUser int,
    namaToko char(30),
    username char(20),
    password char(20),
    foreign key (idUser) references user(idUser)
);

create table data_barang(
	kodeBarang char(20) primary key,
    namaBarang char(30),
    harga int,
    gambar char(30),
    ukuran char(5),
    idToko int,
    foreign key (idToko) references akun_toko(idToko)
);

create table stok_barang(
	idToko int,
    kodeBarang char(20),
    stok int,
    foreign key (idToko) references akun_toko(idToko),
    foreign key (kodeBarang) references data_barang(kodeBarang)
);

create table transaksi(
	nomorStruk char(20),
    idToko int,
    kodeBarang char(20),
    qty int,
    tanggal datetime,
    foreign key (idToko) references akun_toko(idToko),
    foreign key (kodeBarang) references data_barang(kodeBarang)
);