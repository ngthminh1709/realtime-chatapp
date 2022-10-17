const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AuthController = {
  registerPage: async (req, res) => {
    return res.render("auth/register");
  },

  loginPage: async (req, res) => {
    return res.render("auth/login");
  },

  registerNewUser: async (req, res) => {
    const { email, username, password: plainTextPassword, gender } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainTextPassword, salt);
    //Create a new user

    try {
      if (!username || !email) {
        return res
          .status(400)
          .json({ message: "Username or email is not a valid" });
      }
      if (username.length > 16) {
        return res
          .status(400)
          .json({ message: "Username more than 16 characters" });
      }
      if (plainTextPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "Password less than 6 characters" });
      }
      if (plainTextPassword.length > 20) {
        return res
          .status(400)
          .json({ message: "Password more than 20 characters" });
      }

      const currentUser = await User.findOne({ "local.email": email });

      if (currentUser) {
        return res.status(409).json({
          success: false,
          message: "Email or username already in use!",
        });
      }

      const userItem = {
        username,
        gender,
        local: {
          email,
          password,
        },
      };

      await User.create(userItem);

      res.status(201).json({
        success: true,
        message: "User successfully created",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json(error);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
      const user = await User.findOne({ "local.email": email });

      console.log(user);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Ivalid email!",
        });
      }

      const validPassword = await bcrypt.compare(password, user.local.password);

      if (!validPassword) {
        return res.status(404).json("Wrong Password!");
      }

      if (user && validPassword) {
        const verifyToken = AuthController.generateVerifyToken(user);
        const local = user.local;

        const loggedUser = await User.findByIdAndUpdate(
          user._id,
          { local: { ...local, verifyToken } },
          { new: true, select: "-password" }
        );
        res.status(200).json({ success: true, user: loggedUser });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  generateVerifyToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        role: user.username,
      },
      process.env.VERIFY_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  },
};

module.exports = AuthController;
