<script lang="ts" setup>
const props = defineProps(
  {
    label: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
    bracesValues:{
      type: String,
      required: false,
      default: ''
    },
    isLink: {
      type: Boolean,
      required: false,
      default: false
    }
  }
);
</script>

<template>
  <div class="row">
    <div v-if="props.label !== ''" class="col-3 text-weight-bolder">{{ label }}</div>
    <div :class="props.isLink ? 'col-8' : 'col'">{{ value }} <span v-if="props.bracesValues !== ''">({{ bracesValues }})</span>
      <span v-if="props.isLink" class="text-primary">&nbsp;
        <a :href="props.value" target="_blank"><q-icon name="fa-solid fa-external-link" size="xs">
          <q-tooltip anchor="top middle" self="bottom middle">Open in new window</q-tooltip>
        </q-icon></a>
      </span>
    </div>


  </div>
</template>

<style scoped>

</style>
