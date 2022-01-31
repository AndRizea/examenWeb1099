const datatypes = require("sequelize");
const sequalize = require("../sequelize");


const Books = sequalize.define("Books", {
    id:{
        type: datatypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    title:{
        type: datatypes.STRING,
        allowNull: false,
        validate: {len:[5, 255]}
    },
    genre:{
        type: datatypes.STRING,
        allowNull: false,
        validate: {isIn:[['SF', 'COMEDY', 'TRAGEDY', 'HISTORY', 'ROMANCE']]}
    },
    url:{
        type:datatypes.STRING, 
        allowNull: false,
        validate:{isUrl:true}
    }
})


module.exports = Books