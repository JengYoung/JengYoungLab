export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
};
