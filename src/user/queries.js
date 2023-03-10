const getUsers = "SELECT * FROM tblusers";
const getUserById = "SELECT * FROM tblusers WHERE user_id = ?";
const checkPhoneExists = "SELECT * FROM tblusers WHERE phone = ?";
const addUser = "INSERT INTO tblusers (name, phone, password, country)  VALUES (?,?,?,?)";
const deactivateAccount =  "UPDATE tblusers SET  reason_for_closing = ? , date_closed = ?,deleted = 1 WHERE user_id = ?";
const activateAccount =  "UPDATE tblusers SET  reason_for_reopening = ? , date_reopened = ?,deleted = 0 WHERE user_id = ?";
const updatePassword = "UPDATE tblusers SET  password = ?  WHERE user_id = ?";
const updateProfile =  "UPDATE tblusers SET  name = ? , email = ?, gender = ?,looking_for = ? ,age_from = ?, age_to = ?, dob = ?, about = ?, location = ?, country = ?,district = ?, m_status = ?, dating_type = ?, hobies= ?, profession = ?, church=? WHERE user_id = ?";
const addPayment =  "UPDATE tblusers SET  trans_id = ? , activation_code = ?, date_from = ?, date_to = ? WHERE user_id = ?";
const updateProfilePicture =  "UPDATE tblusers SET  photo = ?  WHERE user_id = ?";
const loginUser = "SELECT * FROM tblusers WHERE phone = ? AND password = ?";
const setToOnline = "UPDATE tblusers SET online = 1 WHERE user_id = ?";
const setToOffline = "UPDATE tblusers SET online = 0 WHERE user_id = ?";
const checkDeactivated = "SELECT deleted FROM tblusers WHERE user_id = ?";




module.exports = {
  getUsers,
  getUserById,
  checkPhoneExists,
  addUser,
  deactivateAccount,
  activateAccount,
  updateProfile,
  updatePassword,
  addPayment,
  updateProfilePicture,
  loginUser,
  setToOnline,
  setToOffline,
  checkDeactivated
};
