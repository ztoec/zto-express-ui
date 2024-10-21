<template>
  <demo-section style="padding: 0 16px">
    <demo-block title="基础用法" style="height: 250px; overflow: auto">
      <ze-pull-refresh v-model="refresh" @refresh="refreshFun">
        <div class="test" v-for="(item, index) in 20" :key="index">
          {{ index }}
        </div>
      </ze-pull-refresh>
    </demo-block>
    <demo-block title="嵌套用法">
      <ze-pull-refresh v-model="refresh2" @refresh="refreshFun2">
        <ze-list
          v-model="loading"
          :has-more="hasMore"
          @load-more="loadMore"
          style="height: 250px; overflow: auto"
        >
          <div class="test" v-for="(item, index) in sum" :key="index">
            {{ index }}
          </div>
        </ze-list>
      </ze-pull-refresh>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      refresh: false,
      refresh2: false,
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
    refreshFun() {
      setTimeout(() => {
        this.refresh = false;
      }, 3000);
    },
    refreshFun2() {
      setTimeout(() => {
        this.refresh2 = false;
      }, 3000);
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
