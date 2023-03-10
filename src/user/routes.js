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
user.post("/logoutUser/", controller.logoutUser);
user.get("/loginUser/", controller.loginUser);
user.get("/checkDeactivated/:id", controller.checkDeactivated);
user.put("/setOffline/:id", controller.setOffline);
user.put("/setOnline/:id", controller.setOnline);




module.exports = user;
