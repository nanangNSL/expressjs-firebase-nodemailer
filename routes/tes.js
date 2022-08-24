const router = require("express").Router();
const {getRecipeByLikes, getRecipeBySave} = require('../controllers/Recipe')


router.route("/:id").get(getRecipeByLikes)
router.route("/save/:id").get(getRecipeBySave)

module.exports = router;