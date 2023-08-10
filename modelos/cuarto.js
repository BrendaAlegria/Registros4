var Sequelize=require("sequelize");

module.exports=(conexion)=>{
    const CuartoSchema=conexion.define("cuarto",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nomC:{
            type:Sequelize.STRING

        },
        telC:{
            type:Sequelize.STRING

        },
        direccionC:{
            type:Sequelize.STRING
        },
        costoC:{
            type:Sequelize.INTEGER(5)
        },
        tiempoC:{
            type:Sequelize.STRING()
        },
        desC:{
            type:Sequelize.STRING(200)
        }
    });
    return CuartoSchema;

};