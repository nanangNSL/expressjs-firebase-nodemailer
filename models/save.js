const save = (sequelize, Sequelize) => {
    const Save = sequelize.define("save", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      }
    });
  
  
    return Save;
  };
  
  module.exports = save;
  