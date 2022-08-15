const router = require("express").Router();
const Users = require("../controllers/User");

router.route("/:id").patch(Users.Update).get(Users.UsersById)
router.route("/image/:id").patch(Users.UpdateProfile)

module.exports = router;