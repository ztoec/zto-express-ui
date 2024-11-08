<template>
  <demo-section style="padding: 0 16px">
    <demo-block title="基础用法">
      <ze-steps :active="active1">
        <ze-step v-for="(item, index) in stepList1" :key="index" :item="item">
        </ze-step>
      </ze-steps>
    </demo-block>
    <demo-block title="使用插槽">
      <ze-steps :active="active1">
        <ze-step v-for="(item, index) in stepList1" :key="index" :item="item">
          <template slot="title">
            <p class="title">🚀{{ item.title }}</p>
            <p class="time">{{ item.time }}</p>
          </template>
          <div slot="content" v-html="formatHtml(item.content)"></div>
        </ze-step>
      </ze-steps>
    </demo-block>
  </demo-section>
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
        },
        {
          title: '',
          time: '2023-11-30 15:08',
          content: '【上海市】快件已到达 徐汇华泾',
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
