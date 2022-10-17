const mongoose = require('mongoose');

async function connect () {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected')
    } catch (error) {
        console.error('Error connecting')
    }
}

module.exports = { connect }
