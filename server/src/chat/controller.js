const pool = require("../../db");
const queries = require("./queries");

const getAllchats = (req, res) => {
  try {
    pool.query(queries.getAllchats, (error, results) => {
      if (error) throw error;
      res.status(200).json({ success: 1, data: results });
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Server error" });
  }
};

const getUserChats = (req, res) => {
  try {
    const { from, to } = req.body;
    pool.query(queries.getUserChats, [from, to,to,from], (error, results) => {
      if (error) throw error;
      res.status(200).json({ success: 1, data: results });
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Server error" });
  }
};

const addChat = (req, res) => {
  try {
    const { from, to, message } = req.body;
    pool.query(queries.addChat, [from, to, message], (error, results) => {
      if (error) throw error;
      res.status(201).json({ success: 1, data: "Message Sent" });
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Server error" });
  }
};

const deleteMessage = (req, res) => {
  try {
    const chatId = parseInt(req.params.id);
    pool.query(queries.deleteMessage, [chatId], (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .json({ success: 1, data: "Message deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Server error" });
  }
};

const readMessage = (req, res) => {
  try {
    const chatId = parseInt(req.params.id);
    pool.query(queries.readMessage, [chatId], (error, results) => {
      if (error) throw error;
      res.status(200).json({ success: 1, data: "Message read successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Server error" });
  }
};

const clearChat = (req, res) => {
  try {
    const {from,to} = req.body;
    pool.query(queries.clearChat, [from,to,to,from], (error, results) => {
      if (error) throw error;
      res.status(200).json({ success: 1, data: "Chat cleared successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Server error" });
  }
};

module.exports = {
  getAllchats,
  getUserChats,
  addChat,
  deleteMessage,
  readMessage,
  clearChat,
};
