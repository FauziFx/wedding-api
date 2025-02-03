const { comment, Sequelize } = require("./../models");
let self = {};

self.createComment = async (req, res, next) => {
  const { uuid, name, text, presence, parentId } = req.body;
  try {
    const response = await comment.create({
      uuid: uuid,
      name: name,
      text: text,
      presence: presence,
      parentId: parentId,
    });
    res.status(201).json({
      success: true,
      message: "Create Comment successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

self.getAll = async (req, res, next) => {
  try {
    const response = await comment.findAll({
      where: { parentId: null }, // Hanya ambil komentar utama
      include: {
        model: comment,
        as: "replies",
        include: { all: true, nested: true }, // Include semua nested replies
      },
      order: [["createdAt", "DESC"]],
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

self.updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const response = await comment.findByPk(id);
    if (response) {
      response.text = text;
      await response.save();
      res.status(201).json({
        success: true,
        message: "Update successfully",
        data: response,
      });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    next(error);
  }
};

self.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await comment.findByPk(id);
    if (response) {
      await response.destroy();
      res.status(204).json({
        success: true,
        message: "Comment deleted",
      });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = self;
