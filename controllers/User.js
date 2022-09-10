require("dotenv").config();
const { Users, Save, Like, Comment } = require("../models");
const { hashSync } = require("bcrypt");
const cloudinary = require('../utils/cloudinary');


exports.Update = async (req, res) => {
  const { id } = req.params;
  const { password, confPassword } = req.body;
  if (password !== confPassword)
    return res.send(401, { message: "Password not match" });
  try {
    const find = await Users.findByPk(id);
    if (!find) return res.send(401, { mesage: "profile not found" });
    const updateUser = { ...req.body, password: hashSync(password, 10) };
    await Users.update(updateUser, {
      where: {
        id: id,
      },
    });
    res.json({ mesage: "profile updated successfully" });
  } catch (error) {
    res.send(401, { message: error.message });
  }
};

exports.UpdateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const find = await Users.findByPk(id);
    if (!find) return res.status(401).send({ mesage: "profile not found" });
    const path = req.file.path
    const dataImages =  await cloudinary.uploader.upload(path, {
         folder: 'User'
       });
   console.log(dataImages)
    await Users.update(
      { image: dataImages.secure_url},
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ mesage: "profile updated successfully" });
  } catch (error) {
    res.send(401, { message: error.message });
  }
};

exports.UsersById = async (req, res) => {
  const { id } = req.params;
  try {
    const find = await Users.findOne({
      where: { id: id },
      include:[
        {
          model: Like,
          required: false,
        },
        {
          model: Save,
          required: false,
        }
      ]
    });
    if (!find) {
      res.send(401, { mesage: "profile not found" });
    } else {
      res.json(find);
    }
  } catch (error) {
    res.send(401, { message: error.message });
  }
};
