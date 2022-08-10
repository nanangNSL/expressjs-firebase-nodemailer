require("dotenv").config();
const { Users } = require("../models");
const { hashSync } = require("bcrypt");

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
    if (!find) return res.send(401, { mesage: "profile not found" });
    await Users.update(
      { image: req.file.publicUrl },
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
    const find = await Users.findByPk(id);
    if (!find) {
      res.send(401, { mesage: "profile not found" });
    } else {
      res.json(find);
    }
  } catch (error) {
    res.send(401, { message: error.message });
  }
};
