const User = require("../models/user_model")
const { StatusCodes } = require('http-status-codes');

const JsonSearch = require('search-array').default

const UserController = {

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


    }
}


module.exports = UserController;