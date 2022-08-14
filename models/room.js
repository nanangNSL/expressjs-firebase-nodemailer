const room = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        alloNull: false,
      }
    });
  
  
    return Room;
  };
  
  module.exports = room;
  