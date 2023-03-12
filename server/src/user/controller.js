const pool = require("../../db");
const queries = require("./queries");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: results });
  });
};

const getUserById = (req, res) => {
  const UserId = parseInt(req.params.id);
  pool.query(queries.getUserById, [UserId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: results });
  });
};

const addUser = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password, salt);
  const { name, phone, looking_for, country } = req.body;

  pool.query(queries.checkPhoneExists, [phone], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
      req.end();
    }

    if (results && results.length > 0) {
      return res
        .status(409)
        .json({ success: 0, data: "Phone number already exists" });
      req.end();
    }
  });

  pool.query(
    queries.addUser,
    [name, phone, password, looking_for, country],
    (error, results) => {
      if (error) throw error;
      res
        .status(201)
        .json({ success: 1, data: "Account created successfully" });
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
      res
        .status(200)
        .json({ success: 1, data: "Account deactivated successfully" });
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
      res
        .status(200)
        .json({ success: 1, data: "Account Re-Adeactivated successfully" });
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
      res
        .status(200)
        .json({ success: 1, data: "Profile Updated successfully" });
    }
  );
};

const addActivations = (userId, dateFrom, dateTo, amount) => {
  pool.query(
    queries.addActivations,
    [userId, date_activated, dateFrom, dateTo, amount],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ success: 0, data: "Could not add activation" });
      }
      res
        .status(200)
        .json({ success: 1, data: "Account activated successfully" });
    }
  );
};

const updatePassword = (req, res) => {
  const UserId = parseInt(req.params.id);
  const { password } = req.body;
  pool.query(queries.updatePassword, [password, UserId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: "Password changed successfully" });
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
    const liked_by = req.session.UserId;
    const planId = req.body.plan_id;
    const price = await getPlanPrice(planId);
    const days = await getPlanDays(planId);
    const dateFrom = new Date();
    const dateTo = new Date(dateTo.setDate(dateFrom.getDate() + days));
    const activationCode = "MiDate" + Math.random().toString(36).substring(2);
    const { trans_id } = req.body;

    addActivations(userId, dateFrom, dateFrom, dateTo, price);
    await pool.query(queries.addPayment, [
      trans_id,
      activationCode,
      dateFrom,
      dateTo,
      userId,
    ]);
    res.status(200).json({ success: 1, data: "Payment done successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, data: "Error adding payment" });
  }
};

// handle storage using multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const updateProfilePicture = (req, res) => {
  const UserId = parseInt(req.params.id);

  upload.single("photo")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).json("There was an error uploading the photo");
    } else if (err) {
      res.status(500).json("There was an error uploading the photo");
    } else {
      const { filename } = req.file.filename;
      pool.query(
        queries.updateProfilePicture,
        [filename, UserId],
        (error, results) => {
          if (error) throw error;
          res
            .status(200)
            .json({ success: 1, data: "Profile Picture updated successfully" });
        }
      );
    }
  });
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (error) throw error;
    res.redirect("/");
  });
};

const loginUser = (req, res) => {
  try {
    const { phone } = req.body;
    pool.query(queries.loginUser, [phone], (error, results) => {
      if (error) {
        return res.status(401).json({ success: 0, data: "User Not Found" });
      }

      if (!results) {
        return res
          .status(401)
          .json({ success: 0, data: "Invalid Phone or Password" });
      } else {
        const plainTextPassword = req.body.password;
        const hashedPasswordFromDB = results[0].password;
        const isMatch = bcrypt.compareSync(
          plainTextPassword,
          hashedPasswordFromDB
        );

        if (isMatch) {
          results.password = undefined;
          const jstoken = jwt.sign({ isMatch: results }, "briani", {
            expiresIn: "1h",
          });
          res
            .status(200)
            .json({ success: 1, data: "Login successfull", token: jstoken });
        } else {
          res
            .status(401)
            .json({ success: 0, data: "Invalid Phone or Password" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, data: "Internal Server Error" });
  }
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
    res.status(200).json({ success: 1, data: results });
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
      res.status(200).json({ success: 1, data: "User Liked successfully" });
    }
  );
};

const getUserLikes = (req, res) => {
  const UserId = parseInt(req.params.id);
  pool.query(queries.getUserLikes, [UserId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: results });
  });
};

const getPlans = (req, res) => {
  pool.query(queries.getPlans, (error, results) => {
    if (error) throw error;
    res.status(200).json({ success: 1, data: results });
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
  getPlanDays,
  addActivations,
};
