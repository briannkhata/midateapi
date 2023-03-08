const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "./public")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

const homeRouter = require('./src/routes/homeRouter');
//homeRouter.route("/");
app.use("/home", homeRouter);



app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});
