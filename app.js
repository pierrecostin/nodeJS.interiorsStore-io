/* ini express avec sessio et ejs n*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
app.use( session({secret: 'secret',resave: true,saveUninitialized: true}) );
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.listen(80, () => {
    console.log('Serveur en écoute...');
});
app.set('view engine', 'ejs');
/* ini express avec session et ejs */


const Panier = require("./Panier.js"); // appel obj panier

/* ini mongoose */
const mongoose = require("mongoose"); // appel plugin mongoose
mongoose.connect("mongodb://localhost/lab03", { // lab03 le nom de DB
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.log("Echec de connexion à la BD Mongo...", error));

const chaiseSchema = new mongoose.Schema({
    title: String,
    marque: String,
    price: String,
    qte: Number
});
const Chaise = mongoose.model("chaise", chaiseSchema); // chaise le nom de notre table avec "s"
const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const Client = mongoose.model("client", clientSchema); // chaise le nom de notre table avec "s"

/* ini mongoose */


app.get('/list.json', async (req, res) => {
    let resultat = await Chaise.find().exec();
    res.send(resultat);
});


app.get('/', (req, res) => { 
    let mon_panier = new Panier();
   if(!req.session.mon_panier){
    req.session.mon_panier = mon_panier;
   }else{
    mon_panier = req.session.mon_panier; // mon_panier de type obj mere
    Object.setPrototypeOf( mon_panier, Panier.prototype );
   }

   let nb = mon_panier.getNbItems();
   res.render(__dirname+'/public/index',
   {nb: nb}
   );
});




app.get('/addItem', (req, res) => {
    let mon_panier = req.session.mon_panier;
    Object.setPrototypeOf( mon_panier, Panier.prototype ); // transformer un obj de type gene a un type specifique
    
    mon_panier.addItem( {id: req.query.id, nom: req.query.nom, prix: req.query.prix} );

    let getNbItems = mon_panier.getNbItems();
    res.send("<script>window.parent.document.getElementById('nProduit').innerHTML = "+ getNbItems +"; location.href= 'mon-panier';</script>");
});

app.get('/removeItem', (req, res) => {
    let mon_panier = req.session.mon_panier;
    Object.setPrototypeOf( mon_panier, Panier.prototype ); // transformer un obj de type gene a un type specifique
    
    if( req.query.id == "all"){
        mon_panier.viderPanier();
    }else{
        mon_panier.removeItem( req.query.id );
    }

    let getNbItems = mon_panier.getNbItems();
    res.send("<script>window.parent.document.getElementById('nProduit').innerHTML = "+ getNbItems +"; location.href= 'mon-panier';</script>");
});


app.get('/mon-panier', (req, res) => {
    let mon_panier = req.session.mon_panier;
    Object.setPrototypeOf( mon_panier, Panier.prototype ); // transformer un obj de type gene a un type specifique

    res.render(__dirname+'/public/mon-panier',
    {afficherPanier: mon_panier.toHtml() }
    );
});


app.get('/login', (req, res) => {
    console.log(req.session.user);
    if(!req.session.user){
       res.render(__dirname+'/public/login');
    }else{
        res.render(__dirname+'/public/profile',
        {name: req.session.user.name ,email: req.session.user.email}
        );
    }
});

app.post('/register', async (req, res) => {
    let newClient = new Client({"name": req.body.name,"email": req.body.email, "password": req.body.password});
    await newClient.save();
    req.session.user = newClient;
    res.send("<script>location.href = '/login'; </script>");
});

app.post('/signin', async (req, res) => {
    try{
        let newClient = await Client.findOne({"email": req.body.email}).exec();
            if(newClient.password == req.body.password){
                req.session.user = newClient;
            }else{
                console.log("erreur d'authentification");
            }
    }catch(e){ console.log("erreur d'authentification"); }
    
    res.send("<script>location.href = '/login'; </script>");
});

app.get('/logout', async (req, res) => {
    delete req.session.user;
    res.send("<script>location.href = '/login'; </script>");
});


app.post('/commande', (req, res) => {
    //let mon_panier = ;
    //Object.setPrototypeOf( mon_panier, Panier.prototype ); // transformer un obj de type gene a un type specifique
    console.log(req.body);
    /*req.session.mon_panier.items
    req.body.priceCommande
    req.body.nbCommande
    req.body.dateCommande
    req.body.emailCommande
    req.body.surnameCommande*/
    
    res.end();
});


















