<template>
  <button>
    <slot>JengYoung</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 10px 20px;
  &:hover {
    background-color: orange;
    transform: scale(1.2);
  }
}
</style>
