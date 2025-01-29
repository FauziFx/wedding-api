const { person, Sequelize } = require("./../models");
const fs = require("fs");
let self = {};

/**
 * @description Get All Person
 * @type GET
 * @path /v1/person
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.getAll = async (req, res, next) => {
  try {
    const response = await person.findAll({});
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
 * @description Get All Person
 * @type GET
 * @path /v1/person/:userid
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.get = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const response = await person.findAll({
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
 * @description Create New Person
 * @type POST
 * @path /v1/person
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.createPerson = async (req, res, next) => {
  try {
    const { pos, userId } = req.body;
    const response = await person.create({
      pos: pos,
      userId: userId,
    });
    res.status(201).json({
      success: true,
      message: "Create person successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update Person
 * @type POST
 * @path /v1/person
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.updatePerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, gender, child_number, father, mother, image } = req.body;

    const response = await person.update(
      {
        name: name,
        gender: gender,
        child_number: child_number,
        father: father,
        mother: mother,
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
self.updateImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json("No file uploaded or file format not supported.");
    }

    const { id } = req.body;

    const file = await get(id);
    if (file.image != null) {
      fs.unlinkSync(`./uploads/images/${file.image}`);
    }

    res.status(201).json({
      success: true,
      message: "Update Image successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete Person with the specified id in the request
 * @type DELETE
 * @path /v1/person/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await person.destroy({
      where: {
        id: id,
      },
    });
    if (response === 1) {
      return res.status(200).json({
        success: true,
        message: "Person deleted",
      });
    }
  } catch (error) {
    next(error);
  }
};

const get = async (id) => {
  try {
    const response = await person.findOne({
      where: {
        id: id,
      },
      attributes: ["image"],
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = self;
