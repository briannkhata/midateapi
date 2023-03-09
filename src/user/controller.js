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
  const { name, phone, password,looking_for, country } = req.body;

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
    [name, phone, password, looking_for,country],
    (error, results) => {
      if (error) throw error;
      res.status(201).json("Account created successfully");
    }
  );
};


const deactivateAccount = (req, res) => {
    const UserId = parseInt(req.params.id);
    const date_closed = new Date();
    const { reason_for_closing} = req.body;  
    pool.query(
      queries.deactivateAccount,
      [reason_for_closing,date_closed],
      (error, results) => {
        if (error) throw error;
        res.status(201).json("Account deactivated successfully");
      }
    );
  };

  const activateAccount = (req, res) => {
    const UserId = parseInt(req.params.id);
    const date_reopened = new Date();
    const { reason_for_reopening} = req.body;  
    pool.query(
      queries.deactivateAccount,
      [reason_for_reopening,date_reopened],
      (error, results) => {
        if (error) throw error;
        res.status(201).json("Account Re-Activated successfully");
      }
    );
  };

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deactivateAccount,
  activateAccount
};
