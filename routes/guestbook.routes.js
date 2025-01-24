const guestbook = require("../controllers/guestbook.controller");
const router = require("express").Router();

router.route("/").get(guestbook.getAll).post(guestbook.createGuest);
router.route("/:id").delete(guestbook.delete);

module.exports = router;
