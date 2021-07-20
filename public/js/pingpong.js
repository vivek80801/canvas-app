//@ts-check

const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
let life = 3;
let score = 0;
let win = false;

class Paddle {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string} color
   */

  constructor(x, y, w, h, color) {
    this.dy = 0.5;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  update() {
    if (this.y < 0 || this.y + this.h > cvs.height) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
  }
  moveUp() {
    this.dy = 1;
    if (this.y - this.h > 0) {
      this.y += this.dy;
    }
  }
  moveDown() {
    this.dy = 1;
    if (this.y + this.h < cvs.height) {
      this.y -= this.dy;
    }
  }
}

class Ball {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} r
   * @param {string} color
   */

  constructor(x, y, r, color) {
    this.dx = -0.5;
    this.dy = 0.5;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (this.y - this.r < 0 || this.y + this.r > cvs.height) {
      this.dy = -this.dy;
    }
    if (
      this.y - this.r < paddleRight.y + paddleRight.h &&
      this.y + this.r > paddleRight.y - paddleRight.h &&
      this.x + this.r > paddleRight.x - paddleRight.w
    ) {
      this.dx = -this.dx;
    } else if (
      this.y - this.r < paddleLeft.y + paddleLeft.h &&
      this.y + this.r > paddleLeft.y - paddleLeft.h &&
      this.x - this.r < paddleLeft.x + paddleLeft.w
    ) {
      this.dx = -this.dx;
      score++;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

const paddleLeft = new Paddle(0, 15, 5, 10, "#f0f");
const paddleRight = new Paddle(cvs.width - 5, 15, 5, 10, "#0ff");
const ball = new Ball(cvs.width / 2, cvs.height / 2, 2, "#f00");

paddleRight.dy = 1;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.code === "KeyJ") {
    paddleLeft.moveUp();
  }
  if (e.key === "ArrowDown" || e.code === "KeyK") {
    paddleLeft.moveDown();
  }
  if (
    (e.code === "Space" && life <= 0) ||
    (e.code === "Space" && win === true)
  ) {
    restart();
  }
});

const restart = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  life = 3;
  score = 0;
  ball.x = cvs.width / 2;
  ball.y = cvs.height / 2;
  ball.dx = -0.5;
  ball.dy = 0.5;
  paddleLeft.x = 0;
  paddleRight.x = cvs.width - 5;
  paddleLeft.y = 15;
  paddleRight.y = 15;
  init();
};

const writeLife = () => {
  const newLife = "Life: " + life;
  ctx.fillStyle = "#ff0";
  ctx.fillText(newLife, 0, 10);
};

const writeScore = () => {
  const newScore = "Score: " + score;
  ctx.fillStyle = "#f0f";
  ctx.fillText(newScore, cvs.width - 50, 10);
};

const update = () => {
  if (ball.x - ball.r < 0) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    life--;
    ball.x = cvs.width / 2;
    ball.y = cvs.height / 2;
    ball.dx = -0.5;
    ball.dy = 0.5;
  } else if (ball.x + ball.r > cvs.width) {
    win = true;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#fff";
    ctx.fillText("You win", cvs.width / 2 - 20, cvs.height / 2);
    ctx.fillText(
      "To Restart. press 'Space'",
      cvs.width / 2 - 50,
      cvs.height / 2 + 10
    );
  }
  if (life <= 0) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#fff";
    ctx.fillText("You lose", cvs.width / 2 - 20, cvs.height / 2);
    ctx.fillText(
      "To Restart. press 'Space'",
      cvs.width / 2 - 50,
      cvs.height / 2 + 10
    );
  }
};

const init = () => {
  paddleRight.draw();
  paddleLeft.draw();
  ball.draw();
  paddleRight.update();
  ball.update();
  writeScore();
  writeLife();
  update();
};

const animate = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  init();
  requestAnimationFrame(animate);
};

animate();
