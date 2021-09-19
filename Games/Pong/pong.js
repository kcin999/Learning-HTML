//Event listeners
function keyDownHandler(e) {
    if (gamestate != "waitingForInputSinglePlayer" && gamestate != "waitingForInputTwoPlayer" && gamestate != "waitingForInputSinglePlayerRally" && gamestate != "waitingForInputTwoPlayerRally") {
        if (e.key == "Up" || e.key == "ArrowUp") {
            upPressed = true;
        } else if (e.key == "Down" || e.key == "ArrowDown") {
            downPressed = true;
        } else if (e.key == "W" || e.key == "w") {
            wPressed = true;
        } else if (e.key == "S" || e.key == "s") {
            sPressed = true;
        }
    } else {
        if (gamestate == "waitingForInputSinglePlayer") {
            gamestate = "singlePlayer";
        } else if (gamestate == "waitingForInputTwoPlayer") {
            gamestate = "twoPlayer";
        } else if (gamestate == "waitingForInputSinglePlayerRally") {
            gamestate = "singlePlayerRally"
        } else if (gamestate == "waitingForInputTwoPlayerRally") {
            gamestate = "twoPlayerRally"
        }
    }
}
function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    } else if (e.key == "W" || e.key == "w") {
        wPressed = false;
    } else if (e.key == "S" || e.key == "s") {
        sPressed = false;
    }
}
function getMousePosition(e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}
function mouseClicked(e) {
    let mousePos = getMousePosition(e);

    if (gamestate == "startMenu") {
        if ((mousePos.x >= gameButtonSinglePlayerX && mousePos.x <= gameButtonSinglePlayerX + gameButtonWidth) && (mousePos.y >= gameButtonSinglePlayerY && mousePos.y <= gameButtonSinglePlayerY + gameButtonHeight)) {
            gamestate = "waitingForInputSinglePlayer"
        } else if ((mousePos.x >= gameButtonSinglePlayerRallyX && mousePos.x <= gameButtonSinglePlayerRallyX + gameButtonWidth) && (mousePos.y >= gameButtonSinglePlayerRallyY && mousePos.y <= gameButtonSinglePlayerRallyY + gameButtonHeight)) {
            gamestate = "waitingForInputSinglePlayerRally";
        } else if ((mousePos.x >= gameButtonTwoPlayerX && mousePos.x <= gameButtonTwoPlayerX + gameButtonWidth) && (mousePos.y >= gameButtonTwoPlayerY && mousePos.y <= gameButtonTwoPlayerY + gameButtonHeight)) {
            gamestate = "waitingForInputTwoPlayer";
        } else if ((mousePos.x >= gameButtonTwoPlayerRallyX && mousePos.x <= gameButtonTwoPlayerRallyX + gameButtonWidth) && (mousePos.y >= gameButtonTwoPlayerRallyY && mousePos.y <= gameButtonTwoPlayerRallyY + gameButtonHeight)) {
            gamestate = "waitingForInputTwoPlayerRally";
        }
    } else if (gamestate == "rallyGameOver") {
        let rectWidth = canvas.width / 3.25;
        let rectHeight = canvas.height / 12;
        leftRectX = (canvas.width - rectWidth) / 2;
        topRectY = canvas.height - (canvas.height - rectHeight) / 4;
        if ((mousePos.x >= leftRectX && mousePos.x <= leftRectX + rectWidth) && (mousePos.y >= topRectY && mousePos.y <= topRectY + rectHeight)) {
            resetGame();
            gamestate = "startMenu";
        }

        topRectY = (canvas.height - rectHeight) / 2;
        if ((mousePos.x >= leftRectX && mousePos.x <= leftRectX + rectWidth) && (mousePos.y >= topRectY && mousePos.y <= topRectY + rectHeight)) {
            addHighScore();
        }
    }


}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click", mouseClicked, false);

//Game Functions
function resetGame() {
    dx = canvas.width/320;
    dy = canvas.width/320;
    x = canvas.width / 2;
    y = canvas.height / 2;
    paddle1Y = (canvas.height - paddleHeight) / 2;
    paddle2Y = (canvas.height - paddleHeight) / 2;
    rallyScore = 0;
    randomSayingIndex = -1
}

function checkScores() {
    if (p1Score >= 10 && p1Score - p2Score >= 2) {
        alert("Player 1 has won");
    } else if (p2Score >= 10 && p2Score - p1Score >= 2) {
        alert("Player 2 has won");
    }
}

