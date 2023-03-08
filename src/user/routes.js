const { Router } = require("express");
const controller = require("./controller");

const user = Router();

user.get("/", controller.getUsers);
user.get("/:id", controller.getUserById);
user.post("/", controller.addUser);



module.exports = user;
