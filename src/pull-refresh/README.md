# List 列表

### 介绍

PullRefresh 下拉刷新组件，可与 `List` 组件配合使用实现下拉刷新和上拉加载。

### 引入

```js
import Vue from 'vue';
import { PullRefresh, List } from 'zto-express-ui';

Vue.use(PullRefresh).use(List);
```

## 代码演示

### 基础用法

```html
<template>
  <ze-pull-refresh v-model="refresh" @refresh="refreshFun">
    <div class="test" v-for="(item, index) in 20" :key="index">
      {{ index }}
    </div>
  </ze-pull-refresh>
</template>

<script>
export default {
  data() {
    return {
      refresh: false,
    }
  },
  methods: {
    refreshFun() {
      setTimeout(() => {
        this.refresh = false;
      }, 3000);
    },
  },
};
</script>

```

### 嵌套用法
>
> 与List配合使用实现下拉刷新和上拉加载

```html
<template>
  <div style="height: 250px; overflow: auto">
    <ze-list v-model="loading" :has-more="hasMore" @load-more="loadMore">
      <ze-pull-refresh v-model="refresh2" @refresh="refreshFun2">
        <div class="test" v-for="(item, index) in sum" :key="index">
          {{ index }}
        </div>
      </ze-pull-refresh>
    </ze-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      refresh: false,
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
    refreshFun() {
      setTimeout(() => {
        this.refresh = false;
      }, 3000);
    },
  },
};
</script>

```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| v-model       | 是否触发下拉刷新   | _boolean_ | `false` |
| pull-distance  | 触发下拉刷新的距离   | _number_ `|` _string_ | `50` |
| head-height    | 顶部内容高度  | _number_ `|` _string_  | `50` |
| pulling-txt  | 下拉过程提示文案   | _string_ | `下拉刷新` |
| loosing-txt   | 释放过程提示文案    | _string_ | `释放刷新` |
| loading-txt   | 加载过程提示文案      | _string_ | `加载中...` |
| complete-txt   | 加载完成提示文案      | _string_ | `刷新成功` |
| complete-duration   | 加载完成时显示文字的持续时间(毫秒),为0时不展示加载完成文案       | _number_ | `0` |
| duration    | 下拉动画加载时长，单位秒        | _number_ | `0.3` |

### Events

| 事件名           | 说明     | 回调参数   |
| ------------- | -------- | -------- |
| change           | 下拉过程或状态改变时触发   | `{status:string,distance:number}` |
| refresh           | 下拉刷新事件回调    | `-` |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| pulling | 下拉过程的顶部内容 |
| loosing | 释放过程中顶部内容 |
| loading  | 加载过程中顶部内容 |
| complete  | 完成时头部的内容 |
| default  | 自定义内容 |
