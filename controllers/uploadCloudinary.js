const cloudinary = require("../utils/cloudinary");

exports.TesMulter = async (req, res) => {
  try {
    const path = req.file.path;
    const dataVideo = await cloudinary.uploader.upload(path, {
      folder: "video",
      resource_type: "video",
    });
    console.log(dataVideo.secure_url);
    res.send(200, { message: "successfully" });
  } catch (error) {
    res.send({ message: error });
  }
};
