const { Router } = require("express");
const controller = require("./controller");

const user = Router();

user.get("/", controller.getUsers);
user.post("/", controller.addUser);
user.get("/:id", controller.getUserById);
user.put("/:id", controller.deactivateAccount);
user.put("/:id", controller.activateAccount);



module.exports = user;
