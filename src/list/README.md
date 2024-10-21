# List 列表

### 介绍

List 列表组件，包含上拉加载

### 引入

```js
import Vue from 'vue';
import { List } from 'zto-express-ui';

Vue.use(List);
```

## 代码演示

### 基础用法

```html
<template>
  <ze-list v-model="loading" :has-more="hasMore" @load-more="loadMore">
    <div class="test" v-for="(item, index) in sum" :key="index">
      {{ index }}
    </div>
  </ze-list>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      sum: 24,
      hasMore: true,
      count: 0,
    }
  },
  methods: {
    loadMore() {
      setTimeout(() => {
        console.log('load more');
        this.sum += 24;
        this.count++;
        if (this.count > 2) this.hasMore = false;
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| v-model       | 是否触发滚动加载  | _boolean_ | `false` |
| has-more     | 是否还有更多数据  | _boolean_ | `true` |
| threshold     | 滚动条与底部距离小于 `threshold` 时触发 `loadMore` 事件   | _number_ | `200` |
| use-capture  | 是否使用捕获模式 `true` 捕获 `false` 冒泡   | _boolean_ | `false` |
| load-more-txt | “没有更多数据” 展示文案    | _string_ | `没有更多了～` |
| load-txt  | 上拉加载提示文案     | _string_ | `加载中...` |

### Events

| 事件名           | 说明     | 回调参数   |
| ------------- | -------- | -------- |
| load-more           | 继续加载的回调函数  | `-` |
| scroll-change            | 实时监听滚动高度   | `滚动高度` |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 自定义加载内容 |
| loading | 自定义底部加载中提示 |
| loading-icon | 自定义底部加载中图标 |
| finished | 自定义加载完成后的提示文案 |
