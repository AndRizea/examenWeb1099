const Sequelize = require("sequelize");
const app = require("./app");

//process.env.DATABASE_URL, 
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.db"
    // dialect:"postgres",
    // protocol: "postgres",
    // dialectOptions: {
    //     ssl:{
    //         require:true,
    //         rejectUnauthorized: false
    //     }
    // }
})

sequelize.sync({
}).then(()=>{
    console.log("db is ready");
})

module.exports = sequelize