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
  const { name, phone, password, country } = req.body;

  pool.query(queries.checkPhoneExists, [phone], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
      req.end();
    }

    if (results && results.length > 0) {
      return res.status(409).json({ error: "Phone number already exists" });
      req.end();
    }
  });

  pool.query(
    queries.addUser,
    [name, phone, password, country],
    (error, results) => {
      if (error) throw error;
      res.status(201).json("Account created successfully");
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
};
