<script setup lang="ts">
import {useRoute} from 'vue-router';
const route = useRoute();
</script>
<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>
      <div class="text-h6">
        Path: {{route.path}}
      </div>
      <div class="text-h6">
        Params: {{route.params}}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>


