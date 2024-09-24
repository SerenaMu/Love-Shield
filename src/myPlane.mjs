class myPlane extends plane {
  constructor(options) {
    super({
      name: "myPlane",
      left: 0,
      top: 0,
      ...options,
      dom: document.createElement("div"),
    });
    this.dom.className = "myPlane";
    // 设置飞机在屏幕下方中间
    this.left = bodyWidth / 2 - this.width / 2;
    this.top = bodyHeight - 100;
    // 把飞机放到body里面
    document.body.appendChild(this.dom);
    // 绑定拖拽事件
    this.draggable();
  }
  // 让元素可拖拽
  draggable() {

    this.dom.onmousedown = (e) => {
      let left = e.clientX - this.dom.offsetLeft;
      let top = e.clientY - this.dom.offsetTop;
      document.onmousemove = ({ clientX, clientY }) => {
        this.left =
          clientX - left < 0 - this.width / 2
            ? -this.width / 2
            : clientX - left > bodyWidth - this.width / 2
            ? this.left
            : clientX - left;
        this.top =
          clientY - top < 0
            ? 0
            : clientY - top > bodyHeight - this.height
            ? this.top
            : clientY - top;
        render(this)
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        this.dom.onmouseup = null;
      };
    }; 
  }
}
