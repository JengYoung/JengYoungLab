<template>
  <h1>Hello</h1>
  <slot :good="123" />
</template>

<style lang="scss" scoped>
/* scoped: style hash를 부여 */
$color: orange;
h1 {
  color: $color;
}
</style>
