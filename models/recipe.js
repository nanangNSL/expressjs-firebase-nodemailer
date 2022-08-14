const recipe = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipe", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      alloNull: false,
    },
    inggredients: {
      type: Sequelize.STRING,
      alloNull: true,
    },
    image: {
      type: Sequelize.STRING,
      alloNull: true,
    }
  });


  return Recipe;
};

module.exports = recipe;
