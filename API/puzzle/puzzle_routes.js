const PuzzleService = require("./puzzle_service.js");


module.exports = function(app) {
	 app.get('/api/v1/getPuzzle/:hardCoded', (req, res) => {
		let puzzleService = new PuzzleService();
		let puzzle = puzzleService.getNewPuzzle(req.params);
		res.header("Access-Control-Allow-Origin", "*");
		res.json({"puzzle":puzzle});
	});
	
	app.post('/api/v1/solvePuzzle',function(request, response) {
	//	console.log(request);
		 let puzzleService = new PuzzleService();	
		let puzzle = puzzleService.solvePuzzle(request.body);
		response.header("Access-Control-Allow-Origin", "*");
		response.json({"puzzle":puzzle});
       console.log(request.body); //This prints the JSON document received (if it is a JSON document)
	});


};