const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    city: {type: String},
    nickname: {type: String},
    abbr: {type: String},
    league: {type: String},
    division: {type: String},
    games: {type: Number},
    wins: {type: Number},
    losses: {type: Number},
    hex_color: {type: String},
    avatar: {type: String},
    avg_ticket_cost: {type: Number},
    payroll: {type: Number},
    offense: {
        plate_appearances: {type: Number},
        at_bats: {type: Number},
        runs_scored: {type: Number},
        hits: {type: Number},
        homeruns: {type: Number},
        walks: {type: Number},
        strikeouts: {type: Number},
    },
    defense: {
        innings_pitched: {type: Number},
        hits_allowed: {type: Number},
        runs_allowed: {type: Number},
        strikeouts_pitched: {type: Number},
        defensive_efficiency: {type: Number},
    }
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;

