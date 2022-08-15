const router = require("express").Router();
const Recipe = require("../controllers/Recipe");
const { verifyToken } = require("../middlewares/verifyToken");

router.route("/").post(Recipe.Post)
router.route("/:id").get(Recipe.getRecipeById)


module.exports = router;    