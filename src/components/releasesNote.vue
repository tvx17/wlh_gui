<script lang="ts" setup>
import cReleaseNotesChangelog from 'src/components/releaseNotesChangelog.vue';
import eReleaseNotesRow from 'src/elements/releaseNotesRow.vue';
import { application } from 'src/entities/Application';
import { onMounted, ref } from 'vue';


const props = defineProps(
  {
    release: {
      type: String,
      required: true
    },
    buildData: {
      type: Object,
      required: true
    }
  });

const releaseInfos = ref({});

onMounted(async () => {
  releaseInfos.value = await application().getReleaseNotes(props.release);
});

</script>

<template>
  <div v-if="Object.keys(releaseInfos).length > 0">
    <e-release-notes-row :value="releaseInfos['version']" label="Version" />
    <e-release-notes-row :value="releaseInfos['buildDate']" label="Build date" />
    <e-release-notes-row :value="props.buildData['buildNumber']" label="Build number" :braces-values="'Build date: ' + props.buildData['buildDate']" />
    <q-separator />
    <br/>
    <e-release-notes-row :value="releaseInfos['description']" />
    <q-separator />
    <br/>
    <e-release-notes-row :value="releaseInfos['repository']" is-link label="Repository" />

    <br />
    <c-release-notes-changelog :value="releaseInfos['changelog']" :version="props.release"/>
  </div>
</template>

<style scoped>

</style>
