const datatypes = require("sequelize");
const sequalize = require("../sequelize");
const Books = require("./books")

const Shelf = sequalize.define("Shelf", {
    id:{
        type: datatypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    description:{
        type: datatypes.STRING,
        allowNull: false,
        validate: {len: [3, 255]}
    },
    date:{
        type: datatypes.DATE,
        allowNull: false,
        validate: {isDate:true}
    }
})

Shelf.hasMany(Books, {as:"books"})

module.exports = Shelf