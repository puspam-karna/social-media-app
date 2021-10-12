const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register user
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save new user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("password missmatch");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("cannot login ");
  }
});
module.exports = router;
