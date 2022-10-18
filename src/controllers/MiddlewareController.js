const jwt = require("jsonwebtoken");
// require('dotenv').config()

const middlewareController = {
  //verify Token
  verifyToken: (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.VERIFY_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({
            sucess: false,
            message: "Token is not valid!",
          });
        }
        req.user = user;
        return next();
      });
    } else {
      res.status(401).json({
        sucess: false,
        message: "You are not allowed to access!",
      });
    }
  },

  adminVerifyToken: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.role == "admin") {
        next();
      } else {
        res.status(403).json({
          sucess: false,
          message: "You are not allowed to access!",
        });
      }
    });
  },
};

module.exports = middlewareController;
