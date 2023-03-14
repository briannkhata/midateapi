const pool = require("../../db");
const queries = require("./queries");

const getAllchats = (req, res) => {
  pool.query(queries.getAllchats, (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: results });
  });
};

const getUserChats = (req, res) => {
  const UserId = parseInt(req.params.id);
  pool.query(queries.getUserChats, [UserId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: results });
  });
};

const addChat = (req, res) => {
  const { from, to, message } = req.body;

  pool.query(queries.addChat, [from, to, message], (error, results) => {
    if (error) throw error;
    res.status(201).json({ success: 1, data: "Message Sent" });
  });
};

const deleteMessage = (req, res) => {
  const chatId = parseInt(req.params.id);
  pool.query(queries.deleteMessage, [chatId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: "Message deleted successfully" });
  });
};

const readMessage = (req, res) => {
  const chatId = parseInt(req.params.id);
  pool.query(queries.readMessage, [chatId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: "Message read successfully" });
  });
};

const clearChat = (req, res) => {
  const chatId = parseInt(req.params.id);
  pool.query(queries.updateProfile, [chatId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: "Chat cleared successfully" });
  });
};

module.exports = {
  getAllchats,
  getUserChats,
  addChat,
  deleteMessage,
  readMessage,
  clearChat,
};
