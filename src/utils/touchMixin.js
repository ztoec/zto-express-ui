export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: '', // '' | 'vertical' | 'horizontal'
      MIN_DISTANCE: 10,
    };
  },
  methods: {
    // 获取手势方向
    touchGetDirection(x, y) {
      if (x > y && x > this.MIN_DISTANCE) {
        return 'horizontal';
      }
      if (y > x && y > this.MIN_DISTANCE) {
        return 'vertical';
      }
      return '';
    },
    // 判断是否为垂直方向
    touchIsVertical() {
      return this.direction === 'vertical';
    },
    // 判断是否为水平方向
    touchIsHorizontal() {
      return this.direction === 'horizontal';
    },
    // 重置手势数据
    touchReset() {
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.direction = '';
    },
    // 记录触摸开始位置
    touchStartFn(event) {
      this.touchReset();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    // 记录触摸移动过程中的位置变化
    touchMoveFn(event) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.moveX = touch.clientX;
      this.moveY = touch.clientY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);

      if (!this.direction) {
        this.direction = this.touchGetDirection(this.offsetX, this.offsetY);
      }
    },
  },
};
