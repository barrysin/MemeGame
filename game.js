var canvas = document.getElementById("gameCanvas");
var canvasContext;
var ballX = canvas.width/3;
var ballY = canvas.height/2;
var vx = 5;
var vy = 5;
const winScore = 5;
const PADDLE_HEIGHT = 100;
const PADDLE_THICK = 10;
var paddle1Y;
var paddle2Y = canvas.width/2;
var showVictory = false;
var p1Score = 0;
var p2Score = 0;
var startBtn = document.getElementById("startBtn");
function start(){
    startBtn.style.display = 'none';
    // canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    var frames = 60;
    setInterval(function () {
        moveBall();
        movePaddle();
        draw();
    }, 1000/frames);
    canvas.addEventListener('click', handleMouseClick);
    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - PADDLE_HEIGHT/2;

        })
}

function handleMouseClick() {
    if(showVictory) {
        p1Score = 0;
        p2Score = 0;
        showVictory = false;
    }
}
function moveBall() {
    if (showVictory) {
        return;
    }
    ballX = ballX + vx;
    ballY = ballY + vy;

    if ( ballX <= 0){
        if (ballY > paddle1Y + PADDLE_HEIGHT || ballY <paddle1Y) {
            p2Score++;
            ballReset();
        }else {
            if (vx < 15 && vx > - 15){
                vx = vx * -1;
            } else {
                vx = -vx;
            }
            calculateY(true);

        }
    }
    if (ballX >= canvas.width -5) {
        if (ballY > paddle2Y + PADDLE_HEIGHT || ballY <paddle2Y) {
            p1Score++;
            ballReset();
        }else {
            if (vx < 15 && vx > -15){
                vx = vx * -1;
            } else {
                vx = -vx;
            }
            calculateY(false);
        }
    }
    if (ballY >= canvas.height -5 || ballY <= 0){
        vy = vy* -1;
    }

}

function calculateY(one) {
    var delta;
    if (one) {
        delta = (paddle1Y + PADDLE_HEIGHT - ballY);
    } else {
        delta = (paddle2Y + PADDLE_HEIGHT - ballY);
    }
    // ratio of how far it is from the bottom of paddle.
    delta = delta/PADDLE_HEIGHT;


    delta = 1 - delta;

    delta = delta * 2;
    delta = delta - 1;
    delta = delta * 5;
    vy = vy + delta;

}

function movePaddle() {
    if (paddle2Y + PADDLE_HEIGHT/2 - ballY < -50) {
        paddle2Y += 7;
    } else if (paddle2Y + PADDLE_HEIGHT/2 - ballY < -10) {
        paddle2Y += 3;
    } else if (paddle2Y + PADDLE_HEIGHT/2 - ballY < 0) {
        paddle2Y += 0;
    } else if (paddle2Y + PADDLE_HEIGHT/2 - ballY < 10) {
        paddle2Y -= 3;
    } else {
        paddle2Y -= 7;
    }
}


function draw() {
    // draws background
    drawRect(0, 0, canvas.width, canvas.height, 'lightblue');
    drawRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white');
    drawRect(canvas.width-10 , paddle2Y, PADDLE_THICK, PADDLE_HEIGHT, 'white');
    canvasContext.textAlign = "center";
    if (showVictory) {
        canvasContext.fillStyle = "rgba(137, 137, 160, 0.5)";
        canvasContext.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
        canvasContext.fillStyle = 'white';
        canvasContext.font = "80px Arial";
        if (p2Score === winScore) {
            canvasContext.fillText("YOU LOSE!" , canvas.width/2, canvas.height/2);
        } else {
            canvasContext.fillText("YOU WIN!", canvas.width/2, canvas.height/2);
        }
        canvasContext.font = "40px Arial";
        canvasContext.fillText("Press to play again!", canvas.width/2, (canvas.height/4) * 3);
        return;

    }
    canvasContext.font = "14px Arial";
    canvasContext.fillText("Player 1 Score: " + p1Score, canvas.width/4, canvas.height/6);
    canvasContext.fillText("Player 2 Score: " + p2Score, 3* canvas.width/4, canvas.height/6);
    // draws ball
    drawCircle(ballX, ballY, PADDLE_THICK, 'white');


}
function ballReset() {
    if (p1Score === winScore || p2Score === winScore) {
        showVictory = true;
    }
    ballX = canvas.width/2;
    ballY = canvas.height/2;

    vy = randomNum(-5, 5);
}
function randomNum(min, max) {
    return Math.random() * (max-min) + min;
}
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}
function drawCircle(x, y, size, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, size, 0, 2* Math.PI, true);
    canvasContext.fill();
}
function drawRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height)

}
