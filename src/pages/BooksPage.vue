<script lang="ts" setup>

// --------------------------------------------------------------- Components
import cSelectFilter from 'components/selectFilterComponent.vue';
import cFormChildren from 'src/components/formChildren.vue';
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
import { useRoute, useRouter } from 'vue-router';

// --------------------------------------------------------------- Constants
const form = useForm();
const route = useRoute();
const router = useRouter();
const myName = 'books';
const wlh = useWLH();


// --------------------------------------------------------------- Local definitions
const filterOptions = [
  {
    table: 'projects',
    label: 'Projects',
    key: 'id',
    valueColumn: 'id',
    optionColumn: 'summary',
    queryName: 'findBooksByProjectId'
  }
];


// --------------------------------------------------------------- Lifecycle Hooks
watch(() => route.params.id, (id) => {
  form.load(id);
});

onMounted(async () => {
  await form.init(parseInt(route.params.id), myName, ['messages', myName]);
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
                         :plural="$t('generic.books')"
                         :singular="$t('generic.books')"
                         :selected-value="route.params.id"
                         :source-name="myName"
                         source-type="table"
                         title="Books"
                         @on:select="form.onSelect" />

      </div>
      <div class="col-8">
        <!-- ******************* Nothing selected ******************* -->
        <div v-if="route.params.id === '0'">
          Dashboard - Projects
        </div>
        <!-- ******************* Form ******************* -->
        <div v-else class="q-pl-xs">
          <c-form-header :title="$t('generic.book')" />
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
          </div>
          <q-separator />
          <c-form-children v-if="form.dataset.value.id"
                           :parent-id="form.dataset.value.id"
                           :parent-name="form.dataset.value.summary"
                           :parent="$t('generic.book')"
                           :plural="$t('generic.chapters')"
                           relationship-column="parentId"
                           :singular="$t('generic.chapter')"
                           table="chapters"
                           target-route="chapters"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<style>

</style>

