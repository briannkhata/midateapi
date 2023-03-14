const getAllchats = "SELECT * FROM `tblchats` WHERE `deleted` = 0";
const getUserChats = "SELECT * FROM `tblchats` WHERE (`from` = ? AND `to` = ?) OR (`from` = ? AND `to` = ?) ORDER BY `chat_id`";
const addChat = "INSERT INTO `tblchats` (`from`, `to`, `message`) VALUES (?, ?, ?)";
const deleteMessage =  "UPDATE `tblchats` SET `deleted` = 1 WHERE `chat_id` = ?";
const readMessage =  "UPDATE `tblchats` SET `read` = 1 WHERE `chat_id` = ?";
const clearChat = "UPDATE `tblchats` SET `deleted` = 1 WHERE (`from` = ? AND `to` = ?) OR (`to` = ? AND `from` = ?)";

module.exports = {
  getAllchats,
  getUserChats,
  addChat,
  deleteMessage,
  readMessage,
  clearChat
};
