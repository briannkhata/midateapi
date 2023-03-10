const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");


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
