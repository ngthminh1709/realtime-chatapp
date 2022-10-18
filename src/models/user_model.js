const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: String,
    gender: { type: String, default: "male" },
    phone: { type: Number, default: null },
    address: { type: String, default: null },
    avatar: { type: String, default: "https://res.cloudinary.com/miki-shop-dev/image/upload/v1662737253/usersAvatar/631b4aa2a1f4b4741dcecaba.jpg" },
    role: { type: String, default: "user" },
    local: {
      email: { type: String, trim: true },
      password: String,
      isActive: { type: Boolean, default: false },
      verifyToken: String,
    },

    facebook: {
      uid: String,
      token: String,
      email: { type: String, trim: true },
    },

    google: {
      uid: String,
      token: String,
      email: { type: String, trim: true },
    },

    deleteAt: { type: Number, default: null },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("user", UserSchema);
