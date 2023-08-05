var Sequelize=require("sequelize");

module.exports=(conexion)=>{
    const PropietarioSchema=conexion.define("propietario",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nomP:{
            type:Sequelize.STRING

        },
        nomPro:{
            type:Sequelize.STRING

        },
        email:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        },
        tel:{
            type:Sequelize.STRING
        }
    });
    return PropietarioSchema;

};