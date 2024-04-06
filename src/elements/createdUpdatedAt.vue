<script setup>
import {useWLH} from 'src/WLH';
const wlh = useWLH();

const props = defineProps(
  {
    dtString: { required: true, type: String, default: '' },
    label: { required: true, type: String }
  }
);
</script>

<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + wlh.Constants.app.columnWidths.label">
        {{ props.label }}
      </div>
      <div :class="'col-' + wlh.Constants.app.field">

        {{ new Date(props.dtString).toUTCString() }}
      </div>
    </div>
  </div>

</template>

