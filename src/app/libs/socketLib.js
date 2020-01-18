/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const tokenLib = require("./tokenLib.js");
const redisLib = require("./redisLib.js");



let setServer = (server) => {
    let io = socketio.listen(server);
    let myIo = io.of('/')
    myIo.on('connection', (socket) => {

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");

        socket.on('set-user', (authToken) => {

            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {

                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    let key = currentUser.userId
                    let value = fullName

                    let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsers", key, value, (err, result) => {
                        if (err) {
                            console.log(`some error occurred`)
                        } else {
                            // getting online users list.
                            console.log(`${value} added to online user list`);

                        }
                    })
                }
            })

        }) // end of listening set-user event


        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel
            if (socket.userId) {
                redisLib.deleteUserFromHash('onlineUsers', socket.userId)
                redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        socket.leave(socket.room)

                    }
                })
            }
        }) // end of on disconnect

        /**
         * Any updates on meetings by Admin are received here, which in turn will emit
         * to all users.
         */
        socket.on('meetingupdate', (data) => {

            socket.broadcast.emit('meetingupdate', data);
        })
    });
}

module.exports = {
    setServer: setServer
}
