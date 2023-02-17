var db = openDatabase('database', '1.0', 'veritabani', 2 * 1024 * 1024);

db.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS musteriler (kullaniciadi TEXT PRIMARY KEY, sifre TEXT, telefon TEXT,adminlik char(1))');
  tx.executeSql('CREATE TABLE IF NOT EXISTS urunler (urunid INTEGER PRIMARY KEY, fotograf TEXT, urunadi TEXT,stok INTEGER,urunfiyat INTEGER)');
  tx.executeSql('CREATE TABLE IF NOT EXISTS sepet (rowid INTEGER PRIMARY KEY,urnID INTEGER,fotograf VARCHAR,urunadi TEXT,miktar INTEGER,urunfiyat INTEGER,klncadi VARCHAR,FOREIGN KEY (urnID)REFERENCES urunler(urunid),FOREIGN KEY (klncadi)REFERENCES musteriler(kullaniciadi))');
});