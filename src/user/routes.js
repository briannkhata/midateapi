const { Router } = require("express");
const controller = require("./controller");

const user = Router();

user.get("/getAllUsers/", controller.getUsers);
user.post("/registerUser/", controller.addUser);
user.get("/getUserById/:id", controller.getUserById);
user.put("/deactivateAccount/:id", controller.deactivateAccount);
user.put("/activateAccount/:id", controller.activateAccount);
user.put("/updateProfile/:id", controller.updateProfile);
user.put("/updatePassword/:id", controller.updatePassword);
user.put("/addPayment/:id", controller.addPayment);
user.put("/updateProfilePicture/:id", controller.updateProfilePicture);


module.exports = user;
