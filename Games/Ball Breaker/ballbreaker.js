//canvas elements
var canvas = document.getElementById("ballBreakerCanvas");
var ctx = canvas.getContext("2d");

//ball elements
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;
//paddle elements
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//event handlers
var rightPressed = false;
var leftPressed = false;

//Brick elemnts
var brickRowCount = 8;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 15;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//Game Varibles
var score = 0;
var lives = 3;
var gamestate = "startMenu"


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click",mouseClicked,false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }else if(e.key =="Enter" && gamestate=="startMenu"){
      gamestate = "playGame"
    }else if(e.key=="Enter" && gamestate=="paused"){
      gamestate="playGame"
    }else if(e.key=="Escape" && gamestate=="playGame"){
      gamestate = "paused"
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
  var rect = canvas.getBoundingClientRect();
  var relativeX = e.clientX - rect.left;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
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

    //Single Player
    if((mousePos.x >= rectX && mousePos.x <= rectX + rectWidth)&& (mousePos.y >= rectY && mousePos.y <= rectY+rectHeight)){
        gamestate = "playGame";
    }
  } else if(gamestate == "paused"){
    if((mousePos.x>= (canvas.width/3) && mousePos.x <= (canvas.width-canvas.width/4)) && (mousePos.y >=(canvas.height/3) && mousePos.y <= (canvas.height-canvas.height/3))){
      gamestate = "playGame"
    }
  }

  
}
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}
function changeBallSpeed(){
  changeBy = .1
  if(dy<1){
    dy -= changeBy;
  } else {
    dy += changeBy;
  }
  if(dx<1){
    dx -= changeBy;
  } else {
    dx += changeBy;
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function playGame(){
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      changeBallSpeed();
      
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}
function drawTitle(){
  titleMessage = "Welcome to Brick Breaker"
  ctx.fillStyle = "#FFFFFF";
  ctx.font  = "45px Arial bold";
  ctx.fillText(titleMessage,(canvas.width - ctx.measureText(titleMessage).width)/2,canvas.height/2);

}
function drawStartButton(){
  //Player Buttons
  let rectWidth = canvas.width/4;
  let rectHeight = canvas.height /12;
  let rectX = (canvas.width - rectWidth) /2;
  let rectY = (canvas.height/2 + canvas.height /12);
  ctx.strokeStyle = '#FFFFFF'
  ctx.font  = "25px Arial bold";

  ctx.rect(rectX, rectY,rectWidth,rectHeight);
  ctx.stroke();

  text = "Start";
  ctx.fillText(text,(canvas.width - ctx.measureText(text).width)/2,rectY + (rectHeight + ctx.measureText(text).actualBoundingBoxAscent)/2)

}
function startMenu(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTitle();
  drawStartButton();
}
function drawResumeButton(){
  ctx.strokeStyle = 'white';
  ctx.moveTo(canvas.width/3, canvas.height/3);
  ctx.lineTo(canvas.width/3, canvas.height-canvas.height/3);
  ctx.lineTo(canvas.width-canvas.width/4, canvas.height/2);
  ctx.lineTo(canvas.width/3, canvas.height/3);
  ctx.fillStyle = 'white';
  ctx.fill();
}
function pauseMenu(){
  drawResumeButton();
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(gamestate == "playGame"){
    playGame();
  }else if(gamestate == "startMenu"){
    startMenu();
  }else if(gamestate == "paused"){
    pauseMenu();
  }
  requestAnimationFrame(draw);
}

draw();