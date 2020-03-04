const PlayerController = require('../controllers/player.controller');

module.exports = app => {
    app.post('/api/player/new/', PlayerController.createPlayer);
    app.get('/api/player/', PlayerController.findAllPlayers);
    app.get('/api/player/:id', PlayerController.findOnePlayer);
    app.delete('/api/player/:id/delete', PlayerController.deletePlayer);
    app.put('/api/player/:id/edit/', PlayerController.updatePlayer);
    app.patch('/api/player/:id/edit/patch/', PlayerController.updatePlayerPatch);
}