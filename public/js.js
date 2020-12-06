class Chaise{
  id;
  title;
  price;
  qte;

  constructor(id, title, price, qte) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.qte = qte;
  }
}


window.onload = function(){
  pListe = new Array();
  fetch("list.json")
      .then(reponse => reponse.json())
      .then(data => {
          for (let i = 0; i < data.length; i++) {
              let maChaise = new Chaise(data[i]._id, data[i].title, data[i].price, data[i].qte);
              pListe.push(maChaise);
          }
      })
      .then(() => afficherNosChaises(pListe));
}


function afficherNosChaises(pListe){
  let html = "";
  for (let i  in pListe ) {
    html += `<div class="item"><h2>`+ pListe[i].title.substring(0,40) +`</h2>
    <img title="`+ pListe[i].title +`" src="/img/`+ pListe[i].title +`.png"/>`+ pListe[i].price +`$

    <a href="/addItem?id=`+ pListe[i].id +`&nom=`+ pListe[i].title +`&prix=`+ pListe[i].price +`" target="iframe">
      <input type="button" value="Add to Cart"/>
    </a>
    </div>`;
  }
  document.getElementsByTagName('article')[0].innerHTML = html;
}





/*
function updatePanier(){
  document.getElementById('nProduit').innerHTML = shopper.getNbItems();
}

let shopper = new Panier();
let a = new Produit("qdqsd", 121);
let b = new Produit("uiluiluiod", 1871);
let c = new Produit("qjhkhjdaea", 1);
let d = new Produit("plkljksd", 1879);
let e = new Produit("kkjazd", 541);

shopper.addItem(a);
shopper.addItem(a);
shopper.addItem(a);
shopper.addItem(a);
shopper.addItem(b);
shopper.addItem(c);
shopper.addItem(d);
shopper.addItem(e);

shopper.removeItem(a);
shopper.toHtml();







function add(el){
  let nbItem = el.previousElementSibling;
  nbItem.value ++;
}

function remove(el){
  let nbItem = el.nextElementSibling;
  nbItem.value --;
  if ( nbItem.value < 0 ){ nbItem.value = 0; }
}

*/