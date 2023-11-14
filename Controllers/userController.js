const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken")
exports.register = async (req, res) => {
  console.log("inside yu");
  const { username, email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      res.status(406).json("account already exist , plz login");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkdin: "",
        profile: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json("Register api failed error:", error);
  }
};
//login
exports.login = async (req, res) => {
  console.log("inside login function");
  const { email, password } = req.body
  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, "harmanloki123");
      res.status(200).json({
        existingUser,
        token,
      });
    } else {
      res.status(404).json(`Incorrect Email / Password`);
    }
  } catch (err) {
    res.status(401).json(`login api failed, Error: ${err}`);
  }
};
