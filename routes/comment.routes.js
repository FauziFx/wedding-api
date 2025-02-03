const comment = require("../controllers/comment.controller");
const router = require("express").Router();

router.route("/").get(comment.getAll).post(comment.createComment);
router.route("/:id").patch(comment.updateComment).delete(comment.deleteComment);

module.exports = router;
