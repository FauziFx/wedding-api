const bankaccount = require("../controllers/bankaccount.controller");
const router = require("express").Router();

router.route("/").get(bankaccount.getAll).post(bankaccount.createBankaccount);
router.route("/:id").delete(bankaccount.delete);

module.exports = router;
