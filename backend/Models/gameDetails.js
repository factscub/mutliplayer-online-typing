const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const gameDetailsSchema = new Schema({
    playersGameStatus: {
        type: Map,
        of: {
            errors: Number,
            elapsedTime: String,
            finished: Boolean,
            timeCount:Number
        }
    },
    gameStatus: {
        type: String,
    },
    usernames: {
        type: [String]
    },
    gameCreatedBy: {
        type: String
    },
    winner: {
        type: String
    },
    combinedId: {
        type: String,
    }
}, {
    timestamps: true

});

const GameDetails = model('gameDetails', gameDetailsSchema);
module.exports = { GameDetails };