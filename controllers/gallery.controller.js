const { gallery, Sequelize } = require("../models");
const fs = require("fs");
let self = {};

/**
 * @description Get All image
 * @type GET
 * @path /v1/gallery
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.getAll = async (req, res, next) => {
  try {
    const response = await gallery.findAll({});
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
 * @description Get All image
 * @type GET
 * @path /v1/gallery/:userid
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.get = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const response = await gallery.findAll({
      where: {
        userId: userid,
      },
    });
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
 * @description Create New Image
 * @type POST
 * @path /v1/gallery
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.createImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Tidak ada file yang diunggah.");
  }

  const { userId } = req.body;

  const images = req.files.map((file) => ({
    image: file.filename,
    userId: userId,
  }));

  try {
    const response = await gallery.bulkCreate(images);
    res.status(201).json({
      success: true,
      message: "Create gallery successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

self.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const file = await get(id);

    const response = await gallery.destroy({
      where: {
        id: id,
      },
    });

    if (response === 1) {
      if (file.image !== null) {
        fs.unlinkSync(`./uploads/images/${file.image}`);
      }
      return res.status(200).json({
        success: true,
        message: `General deleted`,
      });
    }
  } catch (error) {
    next(error);
  }
};

const get = async (id) => {
  try {
    const response = await gallery.findOne({
      where: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = self;
