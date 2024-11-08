<template>
  <div :class="$bem(['vertical'])">
    <slot />
  </div>
</template>

<script>
import { createNamespace } from '../utils/create';

const [defineComponent] = createNamespace('steps');
export default defineComponent({
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
