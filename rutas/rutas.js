const { render } = require("ejs");
var ruta=require("express").Router();
var {Usuario} = require("../conexion");
var {Propietario} = require("../conexion");

//RUTAS DE LOGIN 
// ruta.post("/validar",(req,res)=>{
//     console.log(req.body);
//     Usuario.findAll({where:{nomUsu:req.body.nomUsu,password:req.body.password}})
//     .then((nomUsu)=>{
//         if(nomUsu!=""){
//             req.session.nomUsu=nomUsu[0].nomUsu;
//             res.redirect("/principalU");
//         }
//         else{
//             res.redirect("/loging");
//         }
        
//     })
//     .catch((err)=>{
//         console.log("Error en login ........ "+err);
//         res.redirect("/");
//     });
// });

// ruta.get("/bienvenido",(req,res)=>{
//     console.log(req.session.usuario);
//     if(req.session.usuario==undefined || req.session.usuario=="" || req.session.usuario==null){
//         res.redirect("login");
//     }
//     else{
//         res.render("bienvenido",{usuario:req.session.usuario});
//     }
// });

// ruta.get("/logout",(req,res)=>{
//     req.session=null;
//     res.redirect("/")
// });

// ruta.get("/",(req,res)=>{
//     Usuario.findAll({where:{status:1}})
//     .then((usu)=>{
//         //console.log(usu);
//         res.render("mostrarUsuario",{Usuarios:usu});
//     })
//     .catch((err)=>{
//         console.log("Error .................."+err)
//         res.render("mostrarUsuario");
//     });
// });

// ruta.get("/nuevoUsuario",(req, res)=>{
//     res.render("nuevoUsuario");
// });

// ruta.post("/nuevoUsuario",(req,res)=>{
//     console.log(req.body);
//     Usuario.create(req.body)
//     .then(()=>{
//         res.redirect("/")
//     })
//     .catch((err)=>{
//         console.log("error "+err);
//         res.redirect("/");
//     });
// });

// ruta.get("/editarUsuario/:id",(req, res)=>{
//     Usuario.findByPk(req.params.id)
//     .then((usuario)=>{
//         res.render("modificarUsuario",{usuario:usuario});
//     })
//     .catch((err)=>{
//         console.log("Error ........... "+err);
//         res.redirect("/");
//     });
// });

// ruta.post("/modificarUsuario",(req,res)=>{
//     Usuario.update(req.body,{where:{id:req.body.id}})
//     .then(()=>{
//         res.redirect("/");
//     })
//     .catch((err)=>{
//         console.log("Error ................. "+err);
//         res.redirect("/");
//     });
// });

// ruta.get("/borradoFisico/:id",(req,res)=>{
//     Usuario.destroy({where:{id:req.params.id}})
//     .then(()=>{
//         res.redirect("/");
//     })
//     .catch((err)=>{
//         console.log("Error .............. "+err);
//         res.redirect("/");
//     });
// });

// ruta.get("/borradoLogico/:id",(req,res)=>{
//     Usuario.update({status:0},{where:{id:req.params.id}})
//     .then(()=>{
//         res.redirect("/")
//     })
//     .catch((err)=>{
//         console.log("Error ................. "+err);
//         res.redirect("/");
//     });
// });

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

//Error
//Ruta de Error de Usuario
ruta.get("/errorU",(req,res)=>{
    res.render("Error/errorU");
});
//Ruta de Error de Usuario
ruta.get("/errorP",(req,res)=>{
    res.render("Error/errorP");
});


//Rutas De USUARIO 
ruta.get("/principalU",(req,res)=>{
    if(req.session.usuario){
        res.render("principalU",{usuario:req.session.usuario});
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