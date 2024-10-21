<template>
  <div class="ze-steps ze-steps--vertical">
    <slot />
  </div>
</template>

<script>
import { createNamespace } from '../utils/create';
const [createComponent] = createNamespace('steps');
export default createComponent({
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
});
</script>

<style lang="scss" scoped>
.ze-steps {
  &.ze-steps--vertical {
  }
}
</style>
