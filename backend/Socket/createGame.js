const { GameDetails } = require('../Models/gameDetails');
const { User } = require('../Models/users');

function createGame(io, socket) {

    socket.on('createGame', async ({ combinedId, username, opponentEmail: email }, callback) => {

        try {
            // check if the opponent player is in the database.
            const opponentUser = await User.findOne({ email });

            if (!opponentUser) {
                callback({ error: 'Invalid user.', result: null });
                return;

            }

            // check if the players had an unfinished game in the past.
            const userGameDetails = await GameDetails.find({ $and: [{ combinedId }, { gameStatus: 'PROGRESS' }] }).count();

            if (userGameDetails) {
                callback({ error: 'Complete previous game.', result: null });
                return;
            }


            const newGame = await GameDetails({
                gameStatus: 'PROGRESS',
                usernames: [username, opponentUser.username],
                gameCreatedBy: username,
                winner: '',
                combinedId,
                playersGameStatus: {
                    [username]: {
                        errors: 0,
                        elapsedTime: '00:00',
                        finished: false,
                        timeCount: 0
                    },
                    [opponentUser.username]: {
                        errors: 0,
                        elapsedTime: '00:00',
                        finished: false,
                        timeCount: 0
                    }
                }

            });

            const gameData = await newGame.save();

            callback({
                error: null, result: {
                    roomId: gameData.id,
                    opponent: opponentUser.username
                }
            });

        } catch (error) {
            callback({ error: 'Something went wrong.', result: null });
        }
    })
}

module.exports = { createGame };