const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'web_cv',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
let connectDB = async ()=>{
    try{
        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
         }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
         });
    } catch(e){
        console.log(e)
    }
}
module.exports= connectDB;