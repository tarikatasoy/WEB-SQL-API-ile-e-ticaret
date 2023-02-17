const links = document.querySelectorAll("nav a");
var toplam = 0;
document.querySelector("nav").children[0].children[0].style.display = "none"; //başlangıçta çıkış yap butonu gözükmesin.
var kullaniciadi = localStorage.getItem(localStorage.key(0));
var stk = 0;

//navbar üzerine mouse getirildiğinde arka text rengi
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.color = "#a6a6a6";
  });

  link.addEventListener("mouseleave", () => {
    link.style.color = "#fff";
  });
});

// const loginPopup = document.getElementById("login-popup");
// const loginButton = document.querySelector("nav").children[0].children[1];
// const signinButton = document.querySelector("nav").children[0].children[2];
// const signupPopup = document.getElementById("signup-popup");

// signinButton.addEventListener("click", () => {
//   loginPopup.style.display = "block";
// });

// loginButton.addEventListener("click", () => {
//     signupPopup.style.display = "block";
//   });

var db = openDatabase("database", "1.0", "veritabani", 2 * 1024 * 1024);
var count;

db.transaction(function (tx) {
  tx.executeSql(
    "SELECT * FROM sepet WHERE klncadi = ?",
    [kullaniciadi],
    function (tx, results) {
      // Veritabanından çekilen verileri döngü ile gezinin
      for (var i = 0; i < results.rows.length; i++) {
        // HTML sayfasındaki inputları doldurun
        var container = document.createElement("div");
        container.setAttribute("id", "urun");
        container.setAttribute("class", "sepeturunler");

        var chk = document.createElement("input");
        chk.type = "checkbox";
        chk.style.marginTop = "87px";
        chk.style.marginLeft = "20px";
        chk.style.width = "15px";
        chk.style.height = "15px";
        chk.style.float = "left";
        chk.checked = "true";
        container.appendChild(chk);

        //ürün idsi tutularak tablodan silme
        var lbl = document.createElement("label");
        lbl.innerHTML = results.rows[i].urnID;
        container.appendChild(lbl);
        lbl.style.display = "none";

        var urunResmi = document.createElement("img");
        urunResmi.src = results.rows[i].fotograf;
        urunResmi.style.width = "140px";
        urunResmi.style.height = "140px";
        urunResmi.style.marginLeft = "20px";
        urunResmi.style.marginTop = "20px";
        urunResmi.style.float = "left";
        container.appendChild(urunResmi);

        var urunAdi = document.createElement("p");
        urunAdi.innerHTML = "ÜRÜN AÇIKLAMASI: " + results.rows[i].urunadi;
        urunAdi.style.marginLeft = "95px";
        urunAdi.style.marginTop = "25px";
        urunAdi.style.color = "white";
        urunAdi.style.fontFamily = "'Bree Serif', serif";
        container.appendChild(urunAdi);

        var urunfiyat = document.createElement("label");
        urunfiyat.innerHTML = results.rows[i].urunfiyat;
        urunfiyat.style.marginLeft = "850px";
        container.appendChild(urunfiyat);

        var miktarInput = document.createElement("input");
        miktarInput.type = "text";
        miktarInput.placeholder = "Miktar";
        miktarInput.size = "3";
        miktarInput.maxLength = "3";
        miktarInput.value = results.rows[i].miktar;
        miktarInput.style.marginLeft = "790px";
        miktarInput.style.marginTop = "30px";
        miktarInput.style.backgroundColor = "rgb(211, 223, 219)";
        miktarInput.style.border = "1px solid grey";
        container.appendChild(miktarInput);

        var eklebutonu = document.createElement("button");
        eklebutonu.type = "button";
        eklebutonu.setAttribute("onclick", "urunAl(this)");
        eklebutonu.innerHTML = "SATIN AL";
        eklebutonu.width = "5";
        eklebutonu.style.marginLeft = "5px";
        container.appendChild(eklebutonu);

        var eklebutonu = document.createElement("button");
        eklebutonu.type = "button";
        eklebutonu.innerHTML = "SİL";
        eklebutonu.setAttribute("onclick", "urunsil(this)");
        eklebutonu.width = "5";
        eklebutonu.style.marginLeft = "5px";
        container.appendChild(eklebutonu);

        document.body.appendChild(container);
      }
    }
  );
});


//ürünü stoktan silme
function urunsil(btn) {
  var cont = btn.parentNode;
  var id = cont.children[1].innerHTML;
     sepettensil(id);
  window.location.reload();
}

function urunAl(btn) {
  var cont = btn.parentNode;
  var id = cont.children[1].innerHTML;
  var urnad = cont.children[3].innerHTML;
  var alinanMiktar = cont.children[5].value;
  var kalanstk = 0;
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM urunler WHERE urunid = ?",
      [id],
      function (tx, results) {
        kalanstk = results.rows.item(0).stok - alinanMiktar;
        tx.executeSql(
          "UPDATE urunler SET stok = ? WHERE urunid = ?",
          [kalanstk, id],
          function (tx, results) {
            if (kalanstk < 0) {
              alert("ÜRÜN TÜKENDİ");
            } else {
              alert(
                alinanMiktar +
                  " " +
                  "ADET" +
                  " " +
                  urnad +
                  " " +
                  "SİPARİŞİNİZ ALINDI" +
                  " " +
                  "KALAN STOK:" +
                  kalanstk
              );
            }
          }
        );

        tx.executeSql("DELETE FROM sepet WHERE urnID = ?", [id]);
      }
    );
    window.location.reload();
  });
}

function al() {
    
    var urn = document.getElementsByClassName("sepeturunler");

(async function updateDatabase() {
  for (var i = 0; i < urn.length; i++) {
    var id = urn.item(i).children[1].innerHTML;
    var sepeturun = urn.item(i).children[5].value;
    var mevcutstok = 0;

    await new Promise(function (resolve, reject) {
      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT * FROM urunler WHERE urunid = ?",
          [id],
          function (tx, results) {
            mevcutstok = results.rows.item(0).stok;
            mevcutstok = mevcutstok - sepeturun;
            resolve();
          }
        );
      });
    });

    await new Promise(function (resolve, reject) {
      db.transaction(function (tx) {
        tx.executeSql("UPDATE urunler SET stok = ? WHERE urunid = ?", [
          mevcutstok,
          id,
        ]);
        resolve();
      });
    });
  }
  await new Promise(function (resolve, reject) {
    db.transaction(function (tx) {
      tx.executeSql("DELETE FROM sepet WHERE klncadi = ?", [
        kullaniciadi,
      ]);
      resolve(alert("TÜM SİPARİŞLER ALINDI."));
      window.location.reload();
    });
  });
})();

    
}

db.transaction(function (tx) {
  tx.executeSql(
    "SELECT urunfiyat,miktar FROM sepet WHERE klncadi = ?",
    [kullaniciadi],
    function (tx, results) {
      for (var i = 0; i < results.rows.length; i++) {
        toplam += results.rows.item(i).urunfiyat * results.rows.item(i).miktar;
        stk += results.rows.item(i).miktar;
      }

      document.getElementById("fiyat").innerHTML = "TOPLAM FİYAT: " + toplam;
    }
  );
});

//sepetten manuel ürün silme
//   db.transaction(function(tx) {
//    tx.executeSql("DELETE FROM sepet WHERE urunid = 2");
//  });

//   sepeturun();
//   sepeturun();
//   sepeturun();
//   sepeturun();
