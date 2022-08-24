const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storagePathImages = path.join(__dirname, '../public/images');
const storagePathVideos = path.join(__dirname, '../public/videos');

const storageServer = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, storagePathImages);
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + '-' + uuidv4() + file.originalname);
  }
});
const storageServerVideo = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, storagePathVideos);
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + '-' + uuidv4() + file.originalname);
  }
});

const fileFilterImages = (req, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    console.log('Only extension png, jpg and jpeg are supported');
  }
};

const fileFilterVideos = (req, file, callback) => {
    if (
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/3gpp" ||
      file.mimetype == "video/x-msvideo" ||
      file.mimetype == "video/x-matroska" ||
      file.mimetype == "video/quicktime"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      console.log(
        "only extension mp4, 3gpp, x-msvideo, x-matroska and video/quicktime are supported"
      );
    }
  };

  exports.UploadVideo = multer({
    storage: storageServerVideo,
    fileFilter: fileFilterVideos,
    limits: { fileSize: 15 * 1024 * 1024 },
  }).single("video");

exports.UploadImage = multer({
  storage: storageServer,
  fileFilter: fileFilterImages,
  limits: { fileSize: 1 * 1024 * 1024 }
}).single('images');
