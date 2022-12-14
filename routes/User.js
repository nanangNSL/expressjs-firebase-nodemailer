const router = require("express").Router();
const Users = require("../controllers/User");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken");

router.route("/:id").patch(Users.Update).get(Users.UsersById)
router.route("/image/:id").patch(upload("test", "images", "image"), Users.UpdateProfile)

module.exports = router;