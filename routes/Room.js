const router = require("express").Router();
const { insert, getAll, getId} = require("../controllers/Room")


router.route("/").post(insert).get(getAll)
router.route("/:id").get(getId)


module.exports = router;