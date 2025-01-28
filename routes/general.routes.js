const general = require("../controllers/general.controller");
const router = require("express").Router();
const { uploadImages, uploadMusic } = require("../middlewares/Upload.js");

const cpUpload = uploadImages.fields([
  { name: "image_file", maxCount: 1 },
  { name: "bg_image_file", maxCount: 1 },
]);

router.route("/").get(general.getAll).post(general.createGeneral);
router.route("/image").post(cpUpload, general.updateGeneralImage);
router.route("/bg_image").post(cpUpload, general.updateGeneralBgImage);
router
  .route("/music")
  .post(uploadMusic.single("music_file"), general.updateGeneralMusic);
router.route("/:id").patch(general.updateGeneral).delete(general.delete);
router.route("/:userid").get(general.get);

module.exports = router;
