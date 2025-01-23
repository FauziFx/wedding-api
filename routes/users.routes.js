const user = require("./../controllers/user.controller");
const router = require("express").Router();

router.route("/:id").patch(user.changePassword);

module.exports = router;
