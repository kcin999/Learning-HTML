//canvas elements
var canvas = document.getElementById("ballBreakerCanvas");
var ctx = canvas.getContext("2d");

//Ball Variables
let x = canvas.width / 2;
let y = canvas.height / 2;
let ballRadius = 10;
let dx = 3;
let dy = 3;

//paddle elements
var paddleHeight = 75;
var paddleWidth = 10;
var paddle1X = 0;
var paddle1Y = (canvas.height-paddleHeight)/2;
var paddle2X = canvas.width-paddleWidth;
var paddle2Y = (canvas.height - paddleHeight)/2;

//keyboard elements
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

//game variables
var gamestate = "startMenu"

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawP1Paddle(){
    ctx.beginPath();
    ctx.rect(paddle1X,paddle1Y, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawP2Paddle(){
    ctx.beginPath();
    ctx.rect(paddle2X, paddle2Y,paddleWidth,paddleHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }else if(e.key == "W" || e.key =="w"){
        wPressed = true;
    }else if(e.key == "S" || e.key == "s"){
        sPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }else if(e.key == "W" || e.key =="w"){
        wPressed = false;
    }else if(e.key == "S" || e.key == "s"){
        sPressed = false;
    }
}
function getMousePosition(e){
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
  function mouseClicked(e){
    let mousePos = getMousePosition(e);
  
    if(gamestate == "startMenu"){
        //Button Data
        let rectWidth = canvas.width/4;
        let rectHeight = canvas.height /12;
        let rectX = (canvas.width - rectWidth) /2;
        let rectY = (canvas.height/2 + canvas.height /12);
        let rectYTwoPlayer = (canvas.height/2 + canvas.height /5);

        //Single Player
        if((mousePos.x >= rectX && mousePos.x <= rectX + rectWidth)&& (mousePos.y >= rectY && mousePos.y <= rectY+rectHeight)){
            gamestate = "singlePlayer";
        }else if ((mousePos.x >= rectX && mousePos.x <= rectX + rectWidth)&& (mousePos.y >= rectYTwoPlayer && mousePos.y <= rectYTwoPlayer+rectHeight)){
            gamestate = "twoPlayer";
        }
    }
  
    
  }

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click",mouseClicked,false);

function collisionDetection(){
    //Top and bottom collision detection
    if(y+dy + ballRadius >= canvas.height || y+dy <= ballRadius){
        dy = -dy;
    }

    //left side collision
    if(x - ballRadius +dx <= 0){
        alert("Player 1 Lost");
        gamestate = "startMenu";
        x = canvas.width /2;
    }
    if(x+ballRadius +dx >= canvas.width){
        alert("Player 2 Lost");
        gamestate = "startMenu";
        x = canvas.width /2;
    }

    //Paddle 1 Collision detection
    if((paddle1Y <= y && paddle1Y + paddleHeight >= y) && (x-ballRadius <= paddle1X + paddleWidth)){
        dx = -dx;

        if(dx <0){
            dx -= .1;
        }else{
            dx += .1;
        }
    }

    //Paddle 2 Collision detection
    if((paddle2Y <= y && paddle2Y + paddleHeight >= y) && (paddle2X <= x+ballRadius)){
        dx = -dx;

        if(dx <0){
            dx -= .1;
        }else{
            dx += .1;
        }
    }
}

function playSinglePlayer(){
    drawBall();
    drawP1Paddle();
    drawP2Paddle();

    collisionDetection();

    //Keyboard movement
    if((upPressed || wPressed) && paddle1Y >= 0){
        paddle1Y -= 7;
    }else if((downPressed || sPressed) && paddle1Y + paddleHeight <= canvas.height){
        paddle1Y += 7;
    }

    //paddle 2 automovement
    if(!(y>=paddle2Y && y<= paddle2Y + paddleHeight)){
        if(paddle2Y >= y && paddle2Y >= 0){
            paddle2Y -= 7;
        }
        if(paddle2Y + paddleHeight <= y&& paddle2Y + paddleHeight <= canvas.height){
            paddle2Y += 7;
        }
    }


    x += dx;
    y += dy;
}

function playTwoPlayer(){
    drawBall();
    drawP1Paddle();
    drawP2Paddle();

    collisionDetection();

    //Keyboard movement
    if(wPressed && paddle1Y >= 0){
        paddle1Y -= 7;
    }else if(sPressed && paddle1Y + paddleHeight <= canvas.height){
        paddle1Y += 7;
    }

    if(upPressed && paddle2Y >= 0){
        paddle2Y -= 7;
    }else if(downPressed && paddle2Y + paddleHeight <= canvas.height){
        paddle2Y += 7;
    }

    x += dx;
    y += dy;
}

function drawStartMenu(){
    //Welcome Text
    text = "Welcome to Pong"
    ctx.fillStyle = "#FFFFFF"
    ctx.font  = "45px Arial bold";
    ctx.fillText(text,(canvas.width - ctx.measureText(text).width)/2,canvas.height/2);

    //Player Buttons
    let rectWidth = canvas.width/4;
    let rectHeight = canvas.height /12;
    let rectX = (canvas.width - rectWidth) /2;
    let rectY = (canvas.height/2 + canvas.height /12);
    ctx.strokeStyle = '#FFFFFF'
    ctx.font  = "25px Arial bold";


    //single player
    ctx.rect(rectX, rectY,rectWidth,rectHeight);
    ctx.stroke();

    text = "One Player";
    ctx.fillText(text,(canvas.width - ctx.measureText(text).width)/2,rectY + (rectHeight + ctx.measureText(text).actualBoundingBoxAscent)/2)

    //two player
    rectY = (canvas.height/2 + canvas.height /5);
    ctx.rect(rectX, rectY,rectWidth,rectHeight);
    ctx.stroke();

    text = "Two Player";
    ctx.fillText(text,(canvas.width - ctx.measureText(text).width)/2,rectY + (rectHeight + ctx.measureText(text).actualBoundingBoxAscent)/2)

}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(gamestate == "startMenu"){
        drawStartMenu();
    }else if(gamestate == "singlePlayer"){
        playSinglePlayer();
    }else if(gamestate== "twoPlayer"){
        playTwoPlayer();
    }
    
    requestAnimationFrame(draw);
}

draw();