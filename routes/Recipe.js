const router = require("express").Router();
const Recipe = require("../controllers/Recipe");
const { upload, uploadVideo } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken");

router.route("/").post(upload("test", "images", "image"),Recipe.Post)
router.route("/:id").get(Recipe.getRecipeById)


module.exports = router;    