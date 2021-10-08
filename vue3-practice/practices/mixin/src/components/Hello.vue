<template>
  <h1>{{ msg }}</h1>
  <h1>{{ count }}</h1>
</template>

<script>
import sampleMixin from '@/mixins/sample';
export default {
  mixins: [sampleMixin],
};
</script>
<style lang="scss" scoped>
/* scoped: style hash를 부여 */
$color: orange;
h1 {
  color: $color;
}
</style>
