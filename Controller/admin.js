var base64String = "";
var db = openDatabase('database', '1.0', 'veritabani', 2 * 1024 * 1024);  

function imageUploaded() {
    var file = document.getElementById(
        'photoUpload')['files'][0];
  
    var reader = new FileReader();
    console.log("next");
      
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
  
        imageBase64Stringsep = base64String;
  
        // alert(imageBase64Stringsep);
        console.log(base64String);
    }
    reader.readAsDataURL(file);
}

function imageUploadedguncelle() {
  var file = document.getElementById(
      'foto')['files'][0];

  var reader = new FileReader();
  console.log("next");
    
  reader.onload = function () {
      base64String = reader.result.replace("data:", "")
          .replace(/^.+,/, "");

      imageBase64Stringsep = base64String;

      // alert(imageBase64Stringsep);
      console.log(base64String);
  }
  reader.readAsDataURL(file);
}

function urunuekle(){
  
    const fotograf = document.getElementById("adminurunekle").children[0].children[1].name;
    const urunadi = document.getElementById("adminurunekle").children[0].children[4].value;
    const stokdurum = document.getElementById("adminurunekle").children[0].children[7].value;
    const fiyat = document.getElementById("adminurunekle").children[0].children[10].value;
  
    tabloyaEkle(fotograf,urunadi,stokdurum,fiyat,base64String);
          
}

function urunlertablosu() {
  
    db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM urunler", [], function(tx, result) {
        var rows = result.rows;
        var tableHtml = "<label id='text'>ÜRÜNLER TABLOSU:</label><br><table><tr><th>URUNID</th><th>URUN ADI</th><th>FOTOGRAF</th><th>STOK</th><th>URUN FIYAT</th></tr>";
  
        for (var i = 0; i < rows.length; i++) {
          var row = rows.item(i);
          tableHtml += "<tr><td>" + row.urunid + "</td><td>" + row.urunadi + "</td><td>"+ 
          row.fotograf.slice(0,27) + "</td><td>" + row.stok + "</td><td>"+row.urunfiyat +"</td></tr>";
        }
  
        tableHtml += "</table>";
        document.body.innerHTML += tableHtml;
      });
    });
    
  }


function urungetir() {
        var urunid = document.getElementById("adminurunguncelle").children[0].children[4].value;
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM urunler WHERE urunid = ?', [urunid], function (tx, results) {
            document.getElementById("adminurunguncelle").children[0].children[7].value = results.rows.item(0).urunadi;
            document.getElementById("adminurunguncelle").children[0].children[10].value = results.rows.item(0).stok;
            document.getElementById("adminurunguncelle").children[0].children[13].value = results.rows.item(0).urunfiyat;
            document.getElementById("adminurunguncelle").children[0].children[7].disabled = false;
            document.getElementById("adminurunguncelle").children[0].children[10].disabled = false;
            document.getElementById("adminurunguncelle").children[0].children[13].disabled = false;
            document.getElementById("adminurunguncelle").children[0].children[16].disabled = false;
            document.getElementById("adminurunguncelle").children[0].children[17].disabled = false;
         });
     });
}


function urunguncelle() {

    db.transaction(function (tx) {
      //  var foto = document.getElementById("adminurunguncelle").children[0].children[1].name;
        var urnid = document.getElementById("adminurunguncelle").children[0].children[4].value;
        var urnad = document.getElementById("adminurunguncelle").children[0].children[7].value;
        var stk = document.getElementById("adminurunguncelle").children[0].children[10].value;
        var urnfyt = document.getElementById("adminurunguncelle").children[0].children[13].value;
        tx.executeSql("UPDATE urunler SET urunadi = ?, fotograf = ?, stok = ?, urunfiyat = ? WHERE urunid = ?", [urnad,base64String,stk,urnfyt,urnid], function (tx, results) {
         });
         window.location.reload();
     });

}

function urunsil() {
  var urunid = document.getElementById("adminurunguncelle").children[0].children[4].value;
  db.transaction(function (tx) {
      tx.executeSql('DELETE FROM urunler WHERE urunid = ?', [urunid]);
   });
   window.location.reload();
}



urunlertablosu();