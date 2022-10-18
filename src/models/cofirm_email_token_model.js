const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ConfirmEmail = new Schema({
    email: String,
    userId: String,
    token: String,
}, {
    timestamps: true,
    collection: 'emailtokens'
})

module.exports = mongoose.model('emailtoken', ConfirmEmail)