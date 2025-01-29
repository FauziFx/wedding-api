const gallery = require("../controllers/gallery.controller.js");
const router = require("express").Router();
const { uploadImages } = require("../middlewares/Upload.js");

router
  .route("/")
  .get(gallery.getAll)
  .post(uploadImages.array("images", 6), gallery.createImage);
router.route("/:id").delete(gallery.delete);
router.route("/:userid").get(gallery.get);

module.exports = router;
