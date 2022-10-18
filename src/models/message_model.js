const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
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
    text: String,
    file: { data: Buffer, contentType: String, filename: String },
    status: { type: Boolean, default: false },
    deleteAt: { type: Number, default: null }

}, {
    timestamps: true
})

module.exports = mongoose.model('message', MessageSchema)