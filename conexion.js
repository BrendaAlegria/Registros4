var Sequelize = require("sequelize");
var usuarioModelo=require("./modelos/rumodelos")
var propietarioModelo=require("./modelos/guarPropi")
require("dotenv").config();

var db=process.env.DB_MYSQL ;
var usuario=process.env.USUARIO_MYSQL;
var password=process.env.PASSWORD_MYSQL;
var host=process.env.HOST_MYSQL ;
var port=process.env.PORT_MYSQL;

var conexion=new Sequelize(db,usuario,password,{
    host:host,
    port:port,
    dialect:'mysql',
    dialectOptions:{
    ssl:{
            rejectUnauthorized:true
        }
    }
});
var Usuario=usuarioModelo(conexion);
//conexion para el propietario 
var Propietario=propietarioModelo(conexion);

//sale de la aplicacion y se conecta a otro programa
conexion.sync({force:false})
.then(()=>{
    console.log("Conectado a MYSQL con planetScale Felicidades!!");
})
.catch((err)=>{
    console.log("Error al conectarse con MYSQL de PlanetScale"+err);
    // console.log("Intentar una conexcion local");
    // db=process.env.DB_LOCAL;
    // var conexion=new Sequelize(db,usuario,password,{
    //     host:host,
    //     port:port,
    //     dialect:'mysql'
    // });
});
module.exports={
    Usuario:Usuario,
    Propietario:Propietario
}