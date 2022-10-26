
const express = require("express");
const path=require("path");
const hbs=require("hbs")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();


app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());

//username and password
const myusername = 'abduak@gmail.com'
const mypassword = '1425378'
const invalid= 'Invalid username or password !'
// a variable to save a session
var session;

app.get('/',(req,res) => {
  session=req.session;
  if(session.userid){
      res.render('home',{products});
  }else
  res.render('login')
});

app.post('/login',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
      session=req.session;
      session.userid=req.body.username;
      res.redirect('/');
  }
  else{
      res.render('login',{invalid});
  }
})

let products = [
  {
    name: "Asus ROG Zephyrus Duo ",
    category: "laptop",
    description:
      "Featuring adequate specifications, Asus ROG Zephyrus Duo 16 GX650RXZ-LB226WS AMD Ryzen 9 6900HX 16 Inches Gaming Laptop (32GB/2TB SSD/Windows 11/Black/2.55 Kg) will enhance your productivity. Featuring an attractive design, the laptop comes with a 16 Inches display providing clear and vivid visuals while watching videos or playing games. Furthermore, the Windows 11 operating system in this laptop helps you perform your regular activities smoothly.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbUmL_cs5PuHGdpyWpARA6H1zG3PFyfQWgn20noruP_eY2zKTFgAZ_PUWxF_SbVupGmpg&usqp=CAU",
    price: "3 lakh",
  },
  {
    name: "Asus ROG Zephyrus Duo ",
    category: "laptop",
    description:
      "Featuring adequate specifications, Asus ROG Zephyrus Duo 16 GX650RXZ-LB226WS AMD Ryzen 9 6900HX 16 Inches Gaming Laptop (32GB/2TB SSD/Windows 11/Black/2.55 Kg) will enhance your productivity. Featuring an attractive design, the laptop comes with a 16 Inches display providing clear and vivid visuals while watching videos or playing games. Furthermore, the Windows 11 operating system in this laptop helps you perform your regular activities smoothly.",

    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTcqdxxeUmCwA4uSgfUr91czA-CrmRzr_k7NCGK35m3pKeg3e5xNwCjFw-sJnqzmrTwsWgg3F85S2Y&usqp=CAc",
    price: "3 lakh",
  },
  {
    name: " Dell Alienware m15 ",
    category: "laptop",
    description:
      "Featuring adequate specifications, Asus ROG Zephyrus Duo 16 GX650RXZ-LB226WS AMD Ryzen 9 6900HX 16 Inches Gaming Laptop (32GB/2TB SSD/Windows 11/Black/2.55 Kg) will enhance your productivity. Featuring an attractive design, the laptop comes with a 16 Inches display providing clear and vivid visuals while watching videos or playing games. Furthermore, the Windows 11 operating system in this laptop helps you perform your regular activities smoothly.",

    image:
      "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/alienware-notebooks/m15-r7-non-touch-non-tobii/media_gallery/laptop-alienware-m15-r7-gallery-hero-single-zone-kb.psd?fmt=png-alpha&pscan=auto&scl=1&wid=5000&hei=5000&qlt=100,1&resMode=sharp2&size=5000,5000&chrss=full&imwidth=5000",
    price: "3 lakh",
  },
  {
    name: "Acer Predator Helios ",
    category: "laptop",
    description:
      "Featuring adequate specifications, Asus ROG Zephyrus Duo 16 GX650RXZ-LB226WS AMD Ryzen 9 6900HX 16 Inches Gaming Laptop (32GB/2TB SSD/Windows 11/Black/2.55 Kg) will enhance your productivity. Featuring an attractive design, the laptop comes with a 16 Inches display providing clear and vivid visuals while watching videos or playing games. Furthermore, the Windows 11 operating system in this laptop helps you perform your regular activities smoothly.",

    image:
      "https://static-ecapac.acer.com/media/catalog/product/cache/bd4621b95a9782df56a4048f6a07bc46/p/r/predator-helios-300-ph315-55-4zone-backlit-on-wallpaper-bby-black-01_1_1.jpg",
    price: "3 lakh",
  }
]







app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports=app;
app.listen(3000);