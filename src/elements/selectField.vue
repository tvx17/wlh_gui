<script setup>
import {useWLH} from 'src/WLH';
const wlh = useWLH();
import { computed, onMounted, ref } from 'vue';

const props = defineProps(
  {
    modelValue: { required: true },
    displayLabel: { required: false, type: Boolean, default: true },
    label: { required: true, type: String },
    disable: { required: false, type: Boolean, default: false },
    source: { required: false, type: Object, default: () => ({}) },
    placeholder: { required: false, type: String, default: 'Select an option' },
    settingsKey: { required: false, type: String, default: '' }
  }
);
const emits = defineEmits(['update:modelValue']);

const value = computed(
  {
    get: () => props.modelValue, set: (value) => {
      emits('update:modelValue', value);
    }
  });

const options = ref([]);
const optionsValue = ref('id');
const optionsLabel = ref('summary');

function loadCommonData(){
  if (typeof (props.source) !== 'object') {
    console.error('Property "source" must be an object with the following structure');
    console.error('{ table: "TABLE_NAME", returnColumn: ["COLUMN1", "COLUMN2", ...], where:{ column1: "value1", column2: "value2", ... } }');
    return;
  }
  if(props.source.hasOwnProperty('options')) {
    optionsValue.value = props.source.options.value;
    optionsLabel.value = props.source.options.label;
  }
  if (!props.source.hasOwnProperty('table')) {
    console.error('Property "source" must have a "table" property');
    return;
  }
  const dbRequest = wlh.Entities.common(props.source['table']);
  if (props.source.hasOwnProperty('returnColumns')) {
    dbRequest.returnColumns(props.source.returnColumns);
  } else {
    dbRequest.returnColumns(['id', 'summary']);
  }
  if (props.source.hasOwnProperty('where')) {
    dbRequest.where(props.source.where);
  }

  dbRequest.readAll().then((res) => {
    if(props.source.hasOwnProperty('isJson') && props.source.isJson) {
      res = JSON.parse(res[0].data);
    }
    options.value = res;
  });
}
async function loadDataFromSettings(){
  const res = await wlh.Entities.settings().get(props.settingsKey);
}


onMounted(async () => {
  if(props.source && props.settingsKey) {
    await loadDataFromSettings();
    return
  }
  if(props.source) {
    await loadCommonData();
    return
  }
  if(props.settingsKey) {
    await loadDataFromSettings();
    return
  }
  console.error('No source or settings key defined');

});
</script>
<template lang="pug">
  div(class="text-overline")
    div(class="row")
      div(v-if="props.displayLabel"
        :class="'col-' + wlh.Constants.app.columnWidths.label")
        | {{ props.label }}
      div(:class="'col-' + wlh.Constants.app.columnWidths.field")
        q-select(
          dense
          emit-value
          map-options
          :option-value="optionsValue.value"
          :option-label="optionsLabel.value"
          v-model="value"
          :options="options"
          :placeholder="props.placeholder")
</template>
