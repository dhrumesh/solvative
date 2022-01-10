const { userModel } = require("../models/user.model");
const { signupValidation } = require("../middlewares/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    const { error } = await signupValidation(req.body);
    if (error) return res.status(406).json({ message: error.message });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      isAdmin: false,
    });

    if (req.body.admin && req.body.admin === process.env.admin_secret) {
      user.isAdmin = true;
    } else {
      return res.status(422).json({ message: "admin secret is not valid" });
    }
    const saved = await user.save();
    console.log(saved);

    res.status(201).json({ user: saved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.status(404).json({ message: "email and password required" });

    const email = await userModel.findOne({ email: req.body.email });
    if (!email) return res.status(422).json({ message: "invalid credentials" });

    const check = await bcrypt.compare(req.body.password, email.password);
    if (!check) return res.status(422).json({ message: "invalid credentials" });

    const token = jwt.sign({ _id: email._id }, process.env.JWT_SECRET);

    res.status(200).json({ user: email, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  signin,
};
