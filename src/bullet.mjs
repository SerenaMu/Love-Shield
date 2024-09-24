class bullet extends plane {
  constructor(options) {
    super({
      ...options,
      name: "enemy",
      dom: document.createElement("div"),
    });
    this.dom.style.backgroundColor = options.color || "#000";
    this.dom.className = "bullet";
    // 子弹显示停留做个透明度过渡衔接
    this.dom.style.opacity = 0;
    document.body.appendChild(this.dom);
    this.upgo();
  }
  upgo() {
    let clock = setInterval(() => {
      if (this.direction == "up") this.top -= this.speed;
      else if (this.direction == "down") this.top += this.speed;
      else {
        clearInterval(clock);
        console.warn("请设置子弹方向");
      }
      this.dom.style.opacity = 1;
      if (this.top <= -this.height && this.direction == "up") {
        bulletObj[this.index] = null;
        delete bulletObj[this.index];
        clearInterval(clock);
        return this.dom.remove();
      } else if (this.top >= bodyHeight && this.direction == "down") {
        enemyBulletObj[this.index] = null;
        delete enemyBulletObj[this.index];
        clearInterval(clock);
        return this.dom.remove();
      }
    }, 100);
    this.moveClock = clock;
  }
}
