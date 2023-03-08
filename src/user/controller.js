const pool = require("../../db");
const queries = require('./queries');

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const getUserById = (req, res) => {
    const UserId = parseInt(req.params.id)
    pool.query(queries.getUserById,[UserId], (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  };
  
module.exports = {
  getUsers,
  getUserById
};
