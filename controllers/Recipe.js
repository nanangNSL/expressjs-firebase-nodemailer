require("dotenv").config();
const { Recipe, Like, Comment, Save, Video } = require("../models");
const { Op } = require("sequelize");
const cloudinary = require('../utils/cloudinary');

exports.Post = async (req, res) => {
  try {
    const path = req.file.path
    const dataImages =  await cloudinary.uploader.upload(path, {
         folder: 'images'
       });
       console.log(dataImages)
    const postData = {
      ...req.body,
      image: dataImages.secure_url,
    };
    const postUpload = await Recipe.create(postData);
    res.status(200).send(postUpload);
  } catch (error) {
    console.log(error);
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
            [Op.like]: "%" + search + "%",
          },
        },
        {
          inggredients: {
            [Op.like]: "%" + search + "%",
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
            [Op.like]: "%" + search + "%",
          },
        },
        {
          inggredients: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const findRecipeId = await Recipe.findOne({
      where: { id: id },
      include: [
        {
          model: Like,
          required: false,
        },
        {
          model: Comment,
          required: false,
        },
        {
          model: Video,
          required: false,
        },
      ],
    });
    if (findRecipeId) {
      res.send(findRecipeId);
    }
  } catch (error) {
    res.send({ message: error.response });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Recipe.findAll({
      include: [
        {
          model: Like,
          required: false,
        },
        {
          model: Comment,
          required: false,
        },
        {
          model: Video,
          required: false,
        },
      ],
    });
    if (!data) return res.send({ message: "recipe not found" });
    res.json(data);
  } catch (error) {
    res.send({ message: error.response });
  }
};
exports.LikePost = async (req, res) => {
  try {
    postLikes = { ...req.body };
    const postUpload = await Like.create(postLikes);
    res.send({ postUpload });
  } catch (error) {
    res.send({ message: error.response });
  }
};
exports.Unlike = async (req, res) => {
  const { id } = req.params;
  try {
    const findLikes = await Like.destroy({ where: { id: id } });
    if (findLikes) res.send({ message: "Unlike Post" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

exports.Comment = async (req, res) => {
  try {
    postComment = { ...req.body };
    const postUpload = await Comment.create(postComment);
    res.send({ postUpload });
  } catch (error) {
    res.send({ message: error.response });
  }
};

exports.SaveRecipe = async (req, res) => {
  try {
    saveRecipe = { ...req.body };
    const postUpload = await Save.create(saveRecipe);
    res.send({ postUpload });
  } catch (error) {
    res.send({ message: error.response });
  }
};

exports.Unsave = async (req, res) => {
  const { id } = req.params;
  try {
    const findSave = await Save.destroy({ where: { id: id } });
    if (findSave) res.send({ message: "Unsave Post" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

exports.InsertVideo = async (req, res) => {
  console.log(req)
  try {
    const path = req.file.path;
    const dataVideo = await cloudinary.uploader.upload(path, {
      folder: "video",
      resource_type: "video",
    });
    const postData = {
      ...req.body,
      video: dataVideo.secure_url,
    };
    const data = await Video.create(postData);
    if (!data) return res.send({ message: "Error creating video" });
    res.send(data);
  } catch (error) {
    res.send({ message: error.message });
  }
};

exports.getRecipeByLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const findRecipe = await Recipe.findAll({
      include: [
        {
          model: Like,
          where: { userId : id}
        }
      ]
    });
    res.send(findRecipe);
    console.log(findRecipe);
}catch(error) {
res.send({message: 'recipe', error})
}
}
exports.getRecipeBySave = async (req, res) => {
  try {
    const { id } = req.params;
    const findRecipe = await Recipe.findAll({
      include: [
        {
          model: Save,
          where: { userId : id}
        }
      ]
    });
    res.send(findRecipe);
    console.log(findRecipe);
}catch(error) {
res.send({message: 'recipe', error})
}
}