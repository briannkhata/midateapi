const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

homeRouter.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

homeRouter.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

homeRouter.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

module.exports = homeRouter;
