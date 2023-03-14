const { Router } = require("express");
const controller = require("./controller");

const chat = Router();

chat.get("/getAllchats/", controller.getAllchats);
chat.post("/getUserChats/", controller.getUserChats);
chat.post("/addChat/", controller.addChat);
chat.put("/deleteMessage/:id", controller.deleteMessage);
chat.put("/clearChat/", controller.clearChat);
chat.put("/readMessage/:id", controller.readMessage);

module.exports = chat;
