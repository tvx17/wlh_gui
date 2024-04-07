<script lang="ts" setup>
import { application } from 'src/entities/Application';
import { onMounted, ref } from 'vue';


const props = defineProps(
  {
    release: {
      type: String,
      required: true
    }
  });

const releaseInfos = ref({});

onMounted(async () => {
  releaseInfos.value = await application().getReleaseNotes(props.release);
});

</script>

<template>
  {{ props.release }}
  <!--  <e-release-notes-row :value="releaseInfos['version']" label="Version" />
    <e-release-notes-row :value="releaseInfos['buildDate']" label="Build date" />
    <e-release-notes-row :value="releaseInfos['buildNumber']" label="Build number" />
    <q-separator />
    <e-release-notes-row :value="releaseInfos['description']" />
    <q-separator />
    <e-release-notes-row :value="releaseInfos['repository']" is-link label="Repository" />
    <br />
    <c-release-notes-changelog :value="releaseInfos['changelog']" :version="props.release" />-->
</template>

<style scoped>

</style>
