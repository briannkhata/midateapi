const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const userRoutes = require("./src/user/routes");
app.use(express.json());

app.get("/", (re, res) => {
  res.send("Hello World");
});

app.use("/api/v1/users/", userRoutes);

app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});
