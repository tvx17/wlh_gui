<script lang="ts" setup>
import { useWLH } from 'src/WLH';

const wlh = useWLH();

const props = defineProps(
  {
    displayValue: { required: true },
    label: { required: true, type: String }
  }
);
</script>
<template>
  <div v-if="typeof props.displayValue === 'number' && props.displayValue !== 0" class="text-overline">
    <div class="row">
      <div :class="'col-' + wlh.Constants.app.columnWidths.label">
        {{ props.label }}
      </div>
      <div :class="'col-' + wlh.Constants.app.columnWidths.field">
        {{ props.displayValue }}
      </div>
    </div>
  </div>

</template>


