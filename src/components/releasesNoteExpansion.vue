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
    }
  });

const releaseInfos = ref({});

const loadReleases = async () => {
  releaseInfos.value = await application().getReleaseNotes(props.release);
};

</script>

<template>
  <q-expansion-item
    dense
    header-class="bg-grey-3 text-h6"
    :label="props.release"
    @before-show="loadReleases"
    @hide="releaseInfos.value = {}"
  >
    <div v-if="Object.keys(releaseInfos).length > 0">
      <e-release-notes-row :value="releaseInfos['version']" label="Version" />
      <e-release-notes-row :value="releaseInfos['buildDate']" label="Build date" />
      <e-release-notes-row :value="releaseInfos['buildNumber']" label="Build number" />
      <q-separator />
      <e-release-notes-row :value="releaseInfos['description']" />
      <q-separator />
      <e-release-notes-row :value="releaseInfos['repository']" is-link label="Repository" />

      <br />
      <c-release-notes-changelog :value="releaseInfos['changelog']" :version="props.release" />
    </div>
  </q-expansion-item>
</template>

<style scoped>

</style>
