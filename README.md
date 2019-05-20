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
  - To run the test cases do the following

## Sudoku Instructions
  - To start playing click on start game. You would be presented with a inital set of puzzles. As soon as the puzzle is        started a timer is starts to help you to keep a track of your record.
  - You cannot enter any value into the the puzzle. This version is a read only.
  - When you are ready click on solve puzzle and the algorithm should solve the puzzle for you.
  - There could be scenarios where a possible solution cannot be found for a given puzzle. In those cases you would have to start a new puzzle.  
![Alt text] (https://github.com/aniladevareddyca/SudokuPuzzle/blob/master/web/src/assets/Screenshot%202019-05-20%20at%203.44.17%20PM.png?raw=true)
