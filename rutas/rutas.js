const { render } = require("ejs");
var ruta=require("express").Router();
var {Usuario} = require("../conexion");
var {Propietario} = require("../conexion");
var {Casa} = require("../conexion");
var {Cuarto} = require("../conexion");
var {Departamento} = require("../conexion");



//RUTAS ADMIN
    //CONTRASEÑA DEL ADMIN
ruta.post("/validarA",(req,res)=>{
    if(req.body.admin=="HARRY" && req.body.password=="28"){
        req.session.admin=req.body.admin;
        //renderisa bienvenido
        res.redirect("/mostrar");
    }
    else{
        res.redirect("/error");
    }
});
  //Ruta mostrar 
ruta.get("/mostrar",(req,res)=>{
    res.render("Admin/mostrar");
});



//MOSTRAR 
    //Mostrar Usuarios
ruta.get("/mostrarUsuarios",(req,res)=>{
    //console.log("entra a mostrarUsuarios..................................")
    Usuario.findAll()
    .then((s)=>{
        //console.log("then");
        //console.log(s);
        //res.end();
        res.render("Admin/mostrarUsuarios",{Usuarios:s});
    })
    .catch((err)=>{
        console.log("Error .................."+err)
        //res.end();
        res.render("error");
    });
});
    //Mostrar Proietarios
ruta.get("/mostrarPro",(req,res)=>{
    //console.log("entra a mostrarPropietarios..................................")
    Propietario.findAll()
    .then((p)=>{
        //console.log("then");
        //console.log(s);
        //res.end();
        res.render("Admin/mostrarPro",{Propietarios:p});
    })
    .catch((err)=>{
        console.log("Error .................."+err)
        //res.end();
        res.render("error");
    });
});


//BORRAR 
ruta.get("/borradoFisico/:id",(req,res)=>{//lo borra completamnete
    Usuario.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect("/mostrarUsuarios");
    })
    .catch((err)=>{
        console.log("Error .............. "+err);
        res.redirect("error");
    });
});
ruta.get("/borradoFisicoP/:id",(req,res)=>{//lo borra completamnete
    Propietario.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect("/mostrarPro");
    })
    .catch((err)=>{
        console.log("Error .............. "+err);
        res.redirect("error");
    });
});


//EDITAR
ruta.get("/editarUsuario/:id",(req, res)=>{
    Usuario.findByPk(req.params.id)
    .then((usuario)=>{
        console.log("Entro en then editar");
        res.render("Admin/modificarUsuario",{usuario:usuario});
    })
    .catch((err)=>{
        console.log("Error en editar ........... "+err);
        res.redirect("error");
    });
});
    //propietario
ruta.get("/editarPro/:id",(req, res)=>{
    Propietario.findByPk(req.params.id)
    .then((propietario)=>{
        console.log("Entro en then editar propietario");
        res.render("Admin/modificarPro",{propietario:propietario});
    })
    .catch((err)=>{
        console.log("Error en editar propietario ........... "+err);
        res.redirect("error");
    });
});

//MODIFICAR USUARIO 
ruta.post("/modificarUsuario",(req,res)=>{
    Usuario.update(req.body,{where:{id:req.body.id}})
    .then(()=>{
        console.log("Entro en then modificar");
        res.redirect("mostrarUsuarios");
    })
    .catch((err)=>{
        console.log("Error en mostrar................. "+err);
        res.redirect("error");
    });
});
//propietario
ruta.post("/modificarPro",(req,res)=>{
    Propietario.update(req.body,{where:{id:req.body.id}})
    .then(()=>{
        console.log("Entro en then modificar");
        res.redirect("mostrarPro");
    })
    .catch((err)=>{
        console.log("Error en mostrar................. "+err);
        res.redirect("error");
    });
});
//CERRAR SESION 
  //Usuario
ruta.get("/logoutU",(req,res)=>{
    req.session=null;
    res.redirect("/principal")
});
ruta.get("/logoutP",(req,res)=>{
    req.session=null;
    res.redirect("/principal")
});
ruta.get("/logoutA",(req,res)=>{
    req.session=null;
    res.redirect("/principal")
});

