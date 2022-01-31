var Shelves = require("../models/shelf")
const {Op} = require("sequelize")
var Books = require("../models/books")

module.exports.findAll = async (req,res)=>{
    try{
        const shelves = await Shelves.findAll();
        console.log(req.body)
        return res.status(200).json(shelves);
    } catch(err){
    res.status(500).json(err);
}
};

module.exports.create = async (req,res)=>{
    const newShelf = await Shelves.create(req.body);
    return res.status(200).json(newShelf);
}

module.exports.update = async(req, res)=>{
    try{
        var id = req.body.id;
        var shelf;
        if(id != undefined){
            shelf = await Shelves.findByPk(id);
        }

        if(shelf){
            if(req.body.description)
            await Shelves.update({description: req.body.description}, {where: {id: id}});
            if(req.body.date)
            await Shelves.update({date:req.body.date}, {where: {id:id}});
        }
        
        return res.status(200).json(shelf);
    }
    catch(err){
        return res.status(500).json(err);
    }
}

module.exports.delete = async(req, res)=>{
    try{
        var id = req.body.id;
        await Shelves.destroy({
            where: {id: {[Op.eq]: id}}
        })
        return res.status(200).json({"message":"The shelf with id " + id + " was deleted!"});
    }
    catch(err){
        return res.status(500).json(err);
    }
}

module.exports.findAllWithBook = async(req, res)=>{
    try{
        const shelves = await Shelves.findAll(
            {include:[{
            model: Books,
            as: "book", 
            required: true
        }]});
        console.log(req.body);
        return res.status(200).json(shelves);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
};

