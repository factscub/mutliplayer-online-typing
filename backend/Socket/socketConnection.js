const { createGame } = require("./createGame");
const { getAllGames } = require("./getAllGames");
const { joinGame } = require("./joinGame");
const { playTurn } = require("./playTurn");
const { homePageRoom } = require("./homePageRoom");
const { gameData } = require("./gameData");

function socketConnection(io) {

    io.on('connection', (socket) => {

        console.log('connected...')

        // create game for the first time.
        createGame(io, socket);

        // joingame the room if the game is already created.
        joinGame(io, socket);

        // handle the player's turn and notify the other player.
        playTurn(io, socket);

        // get all games of the player in the database
        getAllGames(io, socket);

        // creates room for homepage of the client
        homePageRoom(io,socket);

        gameData(io,socket);

    })

}

module.exports = { socketConnection };