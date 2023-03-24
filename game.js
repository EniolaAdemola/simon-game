let gamePattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let userClickPattern = [];

let started = false;
let level = 0

// for Mobile 
$(document).click(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequencs();
        started = true;
    }
});

$(".btn").click(function(){

    let userChosenColor = $(this).attr("id")

    userClickPattern.push(userChosenColor);

   playSound(userChosenColor);
   animatePress(userChosenColor);

   checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
        // console.log("success");
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequencs();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 500);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequencs(){

    userClickPattern = [];

    level++;
    $("#level-title").text("level " + level);
    
    // Select random numbers from 0-3 and store it in a variable
    let randomNumber = Math.floor(Math.random() * 4);
    
    // Sele the colors using the index of the randomNumber
    let randomChosenColors = buttonColors[randomNumber];

    gamePattern.push(randomChosenColors);

    // Animating flash to the button selected
    $("#"+randomChosenColors).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColors);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}