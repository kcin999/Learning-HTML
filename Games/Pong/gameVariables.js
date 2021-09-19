//canvas elements
var canvas = document.getElementById("PongCanvas");
var ctx = canvas.getContext("2d");

canvas.width=window.innerWidth/2;
canvas.height = (3*canvas.width)/4; 

//Ball Variables
let dx = canvas.width/320;
let dy = canvas.width/320;


//keyboard elements
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

//game variables
var gamestate = "startMenu"
let p1Score = 0;
let p2Score = 0;
let rallyScore = 0;
randomSayings = ["Better luck next time. :(", "Great Job!", "WOO HOO!!", "All Star!", "I know you can do better next time."];
randomSayingIndex = -1;

