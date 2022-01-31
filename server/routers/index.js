const shelfController = require("../controllers/bookController");
const bookController = require("../controllers/shelfController");
var express = require("express");
var router = express.Router();

router.route("/shelves")
.get(shelfController.findAll)
.post(shelfController.create)
.put(shelfController.update)
.delete(shelfController.delete);
router.route("/shelves/id/:id").get(bookController.findAllWithBook)

router.route("/books")
.get(bookController.findAll)
.post(bookController.create)
.put(bookController.update)
.delete(bookController.delete);



module.exports = router;