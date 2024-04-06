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
import { useRoute, useRouter } from 'vue-router';

// --------------------------------------------------------------- Constants
const form = useForm();
const route = useRoute();
const router = useRouter();
const myName = 'users';
const wlh = useWLH();

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
        <c-select-filter :min-count="1"
                         :source-name="myName"
                         :title="$t('generic.users')"
                         :plural="$t('generic.users')"
                         :singular="$t('generic.user')"
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
          <c-form-header :title="$t('generic.user')" />
          <div class="q-pa-md">
            <e-display v-if="form.additionalInformationVisible.value"
                       :display-value="form.dataset.value.id"
                       :label="$t('generic.id')" />
            <e-input v-model="form.dataset.value.summary"
                     :label="$t('generic.summary')" />
            <e-input v-model="form.dataset.value.firstname"
                     :label="$t('users.firstname')" />
            <e-input v-model="form.dataset.value.lastname"
                     :label="$t('users.lastname')" />
            <e-input v-model="form.dataset.value.pseudonym"
                     :label="$t('users.pseudonym')" />
            <e-date-time v-if="form.additionalInformationVisible.value"
                         :created-at="form.dataset.value.createdAt"
                         :created-at-label="$t('generic.createdAt')"
                         :updated-at="form.dataset.value.updatedAt"
                         :updated-at-label="$t('generic.updatedAt')" />
          </div>
          <q-separator />
        </div>
      </div>
    </div>
  </q-page>
</template>
<style>

</style>

