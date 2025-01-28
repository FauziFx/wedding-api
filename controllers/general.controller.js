const { general, Sequelize } = require("../models");
const fs = require("fs");
let self = {};

/**
 * @description Get All General setting
 * @type GET
 * @path /v1/general
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.getAll = async (req, res, next) => {
  try {
    const response = await general.findAll({});
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
 * @description Get All General setting
 * @type GET
 * @path /v1/general/:userid
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.get = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const response = await general.findOne({
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
 * @description Create New General setting
 * @type POST
 * @path /v1/general
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.createGeneral = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const response = await general.create({
      userId: userId,
    });
    res.status(201).json({
      success: true,
      message: "Create successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update General Setting
 * @type PATCH
 * @path /v1/general/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.updateGeneral = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { time, date, address, maps } = req.body;
    const response = await general.update(
      {
        time: time,
        date: date,
        address: address,
        maps: maps,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({
      success: true,
      message: "Update successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update Image
 * @type POST
 * @path /v1/general/image
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.updateGeneralImage = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json("No file uploaded or file format not supported.");
    }
    const { id, image } = req.body;

    const file = await get(id);
    if (file.image != null) {
      fs.unlinkSync(`./uploads/images/${file.image}`);
    }

    const response = await general.update(
      {
        image: image,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({
      success: true,
      message: "Update Image successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

self.updateGeneralBgImage = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json("No file uploaded or file format not supported.");
    }
    const { id, bg_image } = req.body;

    const file = await get(id);
    if (file.bg_image != null) {
      fs.unlinkSync(`./uploads/images/${file.bg_image}`);
    }

    const response = await general.update(
      {
        bg_image: bg_image,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({
      success: true,
      message: "Update Image successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

self.updateGeneralMusic = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json("No file uploaded or file format not supported.");
    }
    const { id, music } = req.body;

    const file = await get(id);
    if (file.music != null) {
      fs.unlinkSync(`./uploads/music/${file.music}`);
    }

    const response = await general.update(
      {
        music: music,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(201).json({
      success: true,
      message: "Update Music successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete with the specified id in the request
 * @type DELETE
 * @path /v1/general/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const file = await get(id);

    const response = await general.destroy({
      where: {
        id: id,
      },
    });

    if (response === 1) {
      if (file.image !== null) {
        fs.unlinkSync(`./uploads/images/${file.image}`);
      }
      if (file.bg_image !== null) {
        fs.unlinkSync(`./uploads/images/${file.bg_image}`);
      }
      if (file.music !== null) {
        fs.unlinkSync(`./uploads/images/${file.music}`);
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
    const response = await general.findOne({
      where: {
        id: id,
      },
      attributes: ["music", "image", "bg_image"],
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = self;
