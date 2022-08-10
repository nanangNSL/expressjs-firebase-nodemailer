require("dotenv").config();
const { Recipe } = require("../models");
const { Op } = require("sequelize");

exports.Post = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      image: req.file.publicUrl,
    };
   const postUpload=  await Recipe.create(postData);
    res.status(200).send(postUpload);
  } catch (error) {
    console.log(error)
    res.send({ message: error.message });
  }
};

exports.find = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.q || "";
  const offset = limit * page;
  const totalRows = await Recipe.count({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: "%"+search+"%",
          },
        },
        {
          inggredients: {
            [Op.like]: "%"+search+"%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Recipe.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: "%"+search+"%",
          },
        },
        {
          inggredients: {
            [Op.like]: "%"+search+"%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "ASC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};


exports.getRecipeById = async (req, res) =>{
  const { id}= req.params;
  try {
    const findRecipeId = await Recipe.findOne({where: { id: id}});
    if(findRecipeId){
      res.send(findRecipeId)
    }
  } catch (error) {
    res.send({message: error.response})
  }
}


