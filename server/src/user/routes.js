const { Router } = require("express");
const controller = require("./controller");

const user = Router();

user.get("/getAllUsers/", controller.getUsers);
user.get("/getUserById/:id", controller.getUserById);
user.get("/loginUser/", controller.loginUser);
user.get("/checkDeactivated/:id", controller.checkDeactivated);
user.get("/searchUsers/", controller.searchUsers);
user.get("/getUserLikes/:id", controller.getUserLikes);
user.get("/getDateTo/", controller.getDateTo);
user.get("/getPlans/", controller.getPlans);
user.get("/getPlanPrice/:id", controller.getPlanPrice);
user.get("/getPlanDays/:id", controller.getPlanDays);



user.post("/registerUser/", controller.addUser);
user.post("/likeUser/", controller.likeUser);
user.post("/logoutUser/", controller.logoutUser);
user.post("/addActivations/", controller.addActivations);


user.put("/deactivateAccount/:id", controller.deactivateAccount);
user.put("/activateAccount/:id", controller.activateAccount);
user.put("/updateProfile/:id", controller.updateProfile);
user.put("/updatePassword/:id", controller.updatePassword);
user.put("/addPayment/:id", controller.addPayment);
user.put("/updateProfilePicture/:id", controller.updateProfilePicture);
user.put("/setToOffline/:id", controller.setToOffline);
user.put("/setToOnline/:id", controller.setToOnline);
user.put("/resetPayment/", controller.resetPayment);



module.exports = user;
