const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randtoken = require("rand-token");
const EmailToken = require("../models/cofirm_email_token_model");

const AuthController = {
  registerPage: async (req, res) => {
    return res.render("auth/register");
  },

  loginPage: async (req, res) => {
    return res.render("auth/login");
  },

  registerNewUser: async (req, res) => {
    const { email, username, password: plainTextPassword } = req.body;
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
        local: {
          email,
          password,
        },
      };

      await User.create(userItem);

      const token = randtoken.generate(16);
      await EmailToken.create({ email, token });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILE_USER,
          pass: process.env.NODEMAILE_PASSWORD,
        },
      });

      const options = {
        from: "minhcloudinary@gmail.com",
        to: email,
        subject: "Cofirm Email To Active Account",
        html: `<h2>Email from Realtime-Chatapp</h2><p>Ấn vào <a href="http://localhost:3000/auth/confirm-email/${token}">đây</a> để xác thực email</p>`,
      };

      transporter.sendMail(options, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("Mail sent successfully!");
      });

      res.status(201).json({
        success: true,
        message: "User registered, please check your email to activce account!",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ success: false, error });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
      const user = await User.findOne({ 
        "local.email": email 
      }) ;

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
      return res.status(500).json({ success: false, err });
    }
  },

  logout: async (req, res) => {
    try {
      const { id } = req.body;

      const currnetUser = await User.findById(id);
      const local = currnetUser.local;

      await User.findByIdAndUpdate(
        id,
        { local: { ...local, verifyToken: "" } },
        { new: true }
      );

      return res.status(200).json({ success: true, message: "Logged out!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { id, oldPassword, newPassword } = req.body;

      const currnetUser = await User.findById(id);
      const local = currnetUser.local;

      const checker = await bcrypt.compare(oldPassword, local.password);

      if (!checker) {
        return res
          .status(403)
          .json({ success: false, message: "Current password is incorrect!" });
      }

      await User.findByIdAndUpdate(
        id,
        { local: { ...local, password: newPassword } },
        { new: true }
      );

      return res
        .status(200)
        .json({ success: true, message: "Your password update successfully!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  },

  confirmEmail: async (req, res) => {
    try {
      const { token } = req.params;

      const checker = await EmailToken.findOne({ token });
      const email = checker.email;

      if (!checker) {
        return res.status(404).json({
          success: false,
          message: "Ivalid token!",
        });
      }

      await User.findOneAndUpdate(
        { "local.email": email },
        {
          $set: {
            "local.isActive": true,
          },
        }
      );

      await EmailToken.findOneAndDelete({ token });

      return res
        .status(200)
        .json({ success: true, message: "Account active successfully!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
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
