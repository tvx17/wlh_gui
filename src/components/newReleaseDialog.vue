<script lang="ts" setup>
import cReleaseNotesChangelogPart from 'src/components/releaseNotesChangelogPart.vue';
import eReleaseNotesRow from 'src/elements/releaseNotesRow.vue';
import { application } from 'src/entities/Application';
import { ref, watch } from 'vue';

const props = defineProps(
  {
    dialogOpen: {
      type: Boolean,
      required: true
    }
  });
const emit = defineEmits(['on:closeDialog']);

const _dialogOpen = ref(props.dialogOpen);
const releases = ref([]);
const releaseInfos = ref({});

watch(() => props.dialogOpen, (value) => {
  _dialogOpen.value = value;
  if (value) {
    loadReleases();
  }
});

const loadReleases = async () => {
  releases.value = await application().getRelease();
  releaseInfos.value = await application().getReleaseNotes(releases.value[0]);
};
</script>

<template>
  <q-dialog v-model="_dialogOpen" persistent>
    <q-card v-if="Object.keys(releaseInfos).length > 0" style="min-width: 75%">
      <q-card-section>
        <q-card-section class="text-h6">
          <q-bar class="bg-white">
            NEW RELEASE of WLH - Writer's little helper
            <q-space />

            <q-btn dense flat icon="close" round @click="emit('on:closeDialog')" />
          </q-bar>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <e-release-notes-row :value="releaseInfos['version']" label="Version" />
        <e-release-notes-row :value="releaseInfos['buildDate']" label="Build date" />
        <e-release-notes-row :value="releaseInfos['description']" />
        <q-separator />
        <br/>
        <c-release-notes-changelog-part v-if="releaseInfos['changelog'].hasOwnProperty('added')"
                                        :data="releaseInfos['changelog'].added"
                                        name="New features"
                                        simple-view />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
