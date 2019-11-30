// import Player from "./Player.js"

var canvas = document.getElementById("gameCanvas");
var canvasContext;
var showVictory = false;
// var player = new Player;
var playerX = canvas.width/2;
var playerY = canvas.height/2;
var startBtn = document.getElementById("startBtn");
function start(){
    startBtn.style.display = 'none';
    // canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    var frames = 60;
    setInterval(function () {
        draw();
    }, 1000/frames);
    canvas.addEventListener('click', handleMouseClick);
    document.onkeydown = function(evt) {
        if (event.key === 'd') {
            playerX += 5;
        }
        movePlayer(event.key)
    }
}

function handleKeyEvent(evt) {

}
function handleMouseClick() {
    if(showVictory) {
        showVictory = false;
    }
}



function draw() {
    // draws background
    drawRect(0, 0, canvas.width, canvas.height, 'lightblue');
    //Draw Player
    drawRect(playerX, playerY, 50, 50, 'white');
    canvasContext.textAlign = "center";
    canvasContext.font = "14px Arial";
}

function movePlayer() {

}
function drawRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height)
}
