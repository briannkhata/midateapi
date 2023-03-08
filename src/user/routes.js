const { Router } = require("express");
const controller = require("./controller");

const user = Router();

user.get("/", controller.getUsers);
user.get("/:id", controller.getUserById);


module.exports = user;
