const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    name: {type: String},
    cumWar: {
        season01: {type: Number},
        season02: {type: Number},
        season03: {type: Number},
        season04: {type: Number},
        season05: {type: Number},
        season06: {type: Number},
        season07: {type: Number},
        season08: {type: Number},
        season09: {type: Number},
        season10: {type: Number},
        season11: {type: Number},
        season12: {type: Number},
        season13: {type: Number},
        season14: {type: Number},
        season15: {type: Number},
        season16: {type: Number},
        season17: {type: Number},
        season18: {type: Number},
        season19: {type: Number},
        season20: {type: Number},
        season21: {type: Number},
        season22: {type: Number},
        season23: {type: Number},
    },
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;

