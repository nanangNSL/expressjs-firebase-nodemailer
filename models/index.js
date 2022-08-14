require("dotenv").config();

const Sequelize = require("sequelize");
let sequelize;
if(process.env.MODE === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);
}else{
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB,
  logging: false,
});
}


const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require("./users.js")(sequelize, Sequelize);
db.Recipe = require("./recipe.js")(sequelize, Sequelize);
db.Room = require("./room.js")(sequelize, Sequelize);
db.Like = require("./like.js")(sequelize, Sequelize);
db.Video = require("./video.js")(sequelize, Sequelize);
db.Comment = require("./comment.js")(sequelize, Sequelize);
db.Save = require("./save.js")(sequelize, Sequelize);


db.Users.belongsToMany(db.Recipe, { through: db.Like });
db.Recipe.belongsToMany(db.Users, { through: db.Like });
db.Users.hasMany(db.Like);
db.Like.belongsTo(db.Users);
db.Recipe.hasMany(db.Like);
db.Like.belongsTo(db.Recipe);

db.Users.belongsToMany(db.Recipe, { through: db.Save });
db.Recipe.belongsToMany(db.Users, { through: db.Save });
db.Users.hasMany(db.Save);
db.Save.belongsTo(db.Users);
db.Recipe.hasMany(db.Save);
db.Save.belongsTo(db.Recipe);

db.Users.belongsToMany(db.Recipe, { through: db.Comment });
db.Recipe.belongsToMany(db.Users, { through: db.Comment });
db.Users.hasMany(db.Comment);
db.Comment.belongsTo(db.Users);
db.Recipe.hasMany(db.Comment);
db.Comment.belongsTo(db.Recipe);

db.Users.belongsToMany(db.Recipe, { through: db.Video });
db.Recipe.belongsToMany(db.Users, { through: db.Video });
db.Users.hasMany(db.Video);
db.Video.belongsTo(db.Users);
db.Recipe.hasMany(db.Video);
db.Video.belongsTo(db.Recipe);



module.exports = db;  