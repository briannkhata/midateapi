const getUsers = "SELECT * FROM tblusers";
const getUserById = "SELECT * FROM tblusers WHERE user_id = ?";
const checkPhoneExists = "SELECT * FROM tblusers WHERE phone = ?";
const addUser = "INSERT INTO tblusers (name, phone, password, country)  VALUES (?,?,?,?)";
const deactivateAccount = "UPDATE tblusers SET  reason_for_closing = ? , date_closed = ?,deleted = 1 WHERE user_id = ?";
const activateAccount = "UPDATE tblusers SET  reason_for_reopening = ? , date_reopened = ?,deleted = 0 WHERE user_id = ?";
const updateProfile = "UPDATE tblusers SET  name = ? , email = ?, phone = 0 WHERE user_id = ?";


module.exports = {
    getUsers,
    getUserById,
    checkPhoneExists,
    addUser,
    deactivateAccount,
    activateAccount,
    updateProfile
};