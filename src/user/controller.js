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
  const { name, phone, password, looking_for, country } = req.body;

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
    [name, phone, password, looking_for, country],
    (error, results) => {
      if (error) throw error;
      res.status(201).json("Account created successfully");
    }
  );
};

const deactivateAccount = (req, res) => {
  const UserId = parseInt(req.params.id);
  const date_closed = new Date();
  const { reason_for_closing } = req.body;
  pool.query(
    queries.deactivateAccount,
    [reason_for_closing, date_closed, UserId],
    (error, results) => {
      if (error) throw error;
      res.status(201).json("Account deactivated successfully");
    }
  );
};

const activateAccount = (req, res) => {
  const UserId = parseInt(req.params.id);
  const date_reopened = new Date();
  const { reason_for_reopening } = req.body;
  pool.query(
    queries.deactivateAccount,
    [reason_for_reopening, date_reopened, UserId],
    (error, results) => {
      if (error) throw error;
      res.status(201).json("Account Re-Activated successfully");
    }
  );
};

const updateProfile = (req, res) => {
  const UserId = parseInt(req.params.id);
  const date_updated = new Date();
  const {
    name,
    email,
    gender,
    looking_for,
    age_from,
    age_to,
    dob,
    register_date,
    about,
    location,
    country,
    district,
    m_status,
    dating_type,
    hobies,
    profession,
    church,
  } = req.body;
  pool.query(
    queries.updateProfile,
    [
      name,
      email,
      gender,
      looking_for,
      age_from,
      age_to,
      dob,
      register_date,
      about,
      location,
      country,
      district,
      m_status,
      dating_type,
      hobies,
      profession,
      church,
      date_updated,
      UserId,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).json("Profile Updated successfully");
    }
  );
};

const updatePassword = (req, res) => {
  const UserId = parseInt(req.params.id);
  const { password } = req.body;
  pool.query(queries.updatePassword, [password, UserId], (error, results) => {
    if (error) throw error;
    res.status(201).json("Password Updated successfully");
  });
};

const addPayment = (req, res) => {
  const UserId = parseInt(req.params.id);
  const date_from = new Date();
  const date_to = new Date();
  const { trans_id, activation_code } = req.body;
  pool.query(
    queries.addPayment,
    [trans_id, activation_code, date_from, date_to, UserId],
    (error, results) => {
      if (error) throw error;
      res.status(201).json("Payment done successfully");
    }
  );
};

const updateProfilePicture = (req, res) => {
  const UserId = parseInt(req.params.id);
  const { photo } = req.body;
  pool.query(
    queries.updateProfilePicture,
    [photo, UserId],
    (error, results) => {
      if (error) throw error;
      res.status(201).json("Profile Picture updated successfully");
    }
  );
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (error) throw error;
    res.redirect("/");
  });
};

const loginUser = (req, res) => {
  const { phone, password } = req.body;

  pool.query(queries.loginUser, [phone, password], (error, results) => {
    if (error) throw error;

    if (results.length === 0) {
        res.status(401).json({ status: "error", message: "Invalid Username or Password" });
    }
    req.session.name = results.name;
    req.session.username = results.username;
    req.session.id = results.id;

    res.status(201).json({ status: "success", message: "Login successfull" });
  });
};

const checkDeactivated = (req, res) => {
    const UserId = parseInt(req.params.id);
      pool.query(queries.checkDeactivated, [UserId], (error, results) => {
      if (error) throw error;     
      res.status(201).json({results});
    });
  };

  const setToOnline = (req, res) => {
    const UserId = req.session.UserId;
    pool.query(queries.setToOnline, [UserId], (error, results) => {
      if (error) throw error;     
      res.status(201).json({status:results});
    });
  };

  const setOffline = (req, res) => {
    const UserId = req.session.UserId;
    pool.query(queries.setToOffline, [UserId], (error, results) => {
      if (error) throw error;     
      res.status(201).json({status:results});
    });
  };

  
  const resetPayment = (req, res) => {
    //const UserId = req.session.UserId;
    const UserId = parseInt(req.params.id);

    pool.query(queries.resetPayment, [UserId], (error, results) => {
      if (error) throw error;     
      res.status(201).json({status:"Payment reset Successfull"});
    });
  };

  const searchUsers = (req, res) => {
    const search = req.query;
    pool.query(queries.searchUsers, [search], (error, results) => {
      if (error) throw error;     
      res.status(201).json(results);
    });
  };

module.exports = {
  getUsers,
  getUserById,
  addUser,
  deactivateAccount,
  activateAccount,
  updateProfile,
  updatePassword,
  addPayment,
  updateProfilePicture,
  logoutUser,
  loginUser,
  checkDeactivated,
  setOffline,
  setToOnline,
  resetPayment,
  searchUsers
};
