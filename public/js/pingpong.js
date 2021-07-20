//@ts-check

const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");

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
}

class Ball {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} r
   * @param {string} color
   */

  constructor(x, y, r, color) {
    this.dx = 0.5;
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
    if (this.x - this.r < 0 || this.x + this.r > cvs.width) {
      this.dx = -this.dx;
    }
    if (this.y - this.r < 0 || this.y + this.r > cvs.height) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

const paddleRight = new Paddle(0, 15, 5, 10, "#fff");
const paddleLeft = new Paddle(cvs.width - 5, 15, 5, 10, "#fff");
const ball = new Ball(cvs.width / 2, cvs.height / 2, 2, "#fff");

const init = () => {
  paddleRight.draw();
  paddleLeft.draw();
  ball.draw();
  paddleRight.update();
  paddleLeft.update();
  ball.update();
};

const animate = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  init();
  requestAnimationFrame(animate);
};

animate();
