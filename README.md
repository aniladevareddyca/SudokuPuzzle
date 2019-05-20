# SudokuPuzzle

The project comprises of the following parts
##API - API Folder
##UI - Web Folder

##API 
NodeJS
node_modules - Contains the dependencies of the project
app.js - Server file that is used to start the server. Port is configurable currently it runs on 8885
.babelrc - Configuration file to use ES 2015 in NodeJS
puzzle
puzzle_route - contains all the possible routes which can be accessed from the puzzle module
puzzle_service - contains core logic to get initial puzzle and to solve it
puzzle_value - a custom model used in bulding a puzzle

##Web
Angular
node_modules - Contains the dependencies of the project
src - root folder for angular project
To run the project UI project change the directory to web
run npm install run npm start
To run the test cases
