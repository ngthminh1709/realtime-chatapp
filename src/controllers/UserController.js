const User = require("../models/user_model");
const { StatusCodes } = require("http-status-codes");

const JsonSearch = require("search-array").default;
const cloudinary = require("../configs/cloudinary");

const UserController = {
<<<<<<< HEAD

    findUserByUserName: async (req, res) => {
        const { username } = req.query;

        try {
            if (!username) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Please enter keyword to find !!!"
                });
            }
            else {
                const users = await User.find();
                const searcher = new JsonSearch(users);

                const usersFind = searcher.query(username);

                if (usersFind && usersFind.length !== 0) {
                    return res.status(StatusCodes.OK).json({
                        success: true,
                        user: usersFind
                    });
                }
                else
                    return res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        message: `Not found user with keyword ${username} `
                    })

            }

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Server is error"
            })
        }


=======
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
>>>>>>> a6ffeb36ee8517d728b3dd62beb2611459a1a7b0
    }
  },

  updateUserProfie: async (req, res) => {
    const { id } = req.params;
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
