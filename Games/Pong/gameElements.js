function findTextSize(text, fontface, maxWidth, maxHeight){
    let fontsize = 300;

    if(maxHeight == -1){
        maxHeight = 9000000000000000;
    }
    ctx.font = fontsize+"px " + fontface;
    let textWidth = ctx.measureText(text).width;
    let textHeight = ctx.measureText(text).actualBoundingBoxAscent;
    while(ctx.measureText(text).width>= maxWidth - canvas.width /25 || ctx.measureText(text).actualBoundingBoxAscent >= maxHeight){
        fontsize--;
        ctx.font = fontsize+"px " + fontface;
        textWidth = ctx.measureText(text).width;
        textHeight = ctx.measureText(text).actualBoundingBoxAscent;
    }
    return fontsize+"px " + fontface;
}

//Ball
let x = canvas.width / 2;
let y = canvas.height / 2;
let ballRadius = canvas.width/96;

//Paddles
let paddleHeight = canvas.height/9.6;
let paddleWidth = canvas.width/96;
let paddle1X = 0;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2X = canvas.width - paddleWidth;
let paddle2Y = (canvas.height - paddleHeight) / 2;

//Start Menu
    //Title
let titleText = "Welcome to Pong";
let titleFillStyle = "#FFFFFF";
let titleFont = findTextSize(titleText,"bold Arial",canvas.width/1.5, -1);
let titleTextX = (canvas.width - ctx.measureText(titleText).width) / 2;
let titleTextY = canvas.height / 4;

    //GameMode Buttons
let gameButtonWidth = canvas.width / 3.95;
let gameButtonHeight = canvas.height / 12;
let gameButtonStrokeStyle = "#FFFFFF";

        //Single Player
let gameButtonSinglePlayerX = (canvas.width / 2 - gameButtonWidth) / 2;
let gameButtonSinglePlayerY = (canvas.height / 2 + canvas.height / 12);
let gameButtonSinglePlayerText = "One Player";
let gameButtonSinglePlayerTextFont = findTextSize(gameButtonSinglePlayerText,"Arial bold",gameButtonWidth,gameButtonHeight);
let gameButtonSinglePlayerTextX = (canvas.width / 2 - ctx.measureText(gameButtonSinglePlayerText).width) / 2;
let gameButtonSinglePlayerTextY = gameButtonSinglePlayerY + (gameButtonHeight + ctx.measureText(gameButtonSinglePlayerText).actualBoundingBoxAscent) / 2;

        //Single Player Rally
let gameButtonSinglePlayerRallyX = (canvas.width / 2 - gameButtonWidth) / 2;
let gameButtonSinglePlayerRallyY = (canvas.height / 2 + canvas.height / 5);
let gameButtonSinglePlayerRallyText = "One Player Rally";
let gameButtonSinglePlayerRallyTextFont = findTextSize(gameButtonSinglePlayerRallyText,"Arial bold",gameButtonWidth,gameButtonHeight);
let gameButtonSinglePlayerRallyTextX = (canvas.width / 2 - ctx.measureText(gameButtonSinglePlayerRallyText).width) / 2;
let gameButtonSinglePlayerRallyTextY = gameButtonSinglePlayerRallyY + (gameButtonHeight + ctx.measureText(gameButtonSinglePlayerRallyText).actualBoundingBoxAscent) / 2;
       
        //Two Player
let gameButtonTwoPlayerX = (3 * canvas.width / 2 - gameButtonWidth) / 2;
let gameButtonTwoPlayerY = (canvas.height / 2 + canvas.height / 12);
let gameButtonTwoPlayerText = "Two Player";
let gameButtonTwoPlayerTextFont = findTextSize(gameButtonTwoPlayerText,"Arial bold",gameButtonWidth,gameButtonHeight);
let gameButtonTwoPlayerTextX = (3 * canvas.width / 2 - ctx.measureText(gameButtonTwoPlayerText).width) / 2;
let gameButtonTwoPlayerTextY = gameButtonTwoPlayerY + (gameButtonHeight + ctx.measureText(gameButtonTwoPlayerText).actualBoundingBoxAscent) / 2;

        //Two Player Rally
let gameButtonTwoPlayerRallyX = (3 * canvas.width / 2 - gameButtonWidth) / 2;
let gameButtonTwoPlayerRallyY = (canvas.height / 2 + canvas.height / 5);
let gameButtonTwoPlayerRallyText = "Two Player Rally";
let gameButtonTwoPlayerRallyTextFont = findTextSize(gameButtonTwoPlayerRallyText,"Arial bold",gameButtonWidth,gameButtonHeight);
let gameButtonTwoPlayerRallyTextX = (3 * canvas.width / 2 - ctx.measureText(gameButtonTwoPlayerRallyText).width) / 2;
let gameButtonTwoPlayerRallyTextY = gameButtonTwoPlayerRallyY + (gameButtonHeight + ctx.measureText(gameButtonTwoPlayerRallyText).actualBoundingBoxAscent) / 2;

//Rally Over Menu
let rallyOverButtonWidth = canvas.width / 3.25;
let rallyOverButtonHeight = canvas.height / 12;
let rallyOverAddHighScoreX = (canvas.width - rallyOverButtonWidth) / 2;
let rallyOverAddHighScoreY = (canvas.height - rallyOverButtonHeight) / 2;
let rallyOverAddHighScoreText = "Add High Score";
let rallyOverAddHighScoreTextFont = findTextSize(rallyOverAddHighScoreText,"Arial bold",rallyOverAddHighScoreX,rallyOverAddHighScoreY);
let rallyOverAddHighScoreTextX = (canvas.width - ctx.measureText(rallyOverAddHighScoreText).width) / 2
let rallyOverAddHighScoreTextY = rallyOverAddHighScoreY + (rallyOverButtonHeight + ctx.measureText(rallyOverAddHighScoreText).actualBoundingBoxAscent) / 2;

let rallyOverBackToMainX = (canvas.width - rallyOverButtonWidth) / 2;
let rallyOverBackToMainY = canvas.height - (canvas.height - rallyOverButtonHeight) / 4;
let rallyOverBackToMainText = "Back to Main Menu";
let rallyOverBackToMainFont = findTextSize(rallyOverBackToMainText,"Arial bold",rallyOverBackToMainX,rallyOverBackToMainY);
let rallyOverBackToMainTextX = (canvas.width - ctx.measureText(rallyOverBackToMainText).width) / 2;
let rallyOverBackToMainTextY = rallyOverBackToMainY + (rallyOverButtonHeight + ctx.measureText(rallyOverBackToMainText).actualBoundingBoxAscent) / 2;

//Single Player Key to resume
let pressKeyToResumeText = "Press any key to play/resume";
let pressKeyToResumeTextFont = findTextSize(pressKeyToResumeText,"bold Arial",3*canvas.width/4,canvas.width/6);
let pressKeyToResumeTextX = (canvas.width - ctx.measureText(pressKeyToResumeText).width) / 2;
let pressKeyToResumeTextY = canvas.height - 2 * ctx.measureText(pressKeyToResumeText).actualBoundingBoxAscent;