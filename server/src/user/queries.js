const getUsers = "SELECT * FROM tblusers WHERE deleted = 0";
const getUserById = "SELECT * FROM tblusers WHERE user_id = ? AND deleted = 0";
const checkPhoneExists = "SELECT * FROM tblusers WHERE phone = ? AND deleted = 0";
const addUser = "INSERT INTO tblusers (name, phone, password, country)  VALUES (?,?,?,?)";
const deactivateAccount =  "UPDATE tblusers SET  reason_for_closing = ? , date_closed = ?,deleted = 1 WHERE user_id = ?";
const activateAccount =  "UPDATE tblusers SET  reason_for_reopening = ? , date_reopened = ?,deleted = 0 WHERE user_id = ?";
const updatePassword = "UPDATE tblusers SET  password = ?  WHERE user_id = ?";
const updateProfile =  "UPDATE tblusers SET  name = ? , email = ?, gender = ?,looking_for = ? ,age_from = ?, age_to = ?, dob = ?, about = ?, location = ?, country = ?,district = ?, m_status = ?, dating_type = ?, hobies= ?, profession = ?, church=?, preferences=? WHERE user_id = ?";
const addPayment =  "UPDATE tblusers SET  trans_id = ? , activation_code = ?, date_from = ?, date_to = ? WHERE user_id = ?";
const updateProfilePicture =  "UPDATE tblusers SET  photo = ?  WHERE user_id = ?";
const loginUser = "SELECT * FROM tblusers WHERE phone = ? ";
const setToOnline = "UPDATE tblusers SET online = 1 WHERE user_id = ?";
const setToOffline = "UPDATE tblusers SET online = 0 WHERE user_id = ?";
const checkDeactivated = "SELECT deleted FROM tblusers WHERE user_id = ?";
const resetPayment =  "UPDATE tblusers SET  trans_id = null , activation_code = null, date_from = null, date_to = null WHERE user_id = ?";
const searchUsers = "SELECT * FROM tblusers WHERE (name LIKE '%?%' OR location LIKE '%?%' OR age_from LIKE '%?%' OR age_to LIKE '%?%' OR gender LIKE '%?%')  AND deleted = 0";
const likeUser = "INSERT INTO tbllikes (liked, liked_by, operation) VALUES (?,?,?)";
const getUserLikes = "SELECT * FROM tbllikes WHERE liked = ? ";
const getDateTo = "SELECT user_id, date_to FROM tblusers WHERE deleted = 0 ";
const getPlans = "SELECT * FROM tblplans WHERE deleted = 0";
const getPlanPrice = "SELECT price FROM tblplans WHERE plan_id = ?";
const getPlanDays = "SELECT days FROM tblplans WHERE plan_id = ?";
const addActivations = "INSERT INTO tblactivations (date_activated, date_from,date_to,user_id,amount) VALUES (?,?,?,?,?)";
const getAds = "SELECT * FROM tblads WHERE deleted = 0";
const addPhotos = "INSERT INTO tblphotos (user_id, photo)  VALUES (?,?)";



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
  checkDeactivated,
  resetPayment,
  searchUsers,
  likeUser,
  getUserLikes,
  getDateTo,
  getPlans,
  getPlanPrice,
  getPlanDays,
  addActivations,
  getAds,
  addPhotos
};
