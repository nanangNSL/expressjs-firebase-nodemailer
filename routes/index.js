module.exports = (app) => {
  app.use("/auth", require("./Auth"));
  app.use("/users", require("./User"));
  app.use("/post", require("./Recipe"))
  app.use("/search", require("./Search.js"))
  app.use("/room", require("./Room"))

};