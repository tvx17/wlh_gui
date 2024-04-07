<script lang="ts" setup>
import cReleaseNotesChangelogPart from 'src/components/releaseNotesChangelogPart.vue';


const props = defineProps(
  {
    value: {
      type: Object,
      required: true
    },
    version: {
      type: String,
      required: true
    }
  });
</script>

<template>
  <q-expansion-item
    header-class="bg-grey-3"
    :caption="props.version"
    dense
    label="Changelog">
    <c-release-notes-changelog-part v-if="props.value.hasOwnProperty('added')"
                                    :data="props.value.added"
                                    name="Added" />
    <c-release-notes-changelog-part v-if="props.value.hasOwnProperty('changed')"
                                    :data="props.value.changed"
                                    name="Changed" />
    <c-release-notes-changelog-part v-if="props.value.hasOwnProperty('fixed')"
                                    :data="props.value.fixed"
                                    name="Fixed" />
    <c-release-notes-changelog-part v-if="props.value.hasOwnProperty('removed')"
                                    :data="props.value.removed"
                                    name="Removed" />
    <c-release-notes-changelog-part v-if="props.value.hasOwnProperty('deprecated')"
                                    :data="props.value.deprecated"
                                    name="Deprecated" />
  </q-expansion-item>

</template>

<style scoped>

</style>
