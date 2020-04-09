const { Router } = require('express');
const routes = Router();
const colorController = require('./controllers/colorController.js');
const database = require('./database/connection.js');

routes.get('/color', colorController.index);
routes.post('/color', colorController.store);
routes.put('/reaction', colorController.editReaction);
routes.get('/search', colorController.searchColors);

module.exports =  routes;