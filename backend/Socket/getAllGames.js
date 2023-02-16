
const { GameDetails } = require('../Models/gameDetails')
const getAllGames = (io, socket) => {

    socket.on('getAllGames', async ({ username }, callback) => {
        try {
            // gets all games that match the username
            const games = await GameDetails.find({ usernames: { $in: [username] } });
            callback({ error: null, result: games });

        } catch (error) {
            callback({ error: 'something went wrong.', result: null });
        }

    })

}

module.exports = { getAllGames }