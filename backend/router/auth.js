const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("../db/conn");
const User = require("../model/userSchema");
const Preference = require("../model/preferenceSchema");

var id;
//registration route
router.post("/reg", async (req, res) => {
  const { name, email, password, username, gender, age, photo } = req.body;
  if (!name || !email || !password || !username || !gender || !age) {
    return res.status(422).json({
      error: "error  field not filled properly in registration page ",
    });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email id is already exist" });
    }
    const userName_Exist = await User.findOne({ username: username });

    if (userName_Exist) {
      return res.status(422).json({ error: "Username is already exist" });
    }
    //for creating collection
    const user = new User({
      name,
      email,
      password,
      username,
      gender,
      age,
      photo,
    });

    await user.save();
    //console.log(`${user}`);
    id = user._id;

    res.status(201).json({ message: "user register 👍successfull" });
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/", async (req, res) => {
  try {
    let token;
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "error  field not filled properly in login page " });
    }
    const userLogin = await User.findOne({ username: username });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "invalid credientials" });
      } else {
        res.json({ message: "user login  👍successfully" });
      }
    } else {
      res.status(400).json({ error: "invalid credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});
//set preference route

router.post("/set-preference", async (req, res) => {
  const {
    drama,
    romance,
    action,
    thriller,
    sci_fi,
    comedy,
    musical,
    animation,
    mystery,
  } = req.body;
  var count = 0;
  if (drama == 1) {
    count++;
  }
  if (romance == 1) {
    count++;
  }
  if (action == 1) {
    count++;
  }
  if (thriller == 1) {
    count++;
  }
  if (sci_fi == 1) {
    count++;
  }
  if (comedy == 1) {
    count++;
  }
  if (musical == 1) {
    count++;
  }
  if (animation == 1) {
    count++;
  }
  if (mystery == 1) {
    count++;
  }
  if (count < 5) {
    return res.status(422).json({ message: "select minimum five genre" });
  }
  try {
    //for creating collection
    const preference = new Preference({
      userId: new id(),
      drama,
      romance,
      action,
      thriller,
      sci_fi,
      comedy,
      musical,
      animation,
      mystery,
    });
    await preference.save();
    res.status(201).json({ message: "preference saved successfully!" });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;