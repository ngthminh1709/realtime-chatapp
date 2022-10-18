const ContactModel = require("../models/contact_model")
const { StatusCodes } = require('http-status-codes');

const ContactController = {

    addNewFriend: async (req, res) => {

        const userId = req.params.id;
        // const userId = req.user._id;
        const contactId = req.body.id;

        if (userId && contactId)
            try {

                const contactExists = await ContactModel.findOne({
                    $or: [
                        {
                            $and: [
                                { "userId": userId },
                                { "contactId": contactId }
                            ]
                        },
                        {
                            $and: [
                                { "userId": contactId },
                                { "contactId": userId }
                            ]
                        }

                    ]
                })

                if (contactExists) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: "Friend request sent !!!"
                    })
                }

                let newContactItem = {
                    userId: userId,
                    contactId: contactId
                }

                const newContact = await ContactModel.create(newContactItem);

                res.status(StatusCodes.CREATED).json({
                    success: true,
                    contact: newContact
                })
            } catch (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Server is error"
                })
            }
        else
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Input invalid !!!"
            })
    },

    removeRequestContact: async (req, res) => {

        // const userId = req.user._id;
        const userId = req.params.id;
        const contactId = req.body.id;

        if (userId && contactId)
            try {
                const contactExists = await ContactModel.deleteOne({
                    $and: [
                        { "userId": userId },
                        { "contactId": contactId },
                        { "status": false }
                    ]
                })
                if (contactExists) {

                    res.status(StatusCodes.CREATED).json({
                        success: true,
                        message: "Remove request add friend successfull !!!"
                    })
                }
                else {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: "Can't not remove user!!!"
                    })
                }


            } catch (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Server is error"
                })
            }
        else
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Input invalid !!!"
            })
    },

    acceptResquestContact: async (req, res) => {

        const userId = req.params.id;
        // const userId = req.user._id;
        const contactId = req.body.id;

        if (userId && contactId)
            try {

                const requestContact = await ContactModel.updateOne({
                    $and: [
                        { "userId": contactId },
                        { "contactId": userId },
                        { "status": false }
                    ]
                }, { "status": true })

                if (requestContact) {
                    res.status(StatusCodes.OK).json({
                        success: true,
                        message: "Accept friend successfully !!"
                    })
                }

                else {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: true,
                        message: "Server is error"
                    })
                }

            } catch (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Server is error"
                })
            }
        else
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Input invalid !!!"
            })
    }
}

module.exports = ContactController;