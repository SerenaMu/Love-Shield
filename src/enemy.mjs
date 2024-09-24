class enemy extends plane {
  constructor(options) {
    super({
      ...options,
      top: -options.height,
      left: Math.floor(Math.random() * bodyWidth),
      name: "enemy",
      dom: document.createElement("div"),
    });
    this.dom.className = "enemy";
    document.body.appendChild(this.dom);
    this.down();
    this.createBullet();
  }
  // 向下坠
  down() {
    let clock = setInterval(() => {
      this.top += this.speed;
      if (this.top >= bodyHeight) {
        clearInterval(clock);
        clearInterval(this.enemyBulletClock);
        enemyObj[this.index] = null;
        delete enemyObj[this.index];
        return this.dom.remove();
      }
    }, 100);
    this.moveClock = clock;
  }
  // 创建子弹
  createBullet() {
    let enemyBulletClock = setInterval(() => {
      enemyBulletKey++;
      const width = 10,
        height = 20;
      let enemyBullet = new bullet({
        speed: this.speed + 30,
        width,
        height,
        direction: "down",
        left: this.left + this.width / 2 - width / 2,
        top: this.top + this.height,
        index: enemyBulletKey,
      });
      enemyBulletObj[enemyBulletKey] = enemyBullet;
    }, 500);
    this.enemyBulletClock = enemyBulletClock;
  }
}
