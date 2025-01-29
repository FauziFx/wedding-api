const person = require("../controllers/person.controller.js");
const router = require("express").Router();
const { uploadImages } = require("../middlewares/Upload.js");

router.route("/").get(person.getAll).post(person.createPerson);
router
  .route("/image")
  .post(uploadImages.single("image_file"), person.updateImage);
router.route("/:id").delete(person.delete).patch(person.updatePerson);
router.route("/:userid").get(person.get);

module.exports = router;
