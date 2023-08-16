var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var started=false;

var level=0;


$(document).keydown(function(){
    if(!started){
        $("#level-title").text("LEVEL "+ level);
        nextSequence();
        started=true;
    }
});





$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        //console.log("success");

        if(userClickedPattern.length===gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
       // console.log("Wrong");

        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any key to Restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}






// random number generation and selection from the array
function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);

 var randomNumber = Math.floor(Math.random()*4);

 var randomChosenColor = buttonColors[randomNumber];

 gamePattern.push(randomChosenColor);

 $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

 playSound(randomChosenColor);

}
// play sound function that plays the sound of the selected color
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor ).removeClass("pressed");
    }, 100);

}



function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
