const getUsers = "SELECT * FROM tblusers";
const getUserById = "SELECT * FROM tblusers WHERE user_id = ?";

module.exports = {
    getUsers,
    getUserById
};