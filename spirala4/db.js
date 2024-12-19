const {Sequelize} = require('sequelize');
//const noviModeli = require('./modeli');

const sequelize = new Sequelize('novi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const konektovanje = async()=>{
    try{
        await sequelize.authenticate();
        console.log("Uspijesno konektovanje na bazu");

    }catch(error){
        console.log("Greska sa konekcijom na bazu");
    }
}



module.exports = {sequelize, konektovanje};