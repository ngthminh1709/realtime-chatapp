const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: { type: String, default: "male" },
  phone: { type: Number, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: "avatar-default.jpg" },
  role: { type: String, default: "user" },
  local: {
    email: { type: String, trim: true, unique: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String,
  },

  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true, unique: true },
  },

  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true, unique: true },
  },

    deleteAt: { type: Number, default: null }

}, {
    timestamps: true
})
