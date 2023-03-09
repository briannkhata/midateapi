const getUsers = "SELECT * FROM tblusers";
const getUserById = "SELECT * FROM tblusers WHERE user_id = ?";
const checkPhoneExists = "SELECT * FROM tblusers WHERE phone = ?";
const addUser = "INSERT INTO tblusers (name, phone, password, country)  VALUES (?,?,?,?)";
//const deactivateAccount = "UPDATE tblusers SET deleted = 1, reason_for_closing = ? , date_closed = ? WHERE user_id = ?";
//const activateAccount = "UPDATE tblusers SET deleted = 0, reason_for_reopening = ? , date_reopened = ? WHERE user_id = ?";

module.exports = {
    getUsers,
    getUserById,
    checkPhoneExists,
    addUser,
    //activateAccount,
    //deactivateAccount,
};