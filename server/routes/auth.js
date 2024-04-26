const router = require("express").Router();
const user = require("../models/users");
const { FaUserCircle } = require("react-icons/fa");

const admin = require("../config/firebase.config");

router.get("/login", async (req, res) => {
  if (!req.headers.authorization)
    return res.status(500).send({ message: "Invalid Token" });

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "Unauthorized" }); // Change status to 500
    } else {
      const userExists = await user.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        await newUserData(decodeValue, req, res);
      } else {
        await updateNewUserData(decodeValue, req, res);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Send error message
  }
});

const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

router.get("/getUsers", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };
  const data = await user.find({}, null, options);
  if (data.length > 0) {
    return res.status(200).send({ success: true, user: data });
  } else {
    return res.status(400).send({ success: false, msg: "No data found" });
  }
});

router.get("/getAnUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const data = await user.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, user: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

router.put("/updateRole/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const role = req.body.data.role;

  try {
    const result = await user.findOneAndUpdate(filter, { role: role });
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const result = await user.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "User removed" });
  } else {
    res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// router.get("/getUsers", async (req, res) => {
//   const options = {
//     // sort returned documents in ascending order
//     sort: { createdAt: 1 },
//     // Include only the following
//     // projection : {}
//   };

//   const cursor = await user.find(options);
//   if (cursor.length > 0) {
//     res.status(200).send({ success: true, data: cursor });
//   } else {
//     res.status(200).send({ success: true, msg: "No Data Found" });
//   }
// });

module.exports = router;
