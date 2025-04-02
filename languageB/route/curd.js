const express = require("express");
const router = express.Router();
const userData = require("../models/data");

router.post("/tr", async (req, res) => {
  console.log(req.body);
  const { name, userName, email, password } = req.body;
  try {
    // Check if username or email already exists
    const existingUser = await userData.findOne({
      $or: [{ userName }, { email }],
    });
    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    // If username and email don't exist, create the user
    const userAdded = await userData.create({
      name: name,
      userName: userName,
      email: email,
      password: password,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: error.message });
  }
});

router.post("/kit", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const check = await userData.findOne({
      userName: userName,
      password: password,
    });
    if (check) {
      res.json({ status: "success", message: "User exists" });
    } else {
      res
        .status(404)
        .json({
          status: "error",
          message: "Username or password is incorrect",
        });
    }
  } catch (e) {
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});



router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log("get body", req.body);
  console.log("get id", id);

  try {
    const updatedUser = await userData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