function addHighScore() {
    playerName = prompt("Insert Player Name\n10 Characters or less", "Player Name").trim();
    while (playerName.length > 10) {
        playerName = prompt("Please Try Again\nInsert Player Name\n10 Characters or less", "Player Name").trim();
    }
    console.log(playerName)
    data = {
        PlayerName: playerName,
        Score: rallyScore,
        GameMode: "OnePlayer"
    }
    $.post("insertScore.php", data, gamestate = "startMenu");
}

//Draw Functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawP1Paddle() {
    ctx.beginPath();
    ctx.rect(paddle1X, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawP2Paddle() {
    ctx.beginPath();
    ctx.rect(paddle2X, paddle2Y, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function drawScores() {
    ctx.beginPath();
    //Draw Dividing Line
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.closePath();

    scoreString = p1Score.toString();
    ctx.font = findTextSize(scoreString,"bold Arial",canvas.width/7,canvas.height/6);
    ctx.strokeText(scoreString, (canvas.width / 2 - ctx.measureText(scoreString).width) / 2, canvas.height / 3.5);
    scoreString = p2Score.toString();
    ctx.font = findTextSize(scoreString,"bold Arial",canvas.width/7,canvas.height/6);
    ctx.strokeText(scoreString, (3 * canvas.width / 2 - ctx.measureText(scoreString).width) / 2, canvas.height / 3.5);

    playerString = "Player 1";
    ctx.font = findTextSize(playerString,"bold Arial",canvas.width/4,canvas.height/6);
    ctx.strokeText(playerString, (canvas.width / 2 - ctx.measureText(playerString).width) / 2, ctx.measureText(playerString).actualBoundingBoxAscent + 5);
    playerString = "Player 2";
    ctx.font = findTextSize(playerString,"bold Arial",canvas.width/4,canvas.height/6);
    ctx.strokeText(playerString, (3 * canvas.width / 2 - ctx.measureText(playerString).width) / 2, ctx.measureText(playerString).actualBoundingBoxAscent + 5);
    ctx.closePath();
}

function drawRallyScores() {
    ctx.beginPath();
    scoreString = rallyScore.toString();
    ctx.font = findTextSize(scoreString,"bold Arial",canvas.width /10,-1);
    ctx.strokeText(scoreString, (canvas.width - ctx.measureText(scoreString).width) / 2, canvas.height / 6 + 5 + canvas.width/20);

    playerString = "Rally";
    ctx.font = findTextSize(playerString,"bold Arial",canvas.width /6,-1);
    ctx.strokeText(playerString, (canvas.width - ctx.measureText(playerString).width) / 2, ctx.measureText(playerString).actualBoundingBoxAscent +5);
    ctx.closePath();
}

function drawRallyOverMenu() {
    if (randomSayingIndex == -1) {
        randomSayingIndex = Math.floor(Math.random() * randomSayings.length)
    }
    ctx.beginPath();
    text = "You rallied for a total of " + rallyScore.toString() + ". " + randomSayings[randomSayingIndex];
    ctx.font = findTextSize(text,"bold Arial",canvas.width/1.5,-1);
    ctx.fillText(text, (canvas.width - ctx.measureText(text).width) / 2, canvas.height / 4);
    ctx.closePath();

    //Add Player Name
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.rect(rallyOverAddHighScoreX, rallyOverAddHighScoreY, rallyOverButtonWidth, rallyOverButtonHeight);
    ctx.stroke();
    
    ctx.font = rallyOverAddHighScoreTextFont;
    ctx.fillText(rallyOverAddHighScoreText, rallyOverAddHighScoreTextX, rallyOverAddHighScoreTextY);
    ctx.closePath();

    //Back to Main Menu
    ctx.beginPath();
    ctx.rect(rallyOverBackToMainX, rallyOverBackToMainY, rallyOverButtonWidth, rallyOverButtonHeight);
    ctx.stroke();

    ctx.font = rallyOverBackToMainFont;
    ctx.fillText(rallyOverBackToMainText, rallyOverBackToMainTextX,rallyOverBackToMainTextY);
    ctx.closePath();
}

function drawStartMenu() {
    //Welcome Text
    ctx.beginPath();
    text = titleText;
    ctx.fillStyle = titleFillStyle;
    ctx.font = titleFont;
    ctx.fillText(titleText,titleTextX, titleTextY);

    //Player Buttons
    ctx.strokeStyle = gameButtonStrokeStyle;
    
    //single player
    ctx.rect(gameButtonSinglePlayerX, gameButtonSinglePlayerY, gameButtonWidth,gameButtonHeight);
    ctx.stroke();
    
    ctx.font = gameButtonSinglePlayerTextFont;
    ctx.fillText(gameButtonSinglePlayerText, gameButtonSinglePlayerTextX, gameButtonSinglePlayerTextY)
    
    //single player rally
    ctx.rect(gameButtonSinglePlayerRallyX, gameButtonSinglePlayerRallyY, gameButtonWidth,gameButtonHeight);
    ctx.stroke();

    ctx.font = gameButtonSinglePlayerRallyTextFont
    ctx.fillText(gameButtonSinglePlayerRallyText,gameButtonSinglePlayerRallyTextX,gameButtonSinglePlayerRallyTextY);
    
    //two player
    ctx.rect(gameButtonTwoPlayerX, gameButtonTwoPlayerY, gameButtonWidth,gameButtonHeight);
    ctx.stroke();
    
    ctx.font = gameButtonTwoPlayerTextFont;
    ctx.fillText(gameButtonTwoPlayerText, gameButtonTwoPlayerTextX, gameButtonTwoPlayerTextY)
    
    //two player rally
    ctx.rect(gameButtonTwoPlayerRallyX, gameButtonTwoPlayerRallyY, gameButtonWidth,gameButtonHeight);
    ctx.stroke();

    ctx.font = gameButtonTwoPlayerRallyTextFont
    ctx.fillText(gameButtonTwoPlayerRallyText,gameButtonTwoPlayerRallyTextX,gameButtonTwoPlayerRallyTextY);

    ctx.closePath();

}

function drawGamestateNotFound() {
    ctx.beginPath();
    text = "Could not find gamestate '" + gamestate + "'";
    ctx.font = findTextSize(text,"bold Arial",canvas.width/2,-1);
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(text, (canvas.width - ctx.measureText(text).width) / 2, (canvas.height - ctx.measureText(text).actualBoundingBoxAscent) / 2);
    ctx.strokeStyle = "red";
    ctx.strokeText(text, (canvas.width - ctx.measureText(text).width) / 2, (canvas.height - ctx.measureText(text).actualBoundingBoxAscent) / 2);
    ctx.closePath();
}

//Collision Detection
function collisionDetection() {
    //Top and bottom collision detection
    if (y + dy + ballRadius >= canvas.height || y + dy <= ballRadius) {
        dy = -dy;
    }

    //left side collision
    if (x - ballRadius + dx <= 0) {
        p2Score += 1;
        resetGame();
        if (gamestate == "singlePlayer") {
            gamestate = "waitingForInputSinglePlayer";
        } else if (gamestate == "twoPlayer") {
            gamestate = "waitingForInputTwoPlayer";
        }
    }
    //rightside collision
    if (x + ballRadius + dx >= canvas.width) {
        p1Score += 1;
        resetGame();
        if (gamestate == "singlePlayer") {
            gamestate = "waitingForInputSinglePlayer";
        } else if (gamestate == "twoPlayer") {
            gamestate = "waitingForInputTwoPlayer";
        }
    }

    //Paddle 1 Collision detection
    if ((paddle1Y <= y && paddle1Y + paddleHeight >= y) && (x - ballRadius <= paddle1X + paddleWidth)) {
        dx = -dx;

        if (dx < 0) {
            dx -= .1;
        } else {
            dx += .1;
        }
    }

    //Paddle 2 Collision detection
    if ((paddle2Y <= y && paddle2Y + paddleHeight >= y) && (paddle2X <= x + ballRadius)) {
        dx = -dx;

        if (dx < 0) {
            dx -= .1;
        } else {
            dx += .1;
        }
    }
}

function rallyCollisionDetection() {
    //Top and bottom collision detection
    if (y + dy + ballRadius >= canvas.height || y + dy <= ballRadius) {
        dy = -dy;
    }

    //left + right side collision
    if (x - ballRadius + dx <= 0 || x + ballRadius + dx >= canvas.width) {
        gamestate = "rallyGameOver"

    }


    //Paddle 1 Collision detection
    if ((paddle1Y <= y && paddle1Y + paddleHeight >= y) && (x - ballRadius <= paddle1X + paddleWidth)) {
        dx = -dx;

        if (dx < 0) {
            dx -= .1;
        } else {
            dx += .1;
        }
        rallyScore += 1;
    }

    //Paddle 2 Collision detection
    if ((paddle2Y <= y && paddle2Y + paddleHeight >= y) && (paddle2X <= x + ballRadius)) {
        dx = -dx;

        if (dx < 0) {
            dx -= .1;
        } else {
            dx += .1;
        }
        rallyScore += 1;
    }
}

//GamePlay
function playSinglePlayer() {
    drawBall();
    drawP1Paddle();
    drawP2Paddle();
    drawScores();

    if (gamestate == "singlePlayer") {
        collisionDetection();

        //Keyboard movement
        if ((upPressed || wPressed) && paddle1Y >= 0) {
            paddle1Y -= 7;
        } else if ((downPressed || sPressed) && paddle1Y + paddleHeight <= canvas.height) {
            paddle1Y += 7;
        }

        //paddle 2 automovement
        if (!(y >= paddle2Y && y <= paddle2Y + paddleHeight)) {
            if (paddle2Y >= y && paddle2Y >= 0) {
                paddle2Y -= 7;
            }
            if (paddle2Y + paddleHeight <= y && paddle2Y + paddleHeight <= canvas.height) {
                paddle2Y += 7;
            }
        }


        x += dx;
        y += dy;
        checkScores();
    } else {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.font = pressKeyToResumeTextFont;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeText(pressKeyToResumeText, pressKeyToResumeTextX,pressKeyToResumeTextY);
        ctx.closePath();
    }
}

function playTwoPlayer() {
    drawBall();
    drawP1Paddle();
    drawP2Paddle();
    drawScores();

    if (gamestate == "twoPlayer") {

        collisionDetection();

        //Keyboard movement
        if (wPressed && paddle1Y >= 0) {
            paddle1Y -= 7;
        } else if (sPressed && paddle1Y + paddleHeight <= canvas.height) {
            paddle1Y += 7;
        }

        if (upPressed && paddle2Y >= 0) {
            paddle2Y -= 7;
        } else if (downPressed && paddle2Y + paddleHeight <= canvas.height) {
            paddle2Y += 7;
        }

        x += dx;
        y += dy;

        checkScores();
    } else {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.font = pressKeyToResumeTextFont;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeText(pressKeyToResumeText, pressKeyToResumeTextX,pressKeyToResumeTextY);
        ctx.closePath();}
}

function playSinglePlayerRally() {
    drawBall();
    drawP1Paddle();
    drawP2Paddle();
    drawRallyScores();

    if (gamestate == "singlePlayerRally") {
        rallyCollisionDetection();

        //Keyboard movement
        if ((upPressed || wPressed) && paddle1Y >= 0) {
            paddle1Y -= 7;
        } else if ((downPressed || sPressed) && paddle1Y + paddleHeight <= canvas.height) {
            paddle1Y += 7;
        }

        //paddle 2 automovement
        if (!(y >= paddle2Y && y <= paddle2Y + paddleHeight)) {
            if (paddle2Y >= y && paddle2Y >= 0) {
                paddle2Y -= 7;
            }
            if (paddle2Y + paddleHeight <= y && paddle2Y + paddleHeight <= canvas.height) {
                paddle2Y += 7;
            }
        }


        x += dx;
        y += dy;
    } else {
        ctx.beginPath();
        ctx.lineWidth = 1;
        text = "Press any key to play/resume";
        ctx.strokeStyle = "#FFFFFF";
        ctx.font = findTextSize(text,"bold Arial",canvas.width/2,-1);
        ctx.strokeText(text, (canvas.width - ctx.measureText(text).width) / 2, canvas.height - 2 * ctx.measureText(text).actualBoundingBoxAscent);
        ctx.closePath();
    }
}

function playTwoPlayerRally() {

}

//main function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gamestate == "startMenu") {
        drawStartMenu();
    } else if (gamestate == "singlePlayer" || gamestate == "waitingForInputSinglePlayer") {
        playSinglePlayer();
    } else if (gamestate == "twoPlayer" || gamestate == "waitingForInputTwoPlayer") {
        playTwoPlayer();
    } else if (gamestate == "singlePlayerRally" || gamestate == "waitingForInputSinglePlayerRally") {
        playSinglePlayerRally();
    } else if (gamestate == "twoPlayerRally" || gamestate == "waitingForInputTwoPlayerRally") {
        playTwoPlayerRally();
    } else if (gamestate == "rallyGameOver") {
        drawRallyOverMenu();
    }else {
        drawGamestateNotFound();
    }

    requestAnimationFrame(draw);
}

draw();
