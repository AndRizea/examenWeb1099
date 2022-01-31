var Books = require("../models/books");
const { Op } = require("sequelize");

module.exports.findAll = async(req, res)=>{
    try{
        const books = await Books.findAll();
        console.log(req.body);
        return res.status(200).json(books);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
};

module.exports.create = async (req, res)=>{
    const newBook = await Books.create(req.body);
    return res.status(200).json(newBook);
}

module.exports.update = async(req, res)=>{
    try{
        var id = req.body.id;
        var book;
        if(id != undefined){
            book = await Books.findByPk(id);
        }

        if(book){
            if(req.body.title)
            await Books.update({title: req.body.title},{where: {id: id}})
            else
            if(req.body.genre)
            await Books.update({genre: req.body.genre},{where: {id: id}})
            else
            if(req.body.url)
            await Books.update({url:req.body.url}, {where:{id:id}})
        }
        
        return res.status(200).json(book);
    }
    catch(err){
        return res.status(500).json(err);
    }
}

module.exports.delete = async(req, res)=>{
    try{
        var id = req.body.id;
        await Books.destroy({
            where: {id: {[Op.eq]: id}}
        })
        return res.status(200).json({"message":"The book with id " + id + " was deleted!"});
    }
    catch(err){
        return res.status(500).json(err);
    }
}

module.exports.findByShelf = async(req, res)=>{
    try{
        const books = await Books.findAll({
            where:{
                ShelfId: {[Op.eq]: `${req.params.id}`}
            }
        });
        console.log(req.body);
        return res.status(200).json(books);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
};
