var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = -1;

//Adds a new color to the gamepattern every time the new level starts. Adds animation and sounds.
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log($("#"+randomChosenColor));
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  var randomChosenColorSound = randomChosenColor + "mp3";
  playSound(randomChosenColorSound);
  level++;
  $("h1").text("Level: " + level);
  return gamePattern;
}

//Updates userclickpattern. Animation and sound for button clicks.
$(".btn").click(function(event){
  var userChosenColor = this.id
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  var userChosenColorSound = userChosenColor + "mp3";
  playSound(userChosenColorSound);
  animatePress(userChosenColor);
});

//Logic for users button clicks (save )
$(".btn").click(function checkAnswer(currentlevel){

  var countUsersAnswers = userClickedPattern.length
  var lastAnswerNr = countUsersAnswers - 1;
  console.log(lastAnswerNr);
  var lastAnswer = userClickedPattern[lastAnswerNr];
  console.log(lastAnswer);
  var gamePatternLastAnswerCompare = gamePattern[lastAnswerNr];
  console.log(gamePatternLastAnswerCompare);

  if (gamePatternLastAnswerCompare === lastAnswer){
    console.log("Correct")
    if (gamePattern.length === userClickedPattern.length){
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    } else{
      console.log("Choose next sequence");
    }

  } else{
    console.log("Wrong")
    playSound("wrongmp3");
    gameOverStyle();
    $("h1").text("Game over. Press any key to restart");
    gamePattern = [];
    userClickedPattern = [];
    level = -1;
  }
});



function playSound(name) {
    $('audio#' + name)[0].play()
};

function animatePress(currentColor){
  $("." + currentColor).addClass("pressed").delay(100).queue(function(next){
    $("." + currentColor).removeClass("pressed");
    next();
})};

function gameOverStyle(){
  $("body").addClass("game-over").delay(200).queue(function(next){
    $("body").removeClass("game-over");
    next();
})};


$(document).keyup(function(){
if (level === -1){
  nextSequence();
}
});
