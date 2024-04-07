<script setup lang="ts">
const props = defineProps({
  value:{
    type: Object,
    required: true
  }
})
</script>

<template>
  {{props.value}}

</template>

<style scoped>

</style>
