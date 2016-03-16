var entities = require('./entities');

module.exports = function(app) {
  
  /**
   * Routes for Entities
   */
  app.post('/entity', entities.create);
  app.get('/entity/search', entities.search);
  app.get('/entity/:id', entities.retrieve);
  app.get('/entity/:id/:label', entities.retrieve);
  app.put('/entity/:id', entities.update);
  app.delete('/entity/:id', entities.delete);

};