const { GameDetails } = require('../Models/gameDetails');
function joinGame(io, socket) {
    socket.on('joinGame', async ({ roomId }) => {

        try {
            // gets the game details that matches the roomId
            //  and sends to every socket that is formed with roomId
            const gameDetails = await GameDetails.findById({ _id: roomId }).exec();
            socket.join(roomId);
            io.to(roomId).emit('joinGame', gameDetails);

            // notify the opponent if he is in the home page
            const [u1, u2] = gameDetails.usernames

            io.to(u1).to(u2).emit('notifyUser', gameDetails)

            if (gameDetails.gameStatus === 'ENDED') {
                socket.leave(roomId)
                // console.log('Left the rooom from joingame.')
            }

        } catch (error) {
            console.log('error from joingame')
        }

    })
}


module.exports = { joinGame };