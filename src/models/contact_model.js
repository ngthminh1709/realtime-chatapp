const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: { type: Boolean, default: false },
    deleteAt: { type: Number, default: null }

}, {
    timestamps: true
})

module.exports = mongoose.model('contact', ContactSchema)