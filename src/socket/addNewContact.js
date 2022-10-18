const addNewContact = (io) => {
    io.on('connection', (socket) =>{
        console.log('a user connectected');

        socket.on('add-new-contact', (data) => {
            console.log(data);
        })


        socket.on('disconnect', () => {
            console.log('a user disconnect');
        })
    })
};

module.exports = addNewContact;