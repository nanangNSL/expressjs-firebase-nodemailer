const router = require("express").Router();
const Recipe = require("../controllers/Recipe");

router.route("/").get(Recipe.find)

module.exports = router;