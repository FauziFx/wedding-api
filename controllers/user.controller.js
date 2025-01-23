const { user, Sequelize } = require("./../models");
const bcrypt = require("bcrypt");
let self = {};

/**
 * @description Change password
 * @type PATCH
 * @path /v1/users/:id
 * @param {*} req
 * @param {*} res
 * * @param {Number} - id - user id
 *
 * @returns JSON
 */
self.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;
    if (!(oldPassword && newPassword)) {
      return res
        .status(400)
        .json({ success: false, message: "All input is required!" });
    } else {
      const dataUser = await user.findOne({
        where: {
          id: id,
        },
      });
      // Validate password
      const matchPassword = await bcrypt.compare(
        oldPassword,
        dataUser.password
      );
      if (!matchPassword) {
        res.json({
          success: false,
          message: "Old Password doesn't match",
        });
        return;
      }
      const hashPassword = bcrypt.hashSync(newPassword, 10);

      await user.update(
        { password: hashPassword },
        {
          where: {
            id: id,
          },
        }
      );
    }
    res.status(201).json({
      success: true,
      message: "Change password successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = self;
