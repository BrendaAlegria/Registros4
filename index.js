var express=require("express");
var usuariosRutas=require("./rutas/rutas");
var app=express();
var path=require("path");
var session=require("express-session");
var rutasRutas=require("./rutas/rutas");
require("dotenv").config();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: process.env.SECRETO_SESSION,
    resave: true,
    saveUninitialized: true
}));
app.use("/",rutasRutas);
app.use("/web",express.static(path.join(__dirname,"/web")));
app.use("/views",express.static(path.join(__dirname,"/views")));


var port=process.env.PORT || 4500;

app.listen(port,()=>{
    console.log(`Servidor en http://localhost:${port}`);
});




