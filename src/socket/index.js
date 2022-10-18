const addNewContact = require("./addNewContact");

const initSockets = (io) => {
    addNewContact(io)
}

module.exports = initSockets;