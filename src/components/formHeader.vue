<script lang="ts" setup>
import { useForm } from 'src/supporting/form';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = useForm();


const props = defineProps(
  {
    title: {
      type: String,
      required: true
    }
  });

</script>

<template>
  <q-bar>
    <span class="text-weight-bolder">{{ form.dataset.value.summary }}</span>
    <q-space />
    <q-btn :icon="(form.additionalInformationVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye')"
           dense
           flat
           unelevated
           @click="form.additionalInformationVisible.value = !form.additionalInformationVisible.value">
      <q-tooltip>{{ $t('generic.additionalInfo') }}</q-tooltip>
    </q-btn>
  </q-bar>

</template>

