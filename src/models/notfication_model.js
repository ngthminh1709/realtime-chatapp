const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NotficationSchema = new Schema({
    sender: {
        id: String,
        username: String,
        avatar: String
    },
    receiver: {
        id: String,
        username: String,
        avatar: String,
    },
    type: String,
    content: String,
    isRead: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('notfication', NotficationSchema)