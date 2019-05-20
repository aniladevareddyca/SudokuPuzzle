const puzzleRoutes = require('./puzzle_routes');

module.exports = function(app) {
  puzzleRoutes(app);
};