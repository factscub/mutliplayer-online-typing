
const { getWinner } = require('../utils/getwinner');
const { GameDetails } = require('../Models/gameDetails');
const { getGameStatus } = require('../utils/getGameStatus');

function gameData(io, socket) {

    socket.on('gameData', async ({ roomId, username, playerData }) => {

        try {
            const data = playerData.playersGameStatus[username]

            const update = {
                elapsedTime: data.elapsedTime,
                errors: data.errors,
                finished: data.finished,
                timeCount: data.timeCount
            }

            const updatedGameDetails = await GameDetails.findOneAndUpdate({ _id: roomId }, { $set: { [`playersGameStatus.${username}`]: update } }, { new: true })

            const users = [...updatedGameDetails.playersGameStatus]

            if (getGameStatus(users)) {

                const updatedGameDetails = await GameDetails.findOneAndUpdate({ _id: roomId }, { winner: getWinner(users), gameStatus: "ENDED" }, { new: true });

                io.to(roomId).emit('gameData', updatedGameDetails)
                // const [u1, u2] = updatedGameDetails.usernames

                // io.to(u1).to(u2).emit('notifyUser', updatedGameDetails)
                if (updatedGameDetails.winner) {
                    // console.log('Left the room.');
                    socket.leave(roomId);
                }
                return;
            }
            io.to(roomId).emit('gameData', updatedGameDetails);


        } catch (error) {
            console.log('error from gamedata')
        }

    });

}

module.exports = { gameData };