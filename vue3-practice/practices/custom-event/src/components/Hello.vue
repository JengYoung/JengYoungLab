<template>
  <div>
    <h1 @click="$emit('please', 2)">A</h1>
    <h1 @click="$emit('click')">B</h1>
  </div>
</template>

<script>
export default {
  emits: {
    'click': null,
    please: (num) => {
      if (num > 10) {
        return true;
      } else {
        console.error('number is not greater than 10'); // 유효성 검사 이후 아닐 때, 이후의 행위 역시 우리가 만들 수 있음.
        return false;
      }
    }
  }  
}
</script>

<style lang="scss" scoped>
/* scoped: style hash를 부여 */
$color: orange;
h1 {
  color: $color;
}
</style>