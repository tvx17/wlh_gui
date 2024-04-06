<script setup>
import eAt from 'src/elements/createdUpdatedAt.vue';

const greyShade = '4';

const props = defineProps(
  {
    createdAt: {required: true, type:String, default: ''},
    updatedAt: {required: true, type:String, default: ''},
    createdAtLabel: {type:String, default: 'Created at', required: false},
    updatedAtLabel: {type:String, default: 'Updated at', required: false},
  }
);

</script>

<template>
  <br/>
  <q-separator/>
  <e-at :label="props.createdAtLabel" :dt-string="props.createdAt" :class="'text-grey-' + greyShade"/>
  <e-at :label="props.updatedAtLabel" :dt-string="props.updatedAt" :class="'text-grey-' + greyShade"/>
</template>

