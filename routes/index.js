module.exports = (app) => {
  app.use("/auth", require("./Auth"));
  app.use("/users", require("./User"));
  app.use("/test-multer", require("./multer"));
  app.use("/post", require("./Recipe"))
  app.use("/search", require("./Search.js"))

};