const router = require("express").Router();
const { uploadVideo } = require("../middlewares/multer");

router.route("/").post(uploadVideo("test", "video", "file"), (req, res) => {
  try {
    res.json(req.file.publicUrl);
  } catch (error) {
    next(error);
  }
});

module.exports = router;