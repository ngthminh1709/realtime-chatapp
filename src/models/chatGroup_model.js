const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
    name: String,
    userAmount: { type: Number, min: 3, max: 177 },
    messageAmount: { type: Number, default: 0 },
    userId: String,
    members: [
        { userId: String }
    ],
    deleteAt: { type: Number, default: null }

}, {
    timestamps: true
})

module.exports = mongoose.model('chatgroup', ChatGroupSchema)