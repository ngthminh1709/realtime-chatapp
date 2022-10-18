const User = require("../models/user_model")
const { StatusCodes } = require('http-status-codes');

const JsonSearch = require('search-array').default

const UserController = {
    
    findUserByUserName: async (req, res) => {
        const { username } = req.query;
    
        if (!username) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please enter keyword to find !!!" });
        }
        else {
            const users = await User.find();
            const searcher = new JsonSearch(users);
    
            const usersFind = searcher.query(username);
    
            if (usersFind && usersFind.length !== 0) {
                console.log(usersFind)
                return res.status(StatusCodes.OK).json(usersFind);
            }
            else
                return res.status(StatusCodes.NOT_FOUND).json({ message: `Not found user with keyword ${username} ` })
    
        }
    
    }
}


module.exports = UserController;