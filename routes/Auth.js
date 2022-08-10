const router = require("express").Router();
const Auth = require("../controllers/Auth");

router.route("/").post(Auth.Register);
router.route("/login").post(Auth.Login);
router.route("/token").post(Auth.refreshToken);
router.route("/forgot").patch(Auth.forgotPassword);
router.route("/logout").delete(Auth.Logout);
router.route("/code").post(Auth.validationCode);
router.route("/update/:id").patch(Auth.UpdatePass);
router.route("/profile/:id").patch(Auth.updatePhoto);

module.exports = router;