// Div'i oluşturma
function divolustur(adminveri) {
    var container = document.createElement("div");
    container.setAttribute("class","urunler");
    
    // Ürün resmini oluşturma ve div'e ekleme
    var urunResmi = document.createElement("img");
    urunResmi.src = "data:image/png;base64,"+adminveri.fotograf;
    urunResmi.setAttribute("class","resimler");
    // urunResmi.style.maxWidth = "30000px";
    // urunResmi.style.maxHeight = "200px";
    // urunResmi.style.marginLeft ="55px";
    // urunResmi.style.marginTop = "20px";
    
    container.appendChild(urunResmi);
    
    // Ürün adını oluşturma ve div'e ekleme
    var urunAdi = document.createElement("p");
    urunAdi.innerHTML = adminveri.urunadi;
    urunAdi.style.textAlign ="center";
    urunAdi.style.fontFamily ="'Bree Serif', serif";
    urunAdi.style.color = "white";
    container.appendChild(urunAdi);
    
    var urunFiyati = document.createElement("label");
    urunFiyati.innerHTML = adminveri.urunfiyat;
    container.appendChild(urunFiyati);
    
    var txt = document.createElement("label");
    txt.innerHTML = "TL<br>"
    txt.style.marginLeft = "0px";
    container.appendChild(txt);
    
    // Miktar input'unu oluşturma ve div'e ekleme
    var miktarInput = document.createElement("input");
    miktarInput.type = "text";
    miktarInput.placeholder = "Miktar";
    miktarInput.size = "3";
    miktarInput.maxLength = "3";
    miktarInput.style.marginLeft = "80px";
    miktarInput.style.marginTop = "10px";
    miktarInput.style.backgroundColor = "rgb(211, 223, 219)";
    miktarInput.style.border = "1px solid grey";
    container.appendChild(miktarInput);
    
    var eklebutonu = document.createElement("button");
    eklebutonu.type = "button";
    eklebutonu.innerHTML = "Sepete Ekle";
    eklebutonu.setAttribute("onclick","sptekle(this)");
    eklebutonu.width = "5";
    eklebutonu.style.marginLeft = "5px";
    container.appendChild(eklebutonu);
    
    var id = document.createElement("label");
    id.innerHTML = adminveri.urunid;
    id.style.display = "none";
    container.appendChild(id);
    
    // Div'i sayfaya ekleme
    const anasayfaBody = document.getElementById("anasayfaBody");
    anasayfaBody.appendChild(container);
    }