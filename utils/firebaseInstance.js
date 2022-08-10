const admin = require("firebase-admin");
const credentials = require("./Credentials.json");
require("dotenv").config()

const firebaseInstance = admin.initializeApp({
  credential: admin.credential.cert(credentials),
  storageBucket: process.env.BUCKET_NAME,
});

module.exports = firebaseInstance;