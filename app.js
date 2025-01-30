const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const ErrorHandlers = require("./middlewares/ErrorHandler.js");
const Authenticate = require("./middlewares/Authenticate.js");
const CheckInputs = require("./middlewares/CheckInputs.js");

// Router
const users = require("./routes/users.routes");
const auth = require("./routes/auth.routes");
const guestbook = require("./routes/guestbook.routes");
const bankaccount = require("./routes/bankaccount.routes");
const general = require("./routes/general.routes");
const person = require("./routes/person.routes");
const gallery = require("./routes/gallery.routes");

const generalConstroller = require("./controllers/general.controller.js");
const personConstroller = require("./controllers/person.controller.js");
const galleryConstroller = require("./controllers/gallery.controller.js");
const bankaccountConstroller = require("./controllers/bankaccount.controller.js");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// Get Image
app.get("/v1/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`uploads/images/${imageName}`);
  readStream.pipe(res);
});

// Get Music
app.get("/v1/music/:musicName", (req, res) => {
  const musicName = req.params.musicName;
  const readStream = fs.createReadStream(`uploads/music/${musicName}`);
  readStream.pipe(res);
});

// Get All
app.get("/v1/general", generalConstroller.getAll);
app.get("/v1/person", personConstroller.getAll);
app.get("/v1/gallery", galleryConstroller.getAll);
app.get("/v1/bankaccount", bankaccountConstroller.getAll);

app.use("/v1/auth", CheckInputs, auth);
app.use(Authenticate);
app.use("/v1/users", CheckInputs, users);
app.use("/v1/guestbook", CheckInputs, guestbook);
app.use("/v1/bankaccount", CheckInputs, bankaccount);
app.use("/v1/general", CheckInputs, general);
app.use("/v1/person", CheckInputs, person);
app.use("/v1/gallery", gallery);

app.use(ErrorHandlers);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});

module.exports = app;
