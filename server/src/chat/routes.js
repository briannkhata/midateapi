const { Router } = require("express");
const controller = require("./controller");

const chat = Router();

chat.get("/getAllchats/", controller.getAllchats);
chat.get("/getUserChats/:id", controller.getUserChats);
chat.get("/readMessage/:id", controller.readMessage);
chat.post("/addChat/", controller.addChat);
chat.put("/deleteMessage/:id", controller.deleteMessage);
chat.put("/clearChat/:id", controller.clearChat);

module.exports = chat;
