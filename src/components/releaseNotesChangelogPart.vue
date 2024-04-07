<script lang="ts" setup>
const props = defineProps(
  {
    name: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    simpleView: {
      type: Boolean,
      default: false
    }
  });
</script>

<template>
  <div class="text-weight-bolder">{{ props.name }}</div>
  <div v-if="!props.simpleView">
    <div v-for="(item, index) in props.data" :key="index" class="row">
      <div class="col-3">
        {{ item.ref }}
      </div>
      <div class="col">
        {{ item.text }}
      </div>
    </div>
    <q-separator />
  </div>
  <div v-else>
    <div v-for="(item, index) in props.data" :key="index" class="row">
      <div class="col">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
