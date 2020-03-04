const Team = require('../models/team.model');

module.exports.createTeam = (request, response) => {
    const {city, nickname, abbr, league, division, games, wins, losses, plate_appearances, at_bats, runs_scored, hits, homeruns, walks, strikeouts, innings_pitched, hits_allowed, runs_allowed, strikeouts_pitched, defensive_efficiency, hex_color, avatar, avg_ticket_cost, payroll} = request.body;
    Team.create({
        city, 
        nickname, 
        abbr, 
        league, 
        division, 
        games, 
        wins, 
        losses,
        hex_color,
        avatar,
        avg_ticket_cost,
        payroll,
        offense: {
            plate_appearances, 
            at_bats, 
            runs_scored, 
            hits, 
            homeruns, 
            walks, 
            strikeouts
        },
        defense: {
            innings_pitched, 
            hits_allowed, 
            runs_allowed, 
            strikeouts_pitched, 
            defensive_efficiency
        } 
    })
    .then(newTeam => response.status(200).json({team: newTeam}))
    .catch(err => response.status(500).json(err));
};

module.exports.findAllTeams = (request, response) => {
    Team.find({})
    .then(allTeams => response.json(allTeams))
    .catch(err => response.json({message: "Something went wrong", error: err}));
};

module.exports.findOneTeam = (request, response) => {
    Team.findOne({_id: request.params.id})
    .then(question => response.json(question))
    .catch(err => response.status(500).json(err));
};

module.exports.deleteTeam = (request, response) => {
    Team.deleteOne({_id:request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json({message: "Something went wrong", error: err}));
};

module.exports.updateTeam = (request, response) => {
    Team.updateOne({_id:request.params.id}, request.body, {new:true})
    .then(updatedTeam => {
        console.log(updatedTeam)
        response.json(updatedTeam)
    })
    .catch(err => {
        console.log(err);
        response.status(500).json(err)
    })
};
module.exports.updateTeamPatch = (request, response) => {
    Team.updateOne({_id:request.params.id}, {$set: request.body}, {new:true})
    .then(updatedTeam => {
        console.log(updatedTeam)
        response.json(updatedTeam)
    })
    .catch(err => {
        console.log(err);
        response.status(500).json(err)
    })
};

// module.exports.updateTeam = (request, response) => {
//     Team.findOneAndUpdate({_id:request.params.id}, request.body, {new: true})
//     .then(updatedTeam => {
//         console.log(updatedTeam)
//         response.json(updatedTeam)
//     })
//     .catch(err => {
//         console.log(err);
//         response.status(500).json(err)
//     })
// };