# SudokuPuzzle

The project comprises of the following parts
## API 
- NodeJS
	- node_modules - Contains the dependencies of the project
  - app.js - Server file that is used to start the server. Port is configurable currently it runs on 8885  
  -.babelrc - Configuration file to use ES 2015 in NodeJS
  - puzzle
    - puzzle_route - contains all the possible routes which can be accessed from the puzzle module
    - puzzle_service - contains core logic to get initial puzzle and to solve it
    - puzzle_value - a custom model used in bulding a puzzle
  - to run the service change the directory to API folder and do the following
    - run npm install
    - run node app.js
## UI - Web 
- Angular
  - node_modules - Contains the dependencies of the project
  - src - root folder for angular project
  - To run the project change the directory to web and do the following
    - run npm install 
    - run npm start
  - To run the jasmine test cases do the following
    - run npm test

## Sudoku Instructions
  - The intial puzzle is hard coded. To view the results click on solve puzzle.
  - To create your own puzzle 
    - click on build your own. This would change the grid to editable mode. 
    - Enter the puzzle values and click on solve. 
    - If it is a valid sudoku puzzle you would be presented with results.  
  - Generate new will add a puzzle for you automatically.  
    - In certain scenarios you would not get a solution as not all the auto generated puzzles would have a sudoku solution for it  
  ##
![Screenshot](https://github.com/aniladevareddyca/SudokuPuzzle/blob/master/web/src/assets/Screenshot%202019-05-20%20at%203.44.17%20PM.png?raw=true)
