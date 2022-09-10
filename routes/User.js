const router = require("express").Router();
const Users = require("../controllers/User");
const {UploadImage} = require("../middlewares/multer")

router.route("/:id").patch(Users.Update).get(Users.UsersById)
router.route("/image/:id").patch(UploadImage, Users.UpdateProfile)

module.exports = router;