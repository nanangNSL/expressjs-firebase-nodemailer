require("dotenv").config();
const { BUCKET_NAME } = process.env;

const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebaseInstance = require("../utils/FirebaseInstance");

const upload = (prefix, folder, field) => {
  return multer({
    storage: firebaseStorage(
      {
        bucketName: BUCKET_NAME,
        directoryPath: folder,
        namePrefix: prefix,
        unique: true,
        public: true,
      },
      firebaseInstance
    ),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
  }).single(field);
};

const uploadVideo = (prefix, folder, field) => {
  return multer({
    storage: firebaseStorage(
      {
        bucketName: BUCKET_NAME,
        directoryPath: folder,
        namePrefix: prefix,
        unique: true,
        public: true,
      },
      firebaseInstance
    ),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "video/mp4" || file.mimetype === "video/mpeg" || file.mimetype === "video/quicktime") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .mp4, .mpeg and .mov format allowed!"));
      }
    },
  }).single(field);
};

const deleteFile = (imageUrl) => {
  return firebaseInstance.storage().bucket(BUCKET_NAME).file(imageUrl).delete();
};

module.exports = { upload, uploadVideo, deleteFile };