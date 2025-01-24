const { guestbook, Sequelize } = require("./../models");
let self = {};

/**
 * @description Get All Guest
 * @type GET
 * @path /v1/guestbook
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.getAll = async (req, res, next) => {
  try {
    const response = await guestbook.findAll({});
    res.status(200).json({
      success: true,
      message: "Data found",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create New Gues
 * @type POST
 * @path /v1/guestbook
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.createGuest = async (req, res, next) => {
  try {
    const { name, whatsapp, userId } = req.body;
    if (!(name && whatsapp && userId)) {
      return res
        .status(400)
        .json({ success: false, message: "All input is required!" });
    } else {
      const response = await guestbook.create({
        name: name,
        whatsapp: whatsapp,
        userId: userId,
      });
      res.status(201).json({
        success: true,
        message: "Create guest successfully",
        data: response,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete guest with the specified id in the request
 * @type DELETE
 * @path /v1/guestbook/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await guestbook.destroy({
      where: {
        id: id,
      },
    });
    if (response === 1) {
      return res.status(200).json({
        success: true,
        message: `Guest deleted`,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = self;
