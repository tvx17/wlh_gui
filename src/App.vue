<script lang="ts" setup>
import { useWLH } from 'src/WLH';
import { onMounted } from 'vue';

const wlh = useWLH();


onMounted(async () => {
  await wlh.init();
});
</script>

<template>
  <router-view />
</template>
