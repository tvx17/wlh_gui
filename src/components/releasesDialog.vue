<script lang="ts" setup>
import cReleaseNote from 'src/components/releasesNote.vue';
import cReleaseNoteExpansion from 'src/components/releasesNoteExpansion.vue';
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
const buildData = ref({});

watch(() => props.dialogOpen, (value) => {
  _dialogOpen.value = value;
  if (value) {
    loadReleases();
  }
});

const loadReleases = async () => {
  releases.value = await application().getRelease();
  buildData.value = await application().getBuildData();
};
</script>

<template>
  <q-dialog v-model="_dialogOpen" persistent>
    <q-card v-if="releases.length > 0" style="min-width: 75%">
      <q-card-section>
        <q-card-section class="text-h6">
          <q-bar class="bg-white">
            <span>WLH - Writer's little helper</span>
            <q-space />
            <q-btn dense flat icon="close" round @click="emit('on:closeDialog')" />
          </q-bar>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <c-release-note :release="releases[0]" :buildData="buildData" />
        <q-separator />
        <div v-if="releases.length > 1">
          <br />
          <div class="text-weight-bold">Older releases</div>
          <div v-for="(release, index) in releases" :key="index">
            <c-release-note-expansion v-if="index > 0" :release="release" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
