//canvas elements
var canvas = document.getElementById("ballBreakerCanvas");
var ctx = canvas.getContext("2d");

//ball elements
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
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

//menu screen variables
let startBoxWidth = canvas.width / 4;
let startBoxHeight = canvas.height / 6;
let startBoxX = (canvas.width/2) - (startBoxWidth/2)
let startBoxY = (canvas.height / 2) + (startBoxHeight / 2)


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
  console.log(mousePos)

  if(gamestate == "startMenu"){
    if((mousePos.x >= startBoxX && mousePos.x <= (startBoxX + startBoxWidth)) && (mousePos.y>=startBoxY && mousePos.y <=(startBoxY+startBoxHeight))){
      gamestate = "playGame"
    }
  } else if(gamestate == "paused"){
    if((mousePos.x>= canvas.width/3 && mousePos.y <= canvas.width-canvas.width/4) && (mousePos.y >=canvas.height/3 && mousePos.y <= canvas.width-canvas.height/3)){
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
  ctx.font  = "17px Arial";
  xposition = (canvas.width/2) - (ctx.measureText(titleMessage).width/2);
  yposition = (canvas.height/2) - (ctx.measureText(titleMessage).actualBoundingBoxAscent/2);
  ctx.fillText(titleMessage,xposition,canvas.height/2);
  ctx.closePath();
}
function drawStartButton(){
  ctx.rect(startBoxX,startBoxY,startBoxWidth,startBoxHeight)
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  //Start Phrase
  text = "Start"
  ctx.font = "12px Arial"
  ctx.fillStyle = "#000000"
  xStartText = startBoxX + (startBoxWidth/2 - (ctx.measureText(text).width/2));
  yStartText = startBoxY + ((startBoxHeight / 2) + (ctx.measureText(text).actualBoundingBoxAscent/2));
  ctx.fillText(text,xStartText,yStartText)

  ctx.closePath()
}
function startMenu(){
  drawTitle();
  drawStartButton();
}
function pauseMenu(){
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(canvas.width/3, canvas.height/3);
  ctx.lineTo(canvas.width/3, canvas.height-canvas.height/3);
  ctx.lineTo(canvas.width-canvas.width/4, canvas.height/2);
  ctx.lineTo(canvas.width/3, canvas.height/3);
  ctx.fillStyle = 'white';
  ctx.fill();
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