//RUTAS DE LOGIN 
//RUTAS DE LOGIN Usuario
ruta.post("/validarU", (req, res) => {
     Usuario.findAll({ where: {nomUsu:req.body.nomUsu, password:req.body.password } })
         .then((u) => {
             if (u != "") {
                 req.session.nomU = u[0].nomU;
                 console.log("then if");
                 res.redirect("/principalU" );
             } else {
                console.log("then else");
                 res.redirect("/loginusuario");
             }
         })
         .catch((err) => {
             console.log("Error en login ........: " + err);
             res.redirect("/errorloU");
         });
});
//Ruta De Validacion Login USUARIO 
ruta.get("/principalU",(req,res)=>{
    if(req.session.nomU){
        res.render("principalU");
    }
    else{
        res.redirect("/error");
    }
});
//RUTAS DE LOGIN Propietario 
ruta.post("/validarP", (req, res) => {
    Propietario.findAll({ where: {nomPro:req.body.nomPro, password:req.body.password } })
        .then((p) => {
            if (p != "") {
                req.session.nomP = p[0].nomP;
                console.log("then if");
                res.redirect("/principalP");
            } else {
               console.log("then else");
                res.redirect("/loginpropi");
            }
        })
        .catch((err) => {
            console.log("Error en login ........: " + err);
            res.redirect("/errorloP");
        });
});
//Ruta De Validacion Login PROPIETARIO
ruta.get("/principalP",(req,res)=>{
    if(req.session.nomP){
        res.render("principalP");
    }
    else{
        res.redirect("/error");
    }
});



//RUTAS REGISTRO
   //Rutas De Registro donde Guarda el usuario 
ruta.post("/guardarU",(req,res)=>{
    Usuario.create(req.body)
    .then(()=>{
        res.redirect("/loginusuario");
    })
    .catch((err)=>{
        console.log("Error al registrar el usuario......."+err);
        res.redirect("/errorU");
    })
});
   //Rutas De Registro donde Guarda el PROPIETARIO
ruta.post("/guardarP",(req,res)=>{
    Propietario.create(req.body)
    .then(()=>{
        res.redirect("/loginpropi");
    })
    .catch((err)=>{
        console.log("Error al registrar el Propietario......."+err);
        res.redirect("/errorP");
    })
});

//RUTAS REGISTRO SERVICIOS
   //Rutas De Registro donde Guarda Casas
   ruta.post("/nuevaCasa",(req,res)=>{
    Casa.create(req.body)
    .then(()=>{
        res.redirect("desCasaP");
    })
    .catch((err)=>{
        console.log("Error al registrar el usuario......."+err);
        res.redirect("/error");
    })
});
    //muestra las casas
ruta.get("/desCasaP",(req,res)=>{
    //console.log("entra a mostrarPropietarios..................................")
    Casa.findAll()
    .then((c)=>{
        //console.log("then");
        //console.log(s);
        //res.end();
        res.render("Casas/desCasaP",{Casas:c});
    })
    .catch((err)=>{
        console.log("Error .................."+err)
        //res.end();
        res.render("error");
    });
});
ruta.get("/desCasaU",(req,res)=>{
    //console.log("entra a mostrarPropietarios..................................")
    Casa.findAll()
    .then((c)=>{
        //console.log("then");
        //console.log(s);
        //res.end();
        res.render("Casas/desCasaU",{Casas:c});
    })
    .catch((err)=>{
        console.log("Error .................."+err)
        //res.end();
        res.render("error");
    });
});
    //borra las casas
ruta.get("/borradoCa/:id",(req,res)=>{//lo borra completamnete
    Casa.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect("/desCasaP");
    })
    .catch((err)=>{
        console.log("Error .............. "+err);
        res.redirect("error");
    });
});
    //edita las casas
ruta.get("/editarCa/:id",(req, res)=>{
    Casa.findByPk(req.params.id)
    .then((casa)=>{
        console.log("Entro en then editar CASA");
        res.render("Casas/casasMP",{casa:casa});
    })
    .catch((err)=>{
        console.log("Error en editar propietario ........... "+err);
        res.redirect("error");
    });
});
//modifica casas
ruta.post("/casasMP",(req,res)=>{
    Casa.update(req.body,{where:{id:req.body.id}})
    .then(()=>{
        console.log("Entro en then modificar");
        res.redirect("desCasaP");
    })
    .catch((err)=>{
        console.log("Error en mostrar................. "+err);
        res.redirect("error");
    });
});

//CUARTOS
//Rutas De Registro donde Guarda Cuartos
ruta.post("/nuevoCuarto",(req,res)=>{
    Cuarto.create(req.body)
    .then(()=>{
        res.redirect("desCuartoP");
    })
    .catch((err)=>{
        console.log("Error al registrar el cuarto......."+err);
        res.redirect("/error");
    })
});
    //muestra las Cuartos
