const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.photo);
  },
});

const upload = multer({ storage: storage });

app.use(
  session({
    secret: "brico",
    resave: false,
    saveUninitialized: true,
  })
);

const PORT = process.env.PORT || 3000;
const userRoutes = require("./src/user/routes");
const chatRoutes = require("./src/chat/routes");

app.use(express.json());

app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/chats/", chatRoutes);

app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});
