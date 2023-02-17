var db = openDatabase("database", "1.0", "veritabani", 2 * 1024 * 1024);


function urunlistele() {
    return new Promise(function(resolve, Reject) {
        db.transaction(function (tx) {
           tx.executeSql("SELECT * FROM Urunler", [], function(tx, result) {
              for (var i = 0; i < result.rows.length; i++) {
                console.log(i);
                if (result.rows.item(i).stok > 0) {
                    resolve(divolustur(result.rows[i]));
                }
               }
            });
         });
       })
}
 
window.onload = function listele() {
    urunlistele().then(function(res) {
      //basarili
    }).catch(function(error) {
      //basarisiz
    })
}