const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const backGround = new Image();
const foreGround = new Image();
const bird = new Image();
const upperPipe = new Image();
const bottomPipe = new Image();

backGround.src = "img/background.png";
foreGround.src = "img/foreground.png";
bird.src = "img/bird.png";
upperPipe.src = "img/upperpipe.png";
bottomPipe.src = "img/bottompipe.png";

const soundOfMoveBird = new Audio();
const soundOfScore = new Audio();

soundOfMoveBird.src = "audio/fly.mp3";
soundOfScore.src = "audio/score.mp3";

const gap = 90;

const gravity = 1;

let score = 0;

let xPos = 10;
let yPos = 150;

let pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0,
};

function moveBird() {
  yPos -= 20;
  soundOfMoveBird.play();
}

document.addEventListener("keydown", moveBird);

function draw() {
  context.drawImage(backGround, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    context.drawImage(upperPipe, pipe[i].x, pipe[i].y);
    context.drawImage(
      bottomPipe,
      pipe[i].x,
      pipe[i].y + upperPipe.height + gap
    );
    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * upperPipe.height) - upperPipe.height,
      });
    }

    if (
      xPos + bird.width >= pipe[i].x &&
      xPos <= pipe[i].x + upperPipe.width &&
      (yPos <= pipe[i].y + upperPipe.height ||
        yPos + bird.height >= pipe[i].y + upperPipe.height + gap)
    )
      location.reload();

    if (pipe[i].x == 1) {
      score++;
      soundOfScore.play();
    }
  }

  context.drawImage(foreGround, 0, canvas.height - foreGround.height);

  context.drawImage(bird, xPos, yPos);

  yPos += gravity;

  context.fillStyle = "#000";
  context.font = "24px Verdana";
  context.fillText("Счет: " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

bottomPipe.onload = draw;
