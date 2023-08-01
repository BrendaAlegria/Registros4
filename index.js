var express=require("express");
var usuariosRutas=require("./rutas/rutas");
var app=express();
var path=require("path");
var session=require("express-session");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use("/",usuariosRutas);
app.use("/web",express.static(path.join(__dirname,"/web")));


app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:process.env.SECRETO_SESSION,
    resave:true,
    saveUninitialized:true
}));

var port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Servidor en http://localhost:${port}`);
});




