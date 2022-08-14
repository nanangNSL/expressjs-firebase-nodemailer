const like = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      like: {
        type: Sequelize.STRING,
        alloNull: false,
      }
    });
  
  
    return Like;
  };
  
  module.exports = like;
  