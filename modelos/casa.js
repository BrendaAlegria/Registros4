var Sequelize=require("sequelize");

module.exports=(conexion)=>{
    const CasaSchema=conexion.define("casa",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nomPropi:{
            type:Sequelize.STRING

        },
        tel:{
            type:Sequelize.STRING

        },
        direccion:{
            type:Sequelize.STRING
        },
        costo:{
            type:Sequelize.INTEGER(5)
        },
        tiempo:{
            type:Sequelize.STRING()
        },
        desca:{
            type:Sequelize.STRING(200)
        }
    });
    return CasaSchema;

};