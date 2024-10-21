<template>
  <div class="ze-steps ze-steps--vertical">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ze-steps',
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.ze-steps {
  &.ze-steps--vertical {
  }
}
</style>
