<script lang="ts" setup>
import { useWLH } from 'src/WLH';
import { computed } from 'vue';

const { Entities, Constants } = useWLH();

const props = defineProps(
  {
    modelValue: { required: true },
    label: { required: true, type: String },
    disable: { required: false, type: Boolean, default: false },
    placeholder: { required: false, type: String, default: 'Please enter a value' },
    saveToDatabase: { required: false, type: Object, default: () => ({}) }
  }
);
const emits = defineEmits(['update:modelValue', 'on:change']);

function onSave(valueToSave: any) {
  emits('on:change');
  if (Object.keys(props.saveToDatabase).length > 0) {
    Entities.common(props.saveToDatabase.table).update({
                                                         id: props.saveToDatabase.id,
                                                         [props.saveToDatabase.column]: valueToSave
                                                       });
  }
}

const value = computed(
  {
    get: () => props.modelValue, set: (value) => {
      emits('update:modelValue', value);
    }
  });
</script>
<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + Constants.app.columnWidths.label">
        {{ props.label }}
      </div>
      <div :class="'col-' + Constants.app.columnWidths.field">
        {{ value }}
        <q-popup-edit v-slot="scope"
                      v-model="value"
                      @save="onSave">
          <q-input v-model="scope.value"
                   :disable="props.disable"
                   :placeholder="props.placeholder"
                   dense
                   @keyup.enter="scope.set">
            <template v-slot:after>
              <q-btn
                text-color="negative"
                dense
                flat
                icon="fa-solid fa-xmark"
                @click.stop.prevent="scope.cancel"
              />

              <q-btn
                :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value"
                text-color="positive"
                dense
                flat
                icon="fa-solid fa-check"
                @click.stop.prevent="scope.set"
              />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
    </div>
  </div>
</template>



