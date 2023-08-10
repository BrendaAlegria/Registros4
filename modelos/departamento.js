var Sequelize=require("sequelize");

module.exports=(conexion)=>{
    const DepartamentoSchema=conexion.define("departamento",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nomD:{
            type:Sequelize.STRING

        },
        telD:{
            type:Sequelize.STRING

        },
        direccionD:{
            type:Sequelize.STRING
        },
        costoD:{
            type:Sequelize.INTEGER(5)
        },
        tiempoD:{
            type:Sequelize.STRING()
        },
        descaD:{
            type:Sequelize.STRING(200)
        }
    });
    return DepartamentoSchema;

};