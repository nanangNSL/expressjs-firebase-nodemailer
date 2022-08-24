const router = require("express").Router();
const Recipe = require("../controllers/Recipe");
const { verifyToken } = require("../middlewares/verifyToken");
const {UploadImage} = require("../middlewares/multer")

router.route("/").post(UploadImage, Recipe.Post)
router.route("/:id").get(Recipe.getRecipeById)


module.exports = router;    