ruta.get("/desCuartoP",(req,res)=>{
    //console.log("entra a mostrarPropietarios..................................")
    Cuarto.findAll()
    .then((cu)=>{
        //console.log("then");
        //console.log(s);
        //res.end();
        res.render("Cuartos/desCuartoP",{Cuartos:cu});
    })
    .catch((err)=>{
        console.log("Error .................."+err)
        //res.end();
        res.render("error");
    });
});
//muestra cuarto en usuario
ruta.get("/desCuartoU",(req,res)=>{
    //console.log("entra a mostrarPropietarios..................................")
    Cuarto.findAll()
    .then((cua)=>{
        //console.log("then");
        //console.log(s);
        //res.end();
        res.render("Casas/desCuartoU",{Cuartos:cua});
    })
    .catch((err)=>{
        console.log("Error .................."+err)
        //res.end();
        res.render("error");
    });
});
    //borra las cuarto
ruta.get("/borradoCu/:id",(req,res)=>{//lo borra completamnete
    Cuarto.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect("/desCuartoP");
    })
    .catch((err)=>{
        console.log("Error .............. "+err);
        res.redirect("error");
    });
});
    //edita los cuartos
ruta.get("/editarCu/:id",(req, res)=>{
    Cuarto.findByPk(req.params.id)
    .then((cuarto)=>{
        console.log("Entro en then editar Cuarto");
        res.render("Cuartos/cuartosMP",{cuarto:cuarto});
    })
    .catch((err)=>{
        console.log("Error en editar cuarto ........... "+err);
        res.redirect("error");
    });
});
//MODIFICAR cuartos
ruta.post("/cuartosMP",(req,res)=>{
    Cuarto.update(req.body,{where:{id:req.body.id}})
    .then(()=>{
        console.log("Entro en then modificar");
        res.redirect("desCasaP");
    })
    .catch((err)=>{
        console.log("Error en mostrar................. "+err);
        res.redirect("error");
    });
});


//DEPARTAMENTOS
//Rutas De Registro donde Guarda Departamentos
ruta.post("/nuevoDepa",(req,res)=>{
    Departamento.create(req.body)
    .then(()=>{
        res.redirect("desDepartP");
    })
    .catch((err)=>{
        console.log("Error al registrar el depa......."+err);
        res.redirect("/error");
    })
});
    //muestra los Departamentos
ruta.get("/desDepartP",(req,res)=>{
    //console.log("entra a mostrarDepartamentos..................................")
    Departamento.findAll()
    .then((d)=>{
        //console.log("then");
        //console.log(s);
        //res.end();
        res.render("Departamentos/desdepartP",{Departamentos:d});
    })
    .catch((err)=>{
        console.log("Error .................."+err)
        //res.end();
        res.render("error");
    });
});
//muestra Departamentos en usuario
ruta.get("/desDepartU",(req,res)=>{
    //console.log("entra a mostrarDepartamentos..................................")
    Departamento.findAll()
    .then((d)=>{
        //console.log("then");
        //console.log(s);
        //res.end();
        res.render("Departamentos/desDepartU",{Departamentos:d});
    })
    .catch((err)=>{
        console.log("Error .................."+err)
        //res.end();
        res.render("error");
    });
});
    //borra los Departamentos
ruta.get("/borraDe/:id",(req,res)=>{//lo borra completamnete
    Departamento.destroy({where:{id:req.params.id}})
    .then(()=>{
        res.redirect("/desDepartP");
    })
    .catch((err)=>{
        console.log("Error .............. "+err);
        res.redirect("error");
    });
});
    //edita los Departamentos
ruta.get("/editarDe/:id",(req, res)=>{
    Departamento.findByPk(req.params.id)
    .then((departamento)=>{
        console.log("Entro en then editar DEPA");
        res.render("Departamentos/departMP",{departamento:departamento});
    })
    .catch((err)=>{
        console.log("Error en editar cuarto ........... "+err);
        res.redirect("error");
    });
});
//MODIFICAR cuartos
ruta.post("/departMP",(req,res)=>{
    Departamento.update(req.body,{where:{id:req.body.id}})
    .then(()=>{
        console.log("Entro en then modificar");
        res.redirect("desDepartP");
    })
    .catch((err)=>{
        console.log("Error en mostrar................. "+err);
        res.redirect("error");
    });
});




//RUTAS ERROR
//Ruta de Error de Usuario
ruta.get("/errorU",(req,res)=>{
    res.render("Error/errorU");
});
//Ruta de Error de Propietario
ruta.get("/errorP",(req,res)=>{
    res.render("Error/errorP");
});
//Ruta de Error de Login de Usuario
ruta.get("/errorloU",(req,res)=>{
    res.render("Error/errorloU");
});
//Ruta de Error de Login de Propietario
ruta.get("/errorloU",(req,res)=>{
    res.render("Error/errorloU");
});

