const loginPopup = document.getElementById("login-popup");
const loginButton = document.querySelector("nav").children[0].children[1];
const signinButton = document.querySelector("nav").children[0].children[2];
const signupPopup = document.getElementById("signup-popup");
const adminlik = document.querySelector("nav").children[0].children[7];
var kullaniciadi,sifre;
var idDizi = [];
kullaniciadi = localStorage.getItem(localStorage.key(0));

var db = openDatabase('database', '1.0', 'veritabani', 2 * 1024 * 1024);

signinButton.addEventListener("click", () => {
    if (localStorage.length === 0) {
        loginPopup.style.display = "block";
                                          }
    
  }); 
  
  loginButton.addEventListener("click", () => {
    if (localStorage.length === 0) {
      signupPopup.style.display = "block";
                                          }
    });

    if (localStorage.length > 0) {
        const adekle = document.querySelector("nav").children[0].children[2].children[0];
        adekle.innerHTML = " " + " Hoşgeldin " + kullaniciadi ;
        loginPopup.style.display = "none";
        loginButton.style.display = "none";
        document.querySelector("nav").children[0].children[0].style.display = "block";
    }

function girisyap() {
    kullaniciadi = document.getElementById("username").value;
    sifre = document.getElementById("password").value;
   db.transaction( async function (tx) {
       tx.executeSql('SELECT * FROM musteriler WHERE kullaniciadi = ? AND sifre = ?', [kullaniciadi, sifre], function (tx, results) {
          if (results.rows.length > 0) {
              alert("Kullanıcı adı ve şifre doğrulandı!");
              const adekle = document.querySelector("nav").children[0].children[2].children[0];
             adekle.innerHTML = " " + " Hoşgeldin " + kullaniciadi ;
             loginPopup.style.display = "none";
             loginButton.style.display = "none";
             //signinButton.style.display = "none";
             localStorage.clear();
             localStorage.setItem(sifre,kullaniciadi);
             document.querySelector("nav").children[0].children[0].style.display = "block";
             
          } else {
             alert('Kullanıcı adı veya şifre yanlış!');
          }
       });
    });
    window.location.reload(); //adminse ürün ekle butonu gelmesi için refresh
}

function kayitol(){   //değişiklik yaptım hata olursa kontrol et
    kullaniciadi = document.getElementById("kayit-username").value;
    sifre = document.getElementById("kayit-password").value;
   const telefon = document.getElementById("tel").value;
   db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM musteriler WHERE kullaniciadi = ?', [kullaniciadi], function (tx, results) {
          if (results.rows.length > 0) {
             alert('KULLANICI ZATEN ÜYE');
             signupPopup.style.display = "none";  
          } else {
             tx.executeSql('INSERT INTO musteriler (kullaniciadi, sifre, telefon) VALUES (?, ?, ?)', [kullaniciadi, sifre, telefon]);
             alert('Üyelik Kaydınız Tamamlandı.Hoşgeldiniz');
             signupPopup.style.display = "none";           
          }
       });
    });
}

function cikisyap() {
    localStorage.clear();
    window.location.reload();
}