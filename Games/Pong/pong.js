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
let p1Score = 0;
let p2Score = 0;
let rallyScore = 0;


//Event listeners
function keyDownHandler(e) {
    if(gamestate !="waitingForInputSinglePlayer" && gamestate!= "waitingForInputTwoPlayer"){
        if(e.key == "Up" || e.key == "ArrowUp") {
            upPressed = true;
        }else if(e.key == "Down" || e.key == "ArrowDown") {
            downPressed = true;
        }else if(e.key == "W" || e.key =="w"){
            wPressed = true;
        }else if(e.key == "S" || e.key == "s"){
            sPressed = true;
        }
    }else{
        if(gamestate == "waitingForInputSinglePlayer"){
            gamestate = "singlePlayer";
        }else if(gamestate == "waitingForInputTwoPlayer"){
            gamestate = "twoPlayer";
        }
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
          let rectWidth = canvas.width/3.95;
        let rectHeight = canvas.height /12;
        
        let leftColumnX = (canvas.width/2 - rectWidth) /2;
        let rightColumnX = (3*canvas.width/2 - rectWidth) /2;
        
        let topRowY = (canvas.height/2 + canvas.height /12);
        let bottomRowY = (canvas.height/2 + canvas.height /5);
        
        if((mousePos.x >= leftColumnX && mousePos.x <= leftColumnX + rectWidth) && (mousePos.y >= topRowY && mousePos.y <= topRowY + rectHeight)){
            gamestate = "waitingForInputSinglePlayer"
        }else if((mousePos.x >= leftColumnX && mousePos.x <= leftColumnX + rectWidth) && (mousePos.y >= bottomRowY && mousePos.y <= bottomRowY + rectHeight)){
            gamestate = "waitingForInputSinglePlayerRally";
        }else if ((mousePos.x >= rightColumnX && mousePos.x <= rightColumnX + rectWidth) && (mousePos.y >= topRowY && mousePos.y <= topRowY + rectHeight)){
            gamestate = "waitingForInputTwoPlayer";
        }else if ((mousePos.x >= rightColumnX && mousePos.x <= rightColumnX + rectWidth) && (mousePos.y >= bottomRowY && mousePos.y <= bottomRowY + rectHeight)){
            gamestate = "waitingForInputTwoPlayerRally";
        }
    }
    
    
}
  
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click",mouseClicked,false);
  
//Game Functions
function resetGame(){
    dx = 3;
    dy = 3;
    x = canvas.width /2;
    y = canvas.height / 2;
    paddle1Y =(canvas.height-paddleHeight)/2;
    paddle2Y =(canvas.height-paddleHeight)/2;
}

function checkScores(){
    if(p1Score >=10 && p1Score - p2Score >=2){
        alert("Player 1 has won");
    }else if (p2Score >= 10 && p2Score - p1Score >=2){
        alert("Player 2 has won");
    }
}

//Draw Functions
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

function drawScores(){
    //Draw Dividing Line
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.stroke();
    ctx.closePath();
    
    ctx.font = "bold 72px Arial ";
    scoreString = p1Score.toString();
    ctx.strokeText(scoreString, (canvas.width/2 - ctx.measureText(scoreString).width)/2,canvas.height/6+5);
    scoreString = p2Score.toString();
    ctx.strokeText(scoreString, (3*canvas.width/2 - ctx.measureText(scoreString).width)/2,canvas.height/6+5);
    
    ctx.font = "bold 36px Arial";
    playerString = "Player 1";
    ctx.strokeText(playerString,(canvas.width/2 - ctx.measureText(playerString).width)/2,ctx.measureText(playerString).actualBoundingBoxAscent+5);
    playerString = "Player 2";
    ctx.strokeText(playerString, (3*canvas.width/2 - ctx.measureText(playerString).width)/2,ctx.measureText(playerString).actualBoundingBoxAscent+5)
}

function drawRallyOverMenu(){
    
}

function drawStartMenu(){
    //Welcome Text
    text = "Welcome to Pong"
    ctx.fillStyle = "#FFFFFF"
    ctx.font  = "45px Arial bold";
    ctx.fillText(text,(canvas.width - ctx.measureText(text).width)/2,canvas.height/2);

    //Player Buttons
    let rectWidth = canvas.width/3.95;
    let rectHeight = canvas.height /12;
    ctx.strokeStyle = '#FFFFFF';
    ctx.font  = "25px Arial bold";


    //single player
    rectX = (canvas.width/2 - rectWidth) /2;
    rectY = (canvas.height/2 + canvas.height /12);
    ctx.rect(rectX, rectY,rectWidth,rectHeight);
    ctx.stroke();

    text = "One Player";
    ctx.fillText(text,(canvas.width/2 - ctx.measureText(text).width)/2,rectY + (rectHeight + ctx.measureText(text).actualBoundingBoxAscent)/2)

    //single player rally
    rectX = (canvas.width/2 - rectWidth) /2;
    rectY = (canvas.height/2 + canvas.height /5);
    ctx.rect(rectX, rectY,rectWidth,rectHeight);
    ctx.stroke();

    text = "One Player Rally";
    ctx.fillText(text,(canvas.width/2- ctx.measureText(text).width)/2,rectY + (rectHeight + ctx.measureText(text).actualBoundingBoxAscent)/2);

    //two player
    
    rectX = (3*canvas.width/2 - rectWidth) /2;
    rectY = (canvas.height/2 + canvas.height /12);
    ctx.rect(rectX, rectY,rectWidth,rectHeight);
    ctx.stroke();

    text = "Two Player";
    ctx.fillText(text,(canvas.width/2 + ctx.measureText(text).width),rectY + (rectHeight + ctx.measureText(text).actualBoundingBoxAscent)/2);

    //two player rally
    rectX = (3*canvas.width/2 - rectWidth) /2;
    rectY = (canvas.height/2 + canvas.height /5);
    ctx.rect(rectX, rectY,rectWidth,rectHeight);
    ctx.stroke();

    text = "Two Player Rally";
    ctx.fillText(text,(canvas.width + ctx.measureText(text).width)/2,rectY + (rectHeight + ctx.measureText(text).actualBoundingBoxAscent)/2);
}

