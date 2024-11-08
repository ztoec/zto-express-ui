<template>
  <div :class="$bem('item', { active: isActive })">
    <div :class="$bem('shape')">
      <div :class="[$bem('icon'), { dot: !curStepIcon }]">
        <img v-if="curStepIcon" :src="curStepIcon" alt="" />
      </div>
    </div>

    <div :class="$bem('main')">
      <div :class="$bem('title')">
        <slot name="title">
          <span class="title">{{ title }}</span>
          <span class="time">{{ time }}</span>
        </slot>
      </div>
      <div :class="$bem('content')">
        <slot name="content">{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../utils/create';

const [defineComponent] = createNamespace('step');
export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => ({
        title: '',
        time: '',
        content: '',
      }),
    },
    propKeys: {
      type: Object,
      default: () => ({
        title: 'title',
        time: 'time',
        content: 'content',
        icon: 'icon',
      }),
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    currentIndex() {
      return this.$parent.$children.indexOf(this);
    },
    isActive() {
      return this.$parent.active === this.currentIndex;
    },
    curStepIcon() {
      return this.icon || this.item[this.propKeys.icon ?? 'icon'];
    },
    content() {
      return this.item[this.propKeys.content ?? 'content'];
    },
    time() {
      return this.item[this.propKeys.time ?? 'time'];
    },
    title() {
      return this.item[this.propKeys.title ?? 'title'];
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.ze-step__item {
  display: flex;
  &.ze-step__item--active {
    .ze-step__main {
      .ze-step__title {
        color: #151d32;
      }
      .ze-step__content {
        color: #454a5b;
      }
    }
  }
  &:not(:last-child) {
    padding-bottom: 11px;
  }
  &:last-child {
    .ze-step__shape {
      &::after {
        content: unset;
      }
    }
    .ze-step__content {
      min-height: unset;
    }
  }
  .ze-step__shape {
    position: relative;
    width: 30px;
    &::after {
      position: absolute;
      content: '';
      width: 1px;
      height: calc(100% + 15px);
      left: 50%;
      bottom: -20px;
      transform: translateX(-50%);
      background: linear-gradient(
        to bottom,
        #d8d8d8,
        #d8d8d8 3px,
        transparent 3px,
        transparent
      );
      background-size: 100% 6px; /* 每个虚线单元的高度 */
    }
    .ze-step__icon {
      position: relative;
      z-index: 10;
      font-size: 0;
      &.dot {
        &::after {
          position: absolute;
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          top: 5px;
          left: 50%;
          transform: translate(-50%, 0);
          background: #cccccc;
        }
      }

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
  }

  .ze-step__main {
    flex: 1;
    padding-left: 10px;
    box-sizing: border-box;
    .ze-step__title {
      display: flex;
      align-items: center;
      color: #787c89;
      .title {
        margin-right: 8px;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
      }
      .time {
        font-size: 12px;
      }
    }
    .ze-step__content {
      margin-top: 5px;
      color: #787c89;
      font-size: 12px;
      line-height: 17px;
      min-height: 34px;
    }
  }
}
</style>
