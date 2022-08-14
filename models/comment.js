const comment = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      comment: {
        type: Sequelize.STRING,
        alloNull: false,
      }
    });
  
  
    return Comment;
  };
  
  module.exports = comment;
  