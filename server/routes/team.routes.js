const TeamController = require('../controllers/team.controller');

module.exports = app => {
    app.post('/api/team/new/', TeamController.createTeam);
    app.get('/api/team/', TeamController.findAllTeams);
    app.get('/api/team/:id', TeamController.findOneTeam);
    app.delete('/api/team/:id/delete', TeamController.deleteTeam);
    app.put('/api/team/:id/edit/', TeamController.updateTeam);
    app.patch('/api/team/:id/edit/patch/', TeamController.updateTeamPatch);
}