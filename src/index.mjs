

// 创建维护敌机的对象
let enemyObj = {};
// 创建维护子弹的对象
let bulletObj = {};
// 创建维护敌人子弹的对象
let enemyBulletObj = {};
// 创建敌人子弹自增key
let enemyBulletKey = 0;
// 创建子弹自增key
let bulletKey = 0;
// 创建敌机自增key
let enemyKey = 0;
// 游戏是否结束
let over = false;
// 分数
let score = 0;
// 屏幕宽高
let bodyWidth =
  document.compatMode == "BackCompat"
    ? document.body.clientWidth -50
    : document.documentElement.clientWidth -50;
let bodyHeight =
  document.compatMode == "BackCompat"
    ? document.body.clientHeight
    : document.documentElement.clientHeight;
  
// 更新dom，监听是否碰撞
function changeCoordinate() {
  if (over) return;
  if (mineExample) {
    this.render(mineExample);
  }
  for (let key in bulletObj) {
    this.render(bulletObj[key]);
  }
  for (let key in enemyObj) {
    this.render(enemyObj[key]);
  }
  for (let key in enemyBulletObj) {
    this.render(enemyBulletObj[key]);
  }
  let l3 = mineExample.dom.offsetLeft;
  let t3 = mineExample.dom.offsetTop;
  let r3 = l3 + mineExample.dom.offsetWidth;
  let b3 = t3 + mineExample.dom.offsetHeight;
  for (let bulletKey in bulletObj) {
    const bulletDom = bulletObj[bulletKey].dom;
    for (let enemyKey in enemyObj) {
      const enemyDom = enemyObj[enemyKey].dom;
      let l1 = bulletDom.offsetLeft;
      let t1 = bulletDom.offsetTop;
      let r1 = l1 + bulletDom.offsetWidth;
      let b1 = t1 + bulletDom.offsetHeight;

      let l2 = enemyDom.offsetLeft;
      let t2 = enemyDom.offsetTop;
      let r2 = l2 + enemyDom.offsetWidth;
      let b2 = t2 + enemyDom.offsetHeight;
      if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2 && !enemyDom.bao) {
        enemyDom.bao = true;
        enemyDom.style.backgroundImage = `url(./bao.gif?time=${Math.random()})`;
        bulletObj[bulletKey] = null;
        delete bulletObj[bulletKey];
        // 敌机毁灭，停止发射子弹
        clearInterval(enemyObj[enemyKey].enemyBulletClock);
        clearInterval(enemyObj[enemyKey].moveClock);
        bulletDom.remove();
        score++;
        scoreDom.innerHTML = "scores：" + score;
        setTimeout(() => {
          enemyObj[enemyKey] = null;
          delete enemyObj[enemyKey];
          enemyDom.remove();
        }, 800);
      }
      if (r2 > l3 && l2 < r3 && b2 > t3 && t2 < b3 && !enemyDom.bao) {
        return this.gameOver();
      }
    }
  }
  for (let key in enemyBulletObj) {
    const enemyBulletDom = enemyBulletObj[key].dom;
    let l2 = enemyBulletDom.offsetLeft;
    let t2 = enemyBulletDom.offsetTop;
    let r2 = l2 + enemyBulletDom.offsetWidth;
    let b2 = t2 + enemyBulletDom.offsetHeight;
    if (r2 > l3 && l2 < r3 && b2 > t3 && t2 < b3) {
      return this.gameOver();
    }
  }
}
function render(temp) {
  if (over) return;
  temp.dom.style.width = temp.width + "px";
  temp.dom.style.height = temp.height + "px";
  temp.dom.style.left = temp.left  + "px";
  temp.dom.style.top = temp.top + "px";
}
// 游戏结束
function gameOver() {
  over = true;
  const width = 400,
    height = 400;
  new gameover({
    width,
    height,
    left: bodyWidth / 2 - width / 2,
    top: bodyHeight / 2 - height / 2,
  });
  for (let key in enemyObj) {
    const item = enemyObj[key];
    clearInterval(item.enemyBulletClock);
    clearInterval(item.clock);
    clearInterval(item.moveClock);
  }
  for (let key in bulletObj) {
    const item = bulletObj[key];
    clearInterval(item.clock);
    clearInterval(item.moveClock);
  }
  for (let key in enemyBulletObj) {
    const item = enemyBulletObj[key];
    clearInterval(item.moveClock);
  }
  mineExample.dom.onmousedown = null;
}
const begin = document.querySelector(".begin");
const beginbutton = document.querySelector(".beginbutton");
const beginbuttonSpan = document.querySelector(".beginbuttonSpan");
let scoreDom = null;
let mineExample = null;
// 子弹发射频率 - 100毫秒
const launch = 100;
begin.onclick = () => {
  begin.style.display = "none";
  beginbutton.style.display = "none";
  beginbuttonSpan.style.display = "none";
  // 获取分数dom对象
  scoreDom = document.querySelector(".scores");
  // 创建自己
  /*
      width: number - 自己宽度
      height: number - 自己高度
  */
  mineExample = new myPlane({
    width: 52,
    height: 26,
  });
  // 循环创建自己的子弹
  let bulletClock = setInterval(() => {
    bulletKey++;
    /*
      speed: number - 子弹速度
      direction: up | down - 子弹方向
      left: number - 坐标x
      top: number - 坐标y
      width: number - 子弹宽度
      height: number - 子弹高度
      color: string - 子弹颜色
  */
    // 生成随机颜色
    const getRandomColor = () => {
      let color = "#";
      const str = "abcdef1234567890";
      const strL = str.length;
      for (let i = 0; i < 6; i++) {
        color += str[Math.floor(Math.random() * strL)];
      }
      return color;
    };
    const width = 4,
      height = 10;
    let biu = new bullet({
      speed: 30,
      direction: "up",
      left: mineExample.left + mineExample.width / 2 - width / 2,
      top: mineExample.top,
      width,
      height,
      color: getRandomColor(),
      index: bulletKey,
      clock: bulletClock,
    });
    bulletObj[bulletKey] = biu;
  }, launch);
  const createEnemyTime = 500;
  // 循环生成敌人
  let enemyClock = setInterval(() => {
    enemyKey++;
    /*
                  speed: number - 敌机速度
                  width: number - 敌机宽度
                  height: number - 敌机高度
              */
    let di = new enemy({
      width: 50,
      height: 50,
      speed: 20,
      index: enemyKey,
      clock: enemyClock,
    });
    enemyObj[enemyKey] = di;
  }, createEnemyTime);
  setInterval(() => {
    changeCoordinate();
  }, 20);
};
