const cloudinary = require('cloudinary').v2;

cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: "miki-shop-dev",
  api_key: "585771684382798",
  api_secret: "YbboOSJK_kzv59UV39RY8oifuRg",
});

module.exports = cloudinary;
