const { bankaccount, Sequelize } = require("./../models");
let self = {};

/**
 * @description Get All Guest
 * @type GET
 * @path /v1/bankaccount
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.getAll = async (req, res, next) => {
  try {
    const response = await bankaccount.findAll({});
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
 * @path /v1/bankaccount
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.createBankaccount = async (req, res, next) => {
  try {
    const { name, bank, number, userId } = req.body;
    if (!(name && bank && number && userId)) {
      return res
        .status(400)
        .json({ success: false, message: "All input is required!" });
    } else {
      const response = await bankaccount.create({
        name: name,
        bank: bank,
        number: number,
        userId: userId,
      });
      res.status(201).json({
        success: true,
        message: "Create bank account successfully",
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
 * @path /v1/bankaccount/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await bankaccount.destroy({
      where: {
        id: id,
      },
    });
    if (response === 1) {
      return res.status(200).json({
        success: true,
        message: `Bank account deleted`,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = self;
