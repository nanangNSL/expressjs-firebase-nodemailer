const router = require("express").Router();
const Recipe = require("../controllers/Recipe");
const { uploadVideo } = require("../middlewares/multer");

router.route("/").get(Recipe.find)
router.route("/home").get(Recipe.getAll)
router.route("/like").post(Recipe.LikePost)
router.route("/unlike/:id").post(Recipe.Unlike)
router.route("/comment").post(Recipe.Comment)
router.route("/save").post(Recipe.SaveRecipe)
router.route("/save/:id").post(Recipe.Unsave)
router.route("/video").post(uploadVideo("test", "video", "video"),Recipe.InsertVideo)

module.exports = router;