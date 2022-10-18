const User = require("../models/user_model");
const { StatusCodes } = require("http-status-codes");

const JsonSearch = require("search-array").default;
const cloudinary = require("../configs/cloudinary");

const UserController = {
  findUserByUserName: async (req, res) => {
    const { username } = req.query;

    if (!username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please enter keyword to find !!!" });
    } else {
      const users = await User.find();
      const searcher = new JsonSearch(users);

      const usersFind = searcher.query(username);

      if (usersFind && usersFind.length !== 0) {
        console.log(usersFind);
        return res.status(StatusCodes.OK).json(usersFind);
      } else
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `Not found user with keyword ${username} ` });
    }
  },

  updateUserProfie: async (req, res) => {
    const { id } = req.query;
    const { username, gender, phone, address, avatar } = req.body;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (!avatar) {
        await User.findByIdAndUpdate(id, {
          username,
          gender,
          phone,
          address,
        });

        return res.status(200).json({
          success: true,
          message: "User updated successfully!",
        });
      }

      const options = {
        upload_preset: "usersAvatar",
        public_id: id,
        overwrite: true,
      };

      const result = await cloudinary.uploader.upload(avatar, options);

      await User.findByIdAndUpdate(
        id,
        {
          username,
          gender,
          phone,
          address,
          avatar: result.secure_url,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "User profile successfully uploaded!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  },
};

module.exports = UserController;
