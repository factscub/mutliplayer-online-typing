const { createGame } = require("./createGame");
const { getAllGames } = require("./getAllGames");
const { joinGame } = require("./joinGame");
const { homePageRoom } = require("./homePageRoom");
const { gameData } = require("./gameData");

function socketConnection(io) {

    io.on('connection', (socket) => {

        console.log('connected...')

        // create game for the first time.
        createGame(io, socket);

        // joingame the room 
        joinGame(io, socket);

        // get all games of the player in the database
        getAllGames(io, socket);

        // creates room for homepage of the client
        homePageRoom(io,socket);

        // sends/receives gamedata every second
        gameData(io,socket);

    })

}

module.exports = { socketConnection };