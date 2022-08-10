require("dotenv").config();
const { hashSync, compareSync} = require("bcrypt");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const { sendOtp } = require("../utils/sendOtp")
 

exports.Register = async (req, res) => {
  const { password, confPassword } = req.body;
  if(confPassword !== password) return res.sendStatus(400, {message: "Password and Confirm Password are not the same"});
  try {
    const newUser = { ...req.body, password: hashSync(password, 10) };
    await Users.create(newUser);
    res.send({
      message: "Register Successfully created"
    });
  } catch (error) {
    res.status(400).send({ message: `Register failed  status ${error.message}` });
  }
};

exports.Login = async (req, res) =>{
  try {
    const user = await Users.findAll({
        where:{
            email: req.body.email
        }
    });
    const match = await compareSync(req.body.password, user[0].password);
    if(!match) return res.status(400).json({message: "Wrong Password"});
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const image = user[0].image;
    const accessToken = jwt.sign({userId, name, email, image}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.EXPIRE_ACCESS_TOKEN_SECRET
    });
    const refreshToken = jwt.sign({userId, name, email, image}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.EXPIRE_REFRESH_TOKEN_SECRET
    });
    await Users.update({refresh_token: refreshToken},{
        where:{
            id: userId
        }
    });
    res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
} catch (error) {
    res.status(404).json({message:"email not found you can register"});
}
}

exports.refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: process.env.EXPIRE_REFRESH_TOKEN
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}

exports.Logout = async (req, res) =>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.json({message: "successfully logout"});
}

exports.forgotPassword =  async (req, res) =>{
    const { email } = req.body
    try {
        const findEmail = await Users.findOne({where: {email: email}});
        if(!findEmail) return res.json({message: 'No email found'});
        const codeOtp = Math.floor(1000 + Math.random() * 9000);
        await Users.update({forgotPassword: codeOtp}, {where: {email: email}});
        const templateEmail = {
            from : process.env.FROM_SEND_OTP,
            to: email,
            subject: "Forgot Password",
            html: `<p>Hey ${email} To forget the password, enter this OTP code</p></br><strong>${codeOtp}</strong>`

        }
        sendOtp(templateEmail);
        res.send({message: "OTP code sent to email"})
    } catch (error) {
        res.sendStatus(404, {message: "NOT_FOUND"});
    }
}

exports.validationCode = async (req, res) => {
    try {
        let forgot = req.body.forgotPassword;
        const findCode = await Users.findOne({where: {forgotPassword: forgot}});
        if(!findCode) return res.sendStatus(404, {message: 'No forgotPassword found'});
        res.send(findCode)
    } catch (error) {
        res.sendStatus(404, {message: "OTP code does not match"});
    }
}

exports.UpdatePass = async (req, res) => {
    const { id} = req.params;
    const { password, confPassword } = req.body;
    if(confPassword !== password) return res.send({message: "Password and Confirm Password are not the same"})
    try {
        const chekId = await Users.findOne({where: {forgotPassword : id}})
        if(!chekId) return res.send( {message: "Code is not valid data not found"})
        const newPass = {...req.body, password: hashSync(password, 10) };
        await Users.update(newPass, {where: { forgotPassword : id}});
        res.send({message: "Password has been updated"})
    } catch (error) {
        res.sendStatus(404, {message: "An error occurred while updating the password"});
    }
}

exports.updatePhoto = async (req, res) =>{
    res.json("berhasil")
    console.log(req)
}
