let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

const colors = ["red","yellow","green","purple"];

let h2 = document.querySelector("#level-title");
let h3 = document.querySelector("#highScore");
let startBtn = document.querySelector("#startBtn");

h3.innerText = `🏆 High Score: ${highScore}`;

startBtn.addEventListener("click", startGame);

function startGame(){
    if(!started){
        started = true;
        level = 0;
        gameSeq = [];
        nextLevel();
    }
}

function nextLevel(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rand = Math.floor(Math.random()*4);
    let color = colors[rand];

    gameSeq.push(color);

    let btn = document.querySelector(`#${color}`);

    flash(btn);
    playSound(color);
}

function flash(btn){
    btn.classList.add("flash");

    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(()=>{
        btn.classList.remove("userflash");
    },150);
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

document.querySelectorAll(".btn").forEach(btn=>{
    btn.addEventListener("click", function(){

        if(!started) return;

        let color = this.id;

        userSeq.push(color);

        userFlash(this);
        playSound(color);

        checkAnswer(userSeq.length-1);
    });
});

function checkAnswer(index){

    if(userSeq[index] === gameSeq[index]){

        if(userSeq.length === gameSeq.length){
            setTimeout(nextLevel,800);
        }

    }else{

        playSound("wrong");

        if(level-1 > highScore){
            highScore = level-1;
            localStorage.setItem("highScore", highScore);
            h3.innerText = `🏆 High Score: ${highScore}`;
        }

        showGameOver();
    }
}

function showGameOver(){

    Swal.fire({
        title:"Game Over 😢",
        text:`Your Score: ${level-1}`,
        icon:"error",
        confirmButtonText:"Play Again"
    });

    started = false;
}

if(highScore >= 20){
 h3.innerText = `🥇 High Score: ${highScore}`;
}
else if(highScore >= 10){
 h3.innerText = `🥈 High Score: ${highScore}`;
}
else{
 h3.innerText = `🥉 High Score: ${highScore}`;
}