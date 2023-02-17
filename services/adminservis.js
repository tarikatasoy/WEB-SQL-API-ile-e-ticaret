
function tabloyaEkle(foto,urunad,stok,fiyat,base64) {
    return new Promise(function(Resolve, Reject) {
        db.transaction(function (tx) {
            if(foto !== "" && urunad !== "" && stok !== "" && fiyat !== "") {
            tx.executeSql('INSERT INTO urunler (fotograf, urunadi, stok, urunfiyat) VALUES (?, ?, ?, ?)', 
            [base64, urunad, stok, fiyat]);
            window.location.reload(); //tabloyu yenilemesi için.             
            }
            else {alert("LÜTFEN TÜM ALANLARI DOLDURUN.")}
         });


    })
};