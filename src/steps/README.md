# ZeSteps 步骤条

### 介绍

ZeSteps 是一个步骤条组件，当前仅支持垂直模式

### 引入

```js
import Vue from 'vue';
import { ZeSteps, ZeStepItem } from 'zto-express-ui';

Vue.use(ZeSteps).use(ZeStepItem);
```

## 代码演示

### 基础用法

```html
<template>
  <ze-steps :active="active1">
    <ze-step-item
      v-for="(item, index) in stepList1"
      :key="index"
      :item="item"
    >
    </ze-step-item>
  </ze-steps>
</template>

<script>
export default {
  data() {
    return {
      active1: 0,
      stepList1: [
        {
          title: '已签收',
          time: '2023-11-30 19:08',
          content:
            '您的快递已送货上门，签收人为【家门口】。如有疑问请联系业务员：134567567，代理点电话：021-1232434，投诉电话：1267234637、3246599905。感谢使用中通快递，期待再次为您服务',
          icon: 'https://picsum.photos/30/30',
        },
        {
          title: '派件中',
          time: '2023-11-30 18:08',
          content: '【上海市】快件已到达 徐汇华泾',
          icon: 'https://picsum.photos/30/30',
        },
        {
          title: '运输中',
          time: '2023-11-30 17:08',
          content: '【上海市】快件已到达 徐汇华泾',
          icon: 'https://picsum.photos/30/30',
        },
        {
          title: '',
          time: '2023-11-30 16:08',
          content: '【上海市】快件已到达 徐汇华泾',
          icon: '',
        },
        {
          title: '',
          time: '2023-11-30 15:08',
          content: '【上海市】快件已到达 徐汇华泾',
          icon: '',
        },
        {
          title: '已收件',
          time: '2023-11-30 15:08',
          content: '【泉州市】泉州丰泽二部已揽收',
          icon: 'https://picsum.photos/30/30',
        },
        {
          title: '待取件',
          time: '2023-11-30 14:08',
          content: '【泉州市】泉州丰泽二部已揽收',
          icon: 'https://picsum.photos/30/30',
        },
      ],
    };
  },
};
</script>

```

### 使用插槽

```html
<template>
  <ze-steps :active="active1">
    <ze-step-item
      v-for="(item, index) in stepList1"
      :key="index"
      :item="item"
    >
      <template slot="title">
        <p class="title">🚀{{ item.title }}</p>
        <p class="time">{{ item.time }}</p>
      </template>
      <div slot="content" v-html="formatHtml(item.content)"></div>
    </ze-step-item>
  </ze-steps>
</template>

<script>
export default {
  data() {
    return {
      active1: 0,
      stepList1: [
        {
          title: '已签收',
          time: '2023-11-30 19:08',
          content:
            '您的快递已送货上门，签收人为【家门口】。如有疑问请联系业务员：134567567，代理点电话：021-1232434，投诉电话：1267234637、3246599905。感谢使用中通快递，期待再次为您服务',
          icon: 'https://picsum.photos/30/30',
        },
        {
          title: '派件中',
          time: '2023-11-30 18:08',
          content: '【上海市】快件已到达 徐汇华泾',
          icon: 'https://picsum.photos/30/30',
        },
        {
          title: '运输中',
          time: '2023-11-30 17:08',
          content: '【上海市】快件已到达 徐汇华泾',
          icon: 'https://picsum.photos/30/30',
        },
        {
          title: '',
          time: '2023-11-30 16:08',
          content: '【上海市】快件已到达 徐汇华泾',
          icon: '',
        },
        {
          title: '',
          time: '2023-11-30 15:08',
          content: '【上海市】快件已到达 徐汇华泾',
          icon: '',
        },
        {
          title: '已收件',
          time: '2023-11-30 15:08',
          content: '【泉州市】泉州丰泽二部已揽收',
          icon: 'https://picsum.photos/30/30',
        },
        {
          title: '待取件',
          time: '2023-11-30 14:08',
          content: '【泉州市】泉州丰泽二部已揽收',
          icon: 'https://picsum.photos/30/30',
        },
      ],
    };
  },
   methods: {
    formatHtml(str) {
      const phoneRegex = /(\d{3,4}-?\d{7,8}|\d{11})/g;

      return str.replace(phoneRegex, (phoneNumber) => {
        console.log('🚀 ~ returnstr.replace ~ phoneNumber:', phoneNumber);
        return `<a href="tel:${phoneNumber}">${phoneNumber}</a>`;
      });
    },
  },
};
</script>

```

## API

### Props

#### steps

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| active          | 当前在哪一步 | _number_ | `0` |

#### step-item

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| item          | 当前步骤的数据对象 | _object_ | `{title: '', time: '', content: ''}` |
| propKeys      | 当前步骤的数据取值的key | _object_ | `{title: 'title', time: 'time', content: 'content', icon: 'icon'}` |
| icon      | 当前步骤的icon， 此icon属性权重大于item.icon，为空时默认表现为圆点 | _string_ | `''` |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| title | 标题部分 |
| content | 内容部分 |
