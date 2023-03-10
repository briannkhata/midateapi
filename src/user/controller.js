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

const getPlanPrice = async (planId) => {
    const results = await pool.query(queries.getPlanPrice, [planId]);
    return results.rows[0].price;
  };
  
  const getPlanDays = async (planId) => {
    const results = await pool.query(queries.getPlanDays, [planId]);
    return results.rows[0].days;
  };
  
  const addPayment = async (req, res) => {
    try {
      const userId = req.sessei(req.params.id);
      const planId = req.body.plan_id;
      const price = await getPlanPrice(planId);
      const days = await getPlanDays(planId);
      const dateFrom = new Date();
      const dateTo = new Date(dateTo.setDate(dateFrom.getDate() + days));
      const activationCode = "MiDate" + Math.random().toString(36).substring(2);
      const { trans_id } = req.body;
      await pool.query(queries.addPayment, [trans_id, activationCode, dateFrom, dateTo, userId]);
      res.status(201).json("Payment done successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json("Error adding payment");
    }
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
      res
        .status(401)
        .json({ status: "error", message: "Invalid Username or Password" });
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
    res.status(201).json({ results });
  });
};

const setToOnline = (req, res) => {
  const UserId = req.session.UserId;
  pool.query(queries.setToOnline, [UserId], (error, results) => {
    if (error) throw error;
    res.status(201).json({ status: results });
  });
};

const setToOffline = (req, res) => {
  const UserId = req.session.UserId;
  pool.query(queries.setToOffline, [UserId], (error, results) => {
    if (error) throw error;
    res.status(201).json({ status: results });
  });
};

const getDateTo = (req, res) => {
    pool.query(queries.getDateTo, (error, results) => {
      if (error) throw error;
      res.status(201).json(results);
    });
  };


  const resetPayment = (req, res) => {
    const today = new Date();
    getDateTo(req, res, (error, users) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Users not found" });
      }
      users.forEach((row) => {
        const userId = row[0];
        const dateTo = new Date(row[1]);
  
        if (today < dateTo) {
          pool.query(queries.resetPayment, [userId], (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: "Internal Server Error" });
            }
            return res.status(201).json({ message: "Payment reset Successful" });
          });
        }
      });
    });
  };


const searchUsers = (req, res) => {
  const search = req.query;
  pool.query(queries.searchUsers, [search], (error, results) => {
    if (error) throw error;
    res.status(201).json(results);
  });
};

const likeUser = (req, res) => {
  const liked_by = req.session.UserId;
  const { liked, operation } = req.body;
  pool.query(
    queries.likeUser,
    [liked, liked_by, operation],
    (error, results) => {
      if (error) throw error;
      res
        .status(201)
        .json({ status: "success", message: "User liked successfull" });
    }
  );
};

const getUserLikes = (req, res) => {
  const UserId = parseInt(req.params.id);
  pool.query(queries.getUserLikes, [UserId], (error, results) => {
    if (error) throw error;
    res.status(201).json(results);
  });
};


const getPlans = (req, res) => {
    pool.query(queries.getPlans, (error, results) => {
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
  setToOffline,
  setToOnline,
  resetPayment,
  searchUsers,
  likeUser,
  getUserLikes,
  getDateTo,
  getPlans,
  getPlanPrice,
  getPlanDays
};
