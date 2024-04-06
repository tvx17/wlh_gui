<script lang="ts" setup>
// --------------------------------------------------------------- Components
import cSelectFilter from 'components/selectFilterComponent.vue';
import cFormHeader from 'src/components/formHeader.vue';
// --------------------------------------------------------------- Elements
import eDateTime from 'src/elements/dateTime.vue';
import eDisplay from 'src/elements/displayField.vue';
import eInput from 'src/elements/inputField.vue';
// --------------------------------------------------------------- Supporting
import { useForm } from 'src/supporting/form';
import { useWLH } from 'src/WLH';
// --------------------------------------------------------------- Vue
import { onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

// --------------------------------------------------------------- Constants
const {t} = useI18n()
const form = useForm();
const route = useRoute();
const router = useRouter();
const myName = 'scenes';
const wlh = useWLH();

// --------------------------------------------------------------- Local definitions
const filterOptions = [{
  table: 'projects',
  label: 'Projects',
  key: 'id',
  valueColumn: 'id',
  optionColumn: 'summary',
  queryName: 'findScenesByProjectId'
},
  {
    table: 'books',
    label: 'Books',
    queryName: 'findScenesByBookId'
  },
  {
    table: 'chapters',
    label: 'Chapters',
    queryName: 'findScenesByChapterId'
  }];

// --------------------------------------------------------------- Methods
async function onSave() {
  await wlh.Entities.scenes().saveText(form.dataset.value.id, form.dataset.value.text)
  wlh.App.notifies.positive(t('generic.saved'));
}

// --------------------------------------------------------------- Lifecycle Hooks
watch(() => route.params.id, (id) => {
  form.load(id);
});

onMounted(async () => {
  await form.init(parseInt(route.params.id), myName, ['messages']);
});
onUnmounted(() => {
  wlh.App.i18n.unload(myName);
});

</script>
<template>
  <q-page>
    <div class="row">
      <div class="col-4">
        <c-select-filter :filter-options="filterOptions"
                         :min-count="1"
                         :plural="$t('generic.scenes')"
                         :singular="$t('generic.scene')"
                         :source-name="myName"
                         :title="$t('generic.scenes')"
                         source-type="table"
                         @on:select="form.onSelect" />

      </div>
      <div class="col-8">
        <!-- ******************* Nothing selected ******************* -->
        <div v-if="route.params.id === '0'">
          Dashboard - Projects
        </div>
        <!-- ******************* Form ******************* -->
        <div v-else class="q-pl-xs">
          <c-form-header :title="$t('generic.scene')" />
          <div class="q-pa-md">
            <e-display v-if="form.additionalInformationVisible.value"
                       :display-value="form.dataset.value.id"
                       :label="$t('generic.id')" />
            <e-input v-model="form.dataset.value.summary"
                     :label="$t('generic.summary')" />
            <e-date-time v-if="form.additionalInformationVisible.value"
                         :created-at="form.dataset.value.createdAt"
                         :created-at-label="$t('generic.createdAt')"
                         :updated-at="form.dataset.value.updatedAt"
                         :updated-at-label="$t('generic.updatedAt')" />
            <q-editor v-model="form.dataset.value.text"
                      :definitions="{
                        save: {
                          tip: 'Save your work',
                          icon: 'save',
                          handler: onSave
                        }
                      }"
                      :toolbar="[
                        ['bold', 'italic'],
                        ['save']
                        ]"
                      dense
            />
          </div>
          <q-separator />
        </div>
      </div>
    </div>

  </q-page>
</template>
<style>

</style>

