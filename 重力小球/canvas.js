window.onload = function () {
  let canvas = document.querySelector("#mycanvas")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 鼠标点击产生新球
  window.addEventListener('mousedown', function () {
    init()
  })

  // 球根据改变窗口宽高改变弹跳
  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // init()
  })


  // 随机数
  function randomInit(low, hight) {
    return Math.floor(Math.random() * (hight - low + 1) + low)
  }

  // 小球数组
  let ballArr;
  // 重力和阻力
  const Gravaty = 0.8;
  const resisten = 0.9;
  // 颜色数组
  let colorArray = [
    '#4CBF88',
    '#F2B134',
    '#6F4A70',
    '#FF6275',
    '#00B5C4'
  ]

  // 小球构造函数
  function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    //绘画圆
    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    // 更新动画
    this.update = function () {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy;
        this.dy *= resisten;
      } else {
        this.dy += Gravaty;
      }
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw()
    }
  }

  // 初始化小球实例
  function init() {
    ballArr = [];
    for (let i = 0; i < 200; i++) {
      let radius = randomInit(5, 15);
      let x = randomInit(radius, canvas.width - radius);
      let y = randomInit(radius, canvas.height - radius);
      let dx = randomInit(-2, 2);
      let dy = randomInit(1, 2);
      let color = colorArray[Math.floor(Math.random() * colorArray.length)]
      ballArr.push(new Ball(x, y, dx, dy, radius, color))
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate)
    for (let b of ballArr) {
      b.update()
    }
  }
  init();
  animate();
}
