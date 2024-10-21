<template>
  <demo-section style="padding: 0 16px">
    <demo-block title="基础用法">
      <ze-list v-model="loading" :has-more="hasMore" @load-more="loadMore">
        <div class="test" v-for="(item, index) in sum" :key="index">
          {{ index }}
        </div>
      </ze-list>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      sum: 24,
      hasMore: true,
      count: 0,
    };
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

<style lang="scss" scoped>
.test {
  padding: 12px 0 12px 20px;
  border-top: 1px solid #eee;
}
</style>
