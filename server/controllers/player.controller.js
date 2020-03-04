const Player = require('../models/player.model');

module.exports.createPlayer = (request, response) => {
    const {name, season01, season02, season03, season04, season05, season06, season07, season08, season09, season10, season11, season12, season13, season14, season15, season16, season17, season18, season19, season20, season21, season22, season23 } = request.body;
    Player.create({
        name, 
        cumWar: {
           season01,
           season02,
           season03,
           season04,
           season05,
           season06,
           season07,
           season08,
           season09,
           season10,
           season11,
           season12,
           season13,
           season14,
           season15,
           season16,
           season17,
           season18,
           season19,
           season20,
           season21,
           season22,
           season23,
        
        },
    })
    .then(newPlayer => response.status(200).json({player: newPlayer}))
    .catch(err => response.status(500).json(err));
};

module.exports.findAllPlayers = (request, response) => {
    Player.find({})
    .then(allPlayers => response.json(allPlayers))
    .catch(err => response.json({message: "Something went wrong", error: err}));
};

module.exports.findOnePlayer = (request, response) => {
    Player.findOne({_id: request.params.id})
    .then(question => response.json(question))
    .catch(err => response.status(500).json(err));
};

module.exports.deletePlayer = (request, response) => {
    Player.deleteOne({_id:request.params.id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json({message: "Something went wrong", error: err}));
};

module.exports.updatePlayer = (request, response) => {
    Player.updateOne({_id:request.params.id}, request.body, {new:true})
    .then(updatedPlayer => {
        console.log(updatedPlayer)
        response.json(updatedPlayer)
    })
    .catch(err => {
        console.log(err);
        response.status(500).json(err)
    })
};

module.exports.updatePlayerPatch = (request, response) => {
    Player.updateOne({_id:request.params.id}, {$set: request.body}, {new:true})
    .then(updatedPlayer => {
        console.log(updatedPlayer)
        response.json(updatedPlayer)
    })
    .catch(err => {
        console.log(err);
        response.status(500).json(err)
    })
};

