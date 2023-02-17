var db = openDatabase('database', '1.0', 'veritabani', 2 * 1024 * 1024);

function anasayfayonlendir() {
    window.location.href = "anasayfa.html";
                   } 
 
 function SPTyonlendir() {
    window.location.href = "sepet.html";
                   } 
 
 function adminyonlendir() {
    window.location.href = "admin.html";
 }

 db.transaction(function (tx) {
   tx.executeSql('SELECT kullaniciadi FROM musteriler WHERE adminlik = ?', ['X'], function (tx, result) {
    if (kullaniciadi == result.rows.item(0).kullaniciadi) {
      adminlik.style.display = "block";
    }
    else {adminlik.style.display="none";}
   });
 });