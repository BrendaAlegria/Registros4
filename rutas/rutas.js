const { render } = require("ejs");
var ruta=require("express").Router();


ruta.post("/validar",(req,res)=>{
    if(req.body.usuario=="HARRY" && req.body.password=="28"){
        req.session.usuario=req.body.usuario;
        //renderisa principalU
        res.redirect("/principalU");
    }
    else{
        res.redirect("/error");
    }
});

//Ruta de Carga
ruta.get("/principalU",(req,res)=>{
    res.render("principalU");
});
ruta.get("/principalU",(req,res)=>{
    if(req.session.usuario){
        res.render("bienvenido",{usuario:req.session.usuario});
    }
    else{
        res.redirect("/error");
    }

});

ruta.get("/protegido",(req,res)=>{
    if(req.session.usuario){
        res.render("protegido",{usuario:req.session.usuario});
    }
    else{
        res.redirect("/error");
    }
});

ruta.get("/error",(req,res)=>{
    res.render("error");
});

ruta.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
});





//Ruta de Carga
ruta.get("/",(req,res)=>{
    res.render("carga");
});
//Ruta Principal
ruta.get("/principal",(req,res)=>{
    res.render("principal");
});

//Ruta Login General
ruta.get("/loging",(req,res)=>{
    res.render("loging");
});

//Ruta Login del Propietario
ruta.get("/loginpropi",(req,res)=>{
    res.render("loginpropi");
});

//Ruta Login del Usuario
ruta.get("/loginusuario",(req,res)=>{
    res.render("loginusuario");
});
//Ruta Registro 
ruta.get("/registro",(req,res)=>{
    res.render("registro");
});

// PAGINA PRINCIPAL GENERAL
//Ruta al link Casas
ruta.get("/casas",(req,res)=>{
    res.render("casas");
});
//Ruta al link DesCasas
ruta.get("/desCasa",(req,res)=>{
    res.render("desCasa");
});

//Ruta al link Departamentos
ruta.get("/departamentos",(req,res)=>{
    res.render("departamentos");
});
//Ruta al link DesDepartamentos
ruta.get("/desDepart",(req,res)=>{
    res.render("desDepart");
});
//Ruta al link Cuartos
ruta.get("/cuartos",(req,res)=>{
    res.render("cuartos");
});
//Ruta al link DesCuartos
ruta.get("/desCuarto",(req,res)=>{
    res.render("desCuarto");
});


// PAGINAS CATEGORIAS 
//Ruta al link Casas
ruta.get("/casas",(req,res)=>{
    res.render("casas");
});
module.exports=ruta;