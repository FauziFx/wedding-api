const multer = require("multer");

const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const musicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/music/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImages = multer({
  storage: imagesStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      const error = new Error(
        "The uploaded file must be an image in JPEG or PNG format"
      );
      error.code = "INVALID_FILE_TYPE";
      return cb(error, false);
    }
  },
});

const uploadMusic = multer({
  storage: musicStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "audio/mpeg") {
      const error = new Error(
        "The uploaded file must be an music in MP3 format"
      );
      error.code = "INVALID_FILE_TYPE";
      return cb(error, false);
    } else {
      cb(null, true);
    }
  },
});

exports.uploadImages = uploadImages;
exports.uploadMusic = uploadMusic;
