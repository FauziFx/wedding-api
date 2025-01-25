const { user, Sequelize } = require("./../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let self = {};

/**
 * @description Login
 * @type POST
 * @path /v1/login
 * @param {*} req
 * @param {*} res
 *
 * @returns JSON
 */
self.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const dataUser = await user.findOne({
      where: {
        email: email,
      },
    });
    if (!dataUser) {
      res.json({
        success: false,
        message: "Email not registered",
      });
    } else {
      // Validate password
      const matchPassword = await bcrypt.compare(password, dataUser.password);
      if (!matchPassword) {
        return res.json({
          success: false,
          message: "Wrong password!",
        });
      }

      //creating a access token
      const token = jwt.sign(
        {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2d",
        }
      );

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
          token: token,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = self;