function drawRallyScores(){
    
}

//Collision Detection
function collisionDetection(){
    //Top and bottom collision detection
    if(y+dy + ballRadius >= canvas.height || y+dy <= ballRadius){
        dy = -dy;
    }

    //left side collision
    if(x - ballRadius +dx <= 0){
        p2Score += 1;
        resetGame();
        if(gamestate == "singlePlayer"){
            gamestate = "waitingForInputSinglePlayer";
        }else if(gamestate == "twoPlayer"){
            gamestate = "waitingForInputTwoPlayer";
        }
    }
    //rightside collision
    if(x+ballRadius +dx >= canvas.width){
        p1Score += 1;
        resetGame();
        if(gamestate == "singlePlayer"){
            gamestate = "waitingForInputSinglePlayer";
        }else if(gamestate == "twoPlayer"){
            gamestate = "waitingForInputTwoPlayer";
        }
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

function rallyCollisionDetection(){
    //Top and bottom collision detection
    if(y+dy + ballRadius >= canvas.height || y+dy <= ballRadius){
        dy = -dy;
    }

    //left + right side collision
    if(x - ballRadius +dx <= 0 || x+ballRadius +dx >= canvas.width){
        gamestate = "rallyGameOver"

    }


    //Paddle 1 Collision detection
    if((paddle1Y <= y && paddle1Y + paddleHeight >= y) && (x-ballRadius <= paddle1X + paddleWidth)){
        dx = -dx;

        if(dx <0){
            dx -= .1;
        }else{
            dx += .1;
        }
        rallyScore += 1;
}

    //Paddle 2 Collision detection
    if((paddle2Y <= y && paddle2Y + paddleHeight >= y) && (paddle2X <= x+ballRadius)){
        dx = -dx;

        if(dx <0){
            dx -= .1;
        }else{
            dx += .1;
        }
        rallyScore += 1;
    }
}

//GamePlay
function playSinglePlayer(){
    drawBall();
    drawP1Paddle();
    drawP2Paddle();
    drawScores();

    if(gamestate == "singlePlayer"){
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
        checkScores();
    } else {
        ctx.beginPath();
        ctx.font = "bold 32px Arial";
        ctx.lineWidth = 1; 
        text = "Press any key to play/resume";
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeText(text,(canvas.width - ctx.measureText(text).width)/2, canvas.height - 2*ctx.measureText(text).actualBoundingBoxAscent);
        ctx.closePath();
    }
}

function playTwoPlayer(){
    drawBall();
    drawP1Paddle();
    drawP2Paddle();
    drawScores();

    if(gamestate == "twoPlayer"){

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

        checkScores();
    } else {
        ctx.font = "bold 32px Arial";
        ctx.lineWidth = 1; 
        text = "Press any key to play/resume";
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeText(text,(canvas.width - ctx.measureText(text).width)/2, canvas.height - 2*ctx.measureText(text).actualBoundingBoxAscent);
    }
}

function playSinglePlayerRally(){
    drawBall();
    drawP1Paddle();
    drawP2Paddle();
    drawRallyScores();

    if(gamestate == "singlePlayerRally"){
        rallyCollisionDetection();

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
    } else if(gamestate == "rallyGameOver"){
        drawRallyOverMenu();
    }else {
        ctx.beginPath();
        ctx.font = "bold 32px Arial";
        ctx.lineWidth = 1; 
        text = "Press any key to play/resume";
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeText(text,(canvas.width - ctx.measureText(text).width)/2, canvas.height - 2*ctx.measureText(text).actualBoundingBoxAscent);
        ctx.closePath();
    }
}

function playTwoPlayerRally(){

}


//main function
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(gamestate == "startMenu"){
        drawStartMenu();
    }else if(gamestate == "singlePlayer" || gamestate == "waitingForInputSinglePlayer"){
        playSinglePlayer();
    }else if(gamestate== "twoPlayer" || gamestate == "waitingForInputTwoPlayer"){
        playTwoPlayer();
    }else if(gamestate =="singlePlayerRally"||gamestate == "waitingForInputSinglePlayerRally") {
        playSinglePlayerRally();
    }else if(gamestate =="twoPlayerRally"||gamestate == "waitingForInputTwoPlayerRally"){
        playTwoPlayerRally();
    }
    
    requestAnimationFrame(draw);
}

draw();