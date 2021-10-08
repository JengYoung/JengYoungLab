<template>
  <div>
    <h3>{{ title }}</h3>
    <!-- eslint-disable -->
    <input
      :value="modelValue"
      type="text"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <!-- eslint-enable -->
  </div>
</template>

<script>
import fieldMixin from '@/components/fields/mixin';
export default {
  mixins: [fieldMixin],
};
</script>
