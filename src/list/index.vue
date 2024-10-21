<template>
  <div ref="scroller" class="ze-list-loading">
    <div class="ze-list__container">
      <slot></slot>
    </div>

    <div class="ze-list__bottom">
      <template v-if="isInfiniting">
        <div class="ze-list__bottom-box">
          <slot name="loading">
            <slot name="loading-icon">
              <div class="loader"></div>
            </slot>
            <div class="ze-list__bottom-box__text">
              {{ loadTxt }}
            </div>
          </slot>
        </div>
      </template>
      <template v-else-if="!hasMore">
        <slot name="finished">
          <div class="ze-list__bottom-tips">{{ loadMoreTxt }}</div>
        </slot>
      </template>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../utils/create';
import requestAniFrame from '../utils/raf';
import { getScrollParent } from '../utils/helper';

const [ni] = createNamespace('list');
export default {
  ...ni,
  model: {
    prop: 'modelValue',
    event: 'input',
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    threshold: {
      type: Number,
      default: 200,
    },
    loadTxt: {
      type: String,
      default: '加载中...',
    },
    loadMoreTxt: {
      type: String,
      default: '没有更多了～',
    },
    useCapture: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      beforeScrollTop: 0,
      isInfiniting: false,
      y: 0,
      x: 0,
      distance: 0,
      scroller: null,
      scrollParent: null,
      isKeepAlive: false,
    };
  },
  watch: {
    modelValue: {
      handler(val) {
        if (!val) {
          this.isInfiniting = false;
        }
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scroller = this.$refs.scroller;
      this.scrollParent = this.scroller
        ? getScrollParent(this.scroller)
        : window;
      this.scrollListener();
    });
  },
  beforeDestroy() {
    this.removeScrollListener();
  },
  activated() {
    if (this.isKeepAlive) {
      this.isKeepAlive = false;
      this.scrollListener();
    }
  },
  deactivated() {
    this.isKeepAlive = true;
    this.removeScrollListener();
  },
  methods: {
    calculateTopPosition(el) {
      return !el
        ? 0
        : el.offsetTop + this.calculateTopPosition(el.offsetParent);
    },
    isScrollAtBottom() {
      let offsetDistance = 0;
      let resScrollTop = 0;
      let direction = 'down';

      if (this.scrollParent === window) {
        const windowScrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        if (this.scroller) {
          offsetDistance =
            this.calculateTopPosition(this.scroller) +
            this.scroller.offsetHeight -
            windowScrollTop -
            window.innerHeight;
        }
        resScrollTop = windowScrollTop;
      } else {
        const { scrollHeight, clientHeight, scrollTop } = this.scrollParent;
        offsetDistance = scrollHeight - clientHeight - scrollTop;
        resScrollTop = scrollTop;
      }

      if (this.beforeScrollTop > resScrollTop) {
        direction = 'up';
      } else {
        direction = 'down';
      }

      this.beforeScrollTop = resScrollTop;

      this.$emit('scrollChange', resScrollTop);

      return offsetDistance <= this.threshold && direction === 'down';
    },
    handleScroll() {
      requestAniFrame(() => {
        if (!this.isScrollAtBottom() || !this.hasMore || this.isInfiniting) {
          return;
        }
        console.log(22);
        this.isInfiniting = true;
        this.$emit('input', true);
        this.$nextTick(() => this.$emit('load-more'));
      });
    },
    scrollListener() {
      if (this.scrollParent) {
        this.scrollParent.addEventListener(
          'scroll',
          this.handleScroll,
          this.useCapture
        );
      }
    },
    removeScrollListener() {
      if (this.scrollParent) {
        this.scrollParent.removeEventListener(
          'scroll',
          this.handleScroll,
          this.useCapture
        );
      }
    },
  },
};
</script>
<style lang="scss">
.ze-list-loading {
  display: block;
  width: 100%;
  .ze-list__bottom {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    color: #c8c8c8;
    text-align: center;
    .ze-list__bottom-box {
      display: flex;
      align-items: center;
      justify-content: center;
      .loader {
        width: 14px;
        aspect-ratio: 1;
        display: grid;
        border-radius: 50%;
        background: linear-gradient(
              0deg,
              rgb(200 200 200/50%) 30%,
              #0000 0 70%,
              rgb(200 200 200/100%) 0
            )
            50%/8% 100%,
          linear-gradient(
              90deg,
              rgb(200 200 200/25%) 30%,
              #0000 0 70%,
              rgb(200 200 200/75%) 0
            )
            50%/100% 8%;
        background-repeat: no-repeat;
        animation: l23 1s infinite steps(12);
        &::before,
        &::after {
          content: '';
          grid-area: 1/1;
          border-radius: 50%;
          background: inherit;
          opacity: 0.915;
          transform: rotate(30deg);
        }
        &::after {
          opacity: 0.83;
          transform: rotate(60deg);
        }
      }
      .ze-list__bottom-box__text {
        margin-left: 5px;
        font-size: 12px;
      }
    }
  }
}
@keyframes l23 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
