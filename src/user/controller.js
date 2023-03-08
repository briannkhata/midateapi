const pool = require("../../db");
const queries = require("./queries");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const getUserById = (req, res) => {
  const UserId = parseInt(req.params.id);
  pool.query(queries.getUserById, [UserId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const addUser = (req, res) => {
  const {
    name,
    phone,
    password,
    email,
    photo,
    gender,
    looking_for,
    age_from,
    age_to,
    dob,
    role,
    register_date,
    location,
    country,
    district,
    m_status,
    dating_type,
    hobies,
    profession,
  } = req.body;
  //check if phone already exixts



  
  pool.query(queries.addUser, [UserId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

module.exports = {
  getUsers,
  getUserById,
};