//MOSTRAR DATOS

ruta.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
});


//CARGA
//Ruta de Carga
ruta.get("/",(req,res)=>{
    res.render("Carga/carga");
});

// PAGINAS PRINCIPALES 
//Ruta de Pagina Principal
ruta.get("/principal",(req,res)=>{
    res.render("principal");
});
//Ruta de Pagina Principal Propietario 
ruta.get("/principalP",(req,res)=>{
    res.render("principalP");
});
//Ruta de Pagina Principal Usuario
ruta.get("/principalU",(req,res)=>{
    res.render("principalU");
});



//LOGIN 
//Ruta Login General
ruta.get("/loging",(req,res)=>{
    res.render("Login/loging");
});

//Ruta Login del Propietario
ruta.get("/loginpropi",(req,res)=>{
    res.render("Login/loginpropi");
});

//Ruta Login del Usuario
ruta.get("/loginusuario",(req,res)=>{
    res.render("Login/loginusuario");
});

//Ruta Login del Administrador
ruta.get("/loginA",(req,res)=>{
    res.render("Login/loginA");
});


//REGISTROS
//Ruta Registro 
ruta.get("/registro",(req,res)=>{
    res.render("Registros/registro");
});
//Ruta Registro Propietario
ruta.get("/regisP",(req,res)=>{
    res.render("Registros/regisP");
});
//Ruta Registro Usuario
ruta.get("/regisU",(req,res)=>{
    res.render("Registros/regisU");
});


//CASAS 
//Ruta al link Casas
ruta.get("/casas",(req,res)=>{
    res.render("Casas/casas");
});
//Ruta al link DesCasas
ruta.get("/desCasa",(req,res)=>{
    res.render("Casas/desCasa");
});
//Ruta al link Casas Usuario
ruta.get("/casasU",(req,res)=>{
    res.render("Casas/casasU");
});
//Ruta al link DesCasas Usuario
ruta.get("/desCasaU",(req,res)=>{
    res.render("Casas/desCasaU");
});
//Ruta al link Casas Propietario
ruta.get("/casasP",(req,res)=>{
    res.render("Casas/casasP");
});
//Ruta al link DesCasas Propietario
ruta.get("/desCasaP",(req,res)=>{
    res.render("Casas/desCasaP");
});


//DEPARTAMENTOS
//Ruta al link Departamentos
ruta.get("/departamentos",(req,res)=>{
    res.render("Departamentos/departamentos");
});
//Ruta al link DesDepartamentos
ruta.get("/desDepart",(req,res)=>{
    res.render("Departamentos/desDepart");
});
//Ruta al link Departamentos Usuario
ruta.get("/departamentosU",(req,res)=>{
    res.render("Departamentos/departamentosU");
});
//Ruta al link DesDepartamentos Usuario
ruta.get("/desDepartU",(req,res)=>{
    res.render("Departamentos/desDepartU");
});
//Ruta al link Departamentos Propietario
ruta.get("/departamentosP",(req,res)=>{
    res.render("Departamentos/departamentosP");
});
//Ruta al link DesDepartamentos Propietario
ruta.get("/desDepartP",(req,res)=>{
    res.render("Departamentos/desDepartP");
});


//CUARTOS
//Ruta al link Cuartos
ruta.get("/cuartos",(req,res)=>{
    res.render("Cuartos/cuartos");
});
//Ruta al link DesCuartos
ruta.get("/desCuarto",(req,res)=>{
    res.render("Cuartos/desCuarto");
});
//Ruta al link Cuartos Usuario
ruta.get("/cuartosU",(req,res)=>{
    res.render("Cuartos/cuartosU");
});
//Ruta al link DesCuartos Usuario
ruta.get("/desCuartoU",(req,res)=>{
    res.render("Cuartos/desCuartoU");
});
//Ruta al link Cuartos Propietario
ruta.get("/cuartosP",(req,res)=>{
    res.render("Cuartos/cuartosP");
});
//Ruta al link DesCuartos Propietario
ruta.get("/desCuartoP",(req,res)=>{
    res.render("Cuartos/desCuartoP");
});



//ADMIN

//Ruta al link modificarUsuario
ruta.get("/modificarUsuario",(req,res)=>{
    res.render("Admin/modificarUsuario");
});
//Ruta al link mostrarUsuario 
ruta.get("/mostrarUsuario ",(req,res)=>{
    res.render("Admin/mostrarUsuario ");
});
//Ruta al link NuevoUsuario
ruta.get("/nuevoUsuario",(req,res)=>{
    res.render("Admin/nuevoUsuario");
});

module.exports=ruta;