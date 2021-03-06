var gameStarted = false;
var gameInProgress = false;

var buttons = { green: 0, red: 1, yellow: 2, blue: 3 };
var generatedNumbers = [];
var userClickedNumbers = [];
var userGameLevelCounter = 0;

$(".btn").click(buttonClicked);
$(document).keyup(handleGameStatus);

function generateNum() {
  if (gameStarted) {
    var generatedNum = Math.floor(Math.random() * 4);      // returns a random integer from 0 to 3
    console.log("Generated num " + generatedNum);
    flashButton(generatedNum);
    generatedNumbers.push(generatedNum);
  }
}

function flashButton(buttonId) {
  switch (buttonId) {
    case buttons.green:
      animateButton("green");
      playSound("green");
      break;
    case buttons.red:
      animateButton("red");
      playSound("red");
      break;
    case buttons.yellow:
      animateButton("yellow");
      playSound("yellow");
      break;
    case buttons.blue:
      animateButton("blue");
      playSound("blue");
      break;
  }
}

function animateButton(className) {
  $("." + className).fadeOut(100).fadeIn(100);
}

function playSound(sourceFileName) {
  var audio = new Audio("sounds/" + sourceFileName + ".mp3");
  audio.play();
}

function handleGameStatus() {
  if (!gameStarted) {
    gameStarted = true;
    updateLevel();
  }
}

function restartGame() {
  gameStarted = false;
  gameInProgress = false;
  $("#level-title").text("Game Over! Press Any key to start");
  userClickedNumbers = [];
  generatedNumbers = [];
}

function updateLevel() {
  generateNum();
  userClickedNumbers = [];
  userGameLevelCounter = 0;
  $("#level-title").text("Level " + generatedNumbers.length);
}

function handleButtonClick(buttonId) {
  userClickedNumbers.push(buttonId);
  console.log("gen num : " + generatedNumbers[userGameLevelCounter] + "user click : " + userClickedNumbers[userGameLevelCounter]);
  if (generatedNumbers[userGameLevelCounter] === userClickedNumbers[userGameLevelCounter]) {
    if(userGameLevelCounter === generatedNumbers.length - 1) {
      updateLevel();
    } else {
      userGameLevelCounter += 1;
    }
  } else {
    restartGame();
  }
}

function buttonClicked(event) {
  switch (event.target.id) {
    case "green":
      handleButtonClick(buttons.green);
      break;
    case "red":
      handleButtonClick(buttons.red);
      break;
    case "yellow":
      handleButtonClick(buttons.yellow);
      break;
    case "blue":
      handleButtonClick(buttons.blue);
      break;
  }
}
