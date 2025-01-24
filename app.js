var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const ErrorHandlers = require("./middlewares/ErrorHandler.js");
const Authenticate = require("./middlewares/Authenticate.js");
const users = require("./routes/users.routes");
const auth = require("./routes/auth.routes");
const guestbook = require("./routes/guestbook.routes");
const bankaccount = require("./routes/bankaccount.routes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to vinayak's application." });
});

app.use("/v1/auth", auth);
app.use(Authenticate);
app.use("/v1/users", users);
app.use("/v1/guestbook", guestbook);
app.use("/v1/bankaccount", bankaccount);

app.use(ErrorHandlers);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.APP_PORT}`);
});

module.exports = app;
