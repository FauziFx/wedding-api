const dashboard = require("../controllers/dashboard.controller.js");
const router = require("express").Router();

router.route("/").get(dashboard.getAll);

module.exports = router;
