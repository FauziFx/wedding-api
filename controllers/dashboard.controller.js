const { comment, Sequelize } = require("./../models");
let self = {};

self.getAll = async (req, res, next) => {
  try {
    const countComment = await comment.count();
    const countPresent = await comment.count({
      where: { presence: "hadir" },
    });
    const countAbsent = await comment.count({
      where: { presence: "tidak" },
    });
    const countTentative = await comment.count({
      where: { presence: "mungkin" },
    });
    res.status(200).json({
      success: true,
      message: "Data found",
      data: {
        comment: countComment,
        present: countPresent,
        absent: countAbsent,
        tentative: countTentative,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = self;
