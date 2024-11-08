<template>
  <div
    ref="scroller"
    :class="$bem()"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <div :class="$bem('container')" :style="getStyle">
      <div :class="$bem('status__box')" :style="getHeightStyle">
        <div class="loader" v-if="status == 'loading' && !$slots.loading"></div>

        <div :class="$bem('status__text')">
          {{ getPullStatus }}
        </div>

        <slot v-if="status == 'pulling'" name="pulling"></slot>
        <slot v-if="status == 'loosing'" name="loosing"></slot>
        <slot v-if="status == 'loading'" name="loading"></slot>
        <slot v-if="status == 'complete'" name="complete"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../utils/create';
import { getScrollParent, pxCheck } from '../utils/helper';
import touchMixin from '../utils/touchMixin';

const [defineComponent] = createNamespace('pull-refresh');
export default defineComponent({
  mixins: [touchMixin],
  model: {
    prop: 'modelValue',
    event: 'input',
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    pullingTxt: {
      type: String,
      default: '下拉刷新',
    },
    loosingTxt: {
      type: String,
      default: '释放刷新',
    },
    loadingTxt: {
      type: String,
      default: '加载中...',
    },
    completeTxt: {
      type: String,
      default: '刷新成功',
    },
    headHeight: {
      type: [String, Number],
      default: 50,
    },
    pullDistance: {
      type: [String, Number],
      default: 50,
    },
    duration: {
      type: [String, Number],
      default: 0.3,
    },
    completeDuration: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isPullRefresh: false,
      distance: 0,
      status: 'normal', // 'pulling', 'loosing', 'loading', 'complete'
      scroller: null,
      scrollParent: null,
    };
  },
  computed: {
    getPullStatus() {
      switch (this.status) {
        case 'pulling':
          return !this.$slots.pulling ? this.pullingTxt : '';
        case 'loosing':
          return !this.$slots.loosing ? this.loosingTxt : '';
        case 'loading':
          return !this.$slots.loading ? this.loadingTxt : '';
        case 'complete':
          return !this.$slots.complete ? this.completeTxt : '';
        default:
          return '';
      }
    },
    getStyle() {
      return {
        transitionDuration: `${this.duration}s`,
        transform: this.distance ? `translate3d(0,${this.distance}px, 0)` : '',
      };
    },
    getHeightStyle() {
      const styles = {};
      if (this.headHeight !== 50) styles.height = pxCheck(this.headHeight);
      return styles;
    },
  },
  watch: {
    modelValue(val) {
      if (val) {
        this.setPullStatus(+this.headHeight, true);
      } else {
        if (this.completeDuration === 0) this.setPullStatus(0);
        this.setPullStatus(+this.headHeight, false, true);
        setTimeout(() => {
          this.setPullStatus(0);
        }, this.completeDuration);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scroller = this.$refs.scroller;
      this.scrollParent = this.scroller
        ? getScrollParent(this.scroller)
        : window;
    });
  },
  methods: {
    timing(distance) {
      const pullDistance = +(this.pullDistance || this.headHeight);
      let moveDistance = distance;
      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          moveDistance = (distance + pullDistance) / 2;
        } else {
          moveDistance = pullDistance + distance / 4;
        }
      }
      return Math.round(moveDistance);
    },
    setPullStatus(distance, isLoading = false, isComplete = false) {
      const pullDistance = +(this.pullDistance || this.headHeight);
      this.distance = distance;

      if (isLoading) {
        this.status = 'loading';
      } else if (isComplete) {
        this.status = 'complete';
      } else if (distance === 0) {
        this.status = 'normal';
      } else if (distance < pullDistance) {
        this.status = 'pulling';
      } else {
        this.status = 'loosing';
      }

      this.$emit('change', { status: this.status, distance });
    },
    isCanTouch() {
      return this.status !== 'loading' && this.status !== 'complete';
    },
    isScrollTop() {
      if (this.scrollParent === window) {
        const windowScrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        return windowScrollTop === 0;
      }
      return this.scrollParent && this.scrollParent.scrollTop === 0;
    },
    touchStart(event) {
      if (this.isCanTouch()) {
        if (this.isScrollTop()) {
          this.touchStartFn(event);
          this.isPullRefresh = true;
        } else {
          this.distance = 0;
          this.isPullRefresh = false;
        }
      }
    },
    touchMove(event) {
      if (this.isCanTouch()) {
        this.touchMoveFn(event);
        const { deltaY } = this;

        if (this.touchIsVertical() && deltaY > 0 && this.isPullRefresh) {
          event.preventDefault();
          this.setPullStatus(this.timing(deltaY));
        }
      }
    },
    touchEnd() {
      if (this.isPullRefresh && this.isCanTouch() && this.deltaY) {
        if (this.status === 'loosing') {
          this.setPullStatus(+this.headHeight, true);
          this.$emit('input', true);
          this.$nextTick(() => this.$emit('refresh'));
        } else {
          this.setPullStatus(0);
        }
      }
      setTimeout(() => {
        this.touchReset();
      }, 0);
    },
  },
});
</script>

<style lang="scss" scoped>
.ze-pull-refresh {
  height: 100%;
  overflow: hidden;
  .ze-pull-refresh__container {
    position: relative;
    height: 100%;
    .ze-pull-refresh__status__box {
      position: absolute;
      left: 0;
      width: 100%;
      height: 50px;
      transform: translateY(-100%);
      text-align: center;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      .loader {
        margin-right: 5px;
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
      .ze-pull-refresh__status__text {
        font-size: 14px;
        color: #c8c8c8;
      }
    }
  }
}
</style>
