const video = (sequelize, Sequelize) => {
    const Video = sequelize.define("video", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      video: {
        type: Sequelize.STRING,
        alloNull: false,
      }
    });
  
  
    return Video;
  };
  
  module.exports = video;
  