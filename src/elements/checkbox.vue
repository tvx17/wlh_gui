<script setup>
import {computed} from 'vue';
import {useWLH} from 'src/WLH'
const wlh = useWLH();

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: true, type: String},
    disable: {required: false, type: Boolean, default: false},
  }
);
const emits = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue, set: (value) => {
    emits('update:modelValue', value);
  }
});

</script>
<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + wlh.Constants.app.columnWidths.label">
        {{ props.label }}
      </div>
      <div :class="'col-' + wlh.Constants.app.columnWidths.field">
        <q-checkbox v-model="value" :disable="props.disable" dense />
      </div>
    </div>
  </div>

</template>


<style>
</style>
