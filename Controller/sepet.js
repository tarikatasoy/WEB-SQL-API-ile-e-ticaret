var db = openDatabase('database', '1.0', 'veritabani', 2 * 1024 * 1024);
function sptekle(a) {
    var gelendiv = a.parentNode;
    var mktr = 0;

    db.transaction(function (tx) {

        tx.executeSql("SELECT * FROM urunler WHERE urunid = ?",[gelendiv.children[6].innerHTML], function (tx, results) {
            if(results.rows.item(0).stok < gelendiv.children[4].value) {
            alert("stoktaki üründen fazla ekleyemezsiniz. STOK MİKTARI = " + results.rows.item(0).stok)
            }
            else {
                tx.executeSql("SELECT * FROM sepet WHERE urnID = ? AND klncadi = ?",[gelendiv.children[6].innerHTML,kullaniciadi], function (tx, results) {
                    if(results.rows.length > 0) {
                         mktr = parseInt(results.rows.item(0).miktar) + parseInt(gelendiv.children[4].value);
                         tx.executeSql("UPDATE sepet SET miktar = ? WHERE urnID = ? AND klncadi = ?",[mktr,gelendiv.children[6].innerHTML,kullaniciadi]);
                    }
                    else {
                       tx.executeSql('INSERT INTO sepet (urunadi, fotograf, miktar, urunfiyat, urnID, klncadi) VALUES (?, ?, ?, ?, ?, ?)',
                       [gelendiv.children[1].innerHTML, gelendiv.children[0].currentSrc,
                       gelendiv.children[4].value, gelendiv.children[2].innerHTML,gelendiv.children[6].innerHTML,kullaniciadi]);
                    }
          
          
                   });

            }
                  });

    });
  
 }


 function sepettensil(id) {
    return new Promise(function(Resolve, Reject) {
    db.transaction(function (tx) {
        Resolve(tx.executeSql("DELETE FROM sepet WHERE urnID = ?", [id]));
      });});
    }

