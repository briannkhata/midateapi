const { Router } = require("express");
const controller = require("./controller");

const user = Router();

user.get("/", controller.getUsers);
user.post("/", controller.addUser);
user.get("/getUserById/:id", controller.getUserById);
user.put("/deactivateAccount/:id", controller.deactivateAccount);
user.put("/activateAccount/:id", controller.activateAccount);
user.put("/updateProfile/:id", controller.updateProfile);
user.put("/updatePassword/:id", controller.updatePassword);
user.put("/addPayment/:id", controller.addPayment);


module.exports = user;
