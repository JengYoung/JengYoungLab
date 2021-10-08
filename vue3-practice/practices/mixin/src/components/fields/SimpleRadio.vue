<template>
  <h3>{{ title }}</h3>
  <ul>
    <li v-for="item in items" :key="item">
      <label for="">
        <!-- eslint-disable -->
        <input
          type="radio"
          :value="item"
          :name="title"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <!-- eslint-enable -->
        {{ item }}
      </label>
    </li>
  </ul>
</template>

<script>
import fieldMixin from '@/components/fields/mixin';
export default {
  mixins: [fieldMixin],
};
</script>
