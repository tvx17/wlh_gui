<script lang="ts" setup>
import helper from 'src/app/helper';
import { useWLH } from 'src/WLH';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();


const wlh = useWLH();

const props = defineProps(
  {
    parentName: {
      type: String,
      required: true
    },
    table: {
      type: String,
      required: true
    },
    relationshipColumn: {
      type: String,
      required: true
    },
    parentId: {
      type: Number,
      required: true
    },
    targetRoute: {
      type: String,
      required: true
    },
    singular: {
      type: String,
      required: false,
      default: 'Item'
    },
    plural: {
      type: String,
      required: false,
      default: 'Items'
    },
    parent: {
      type: String,
      required: false,
      default: 'parent'
    }
  });

const deleteMode = ref(false);
const items = ref(null);

const onAddChild = async () => {
  const res = await helper.onNew(
    props.table,
    t('messages.addTitle', { item: props.singular.toLowerCase() }),
    t('messages.addMessage', { item: props.singular.toLowerCase() }),
    { [props.relationshipColumn]: props.parentId });
  items.value.push(res);
};
const onSelect = (id: number) => {
  router.push({ name: props.targetRoute, params: { id: id } });
};

const onDelete = async (index: number) => {
  await helper.onDelete(
    props.table,
    items.value[index].id,
    items.value[index].summary,
    t('messages.deleteTitle', { item: props.singular.toLowerCase() }),
    t('messages.deleteMessage', { item: props.singular.toLowerCase() })
  ).then(res => {
    if (res) {
      items.value.splice(index, 1);
    }
  });
};

const load = async (id: number) => {
  items.value = await wlh.Entities.common(props.table).returnColumns(['id', 'summary']).where({ [props.relationshipColumn]: id }).readAll();
};

watch(() => props.parentId, (id) => {
  load(id);
});

onMounted(async () => {
  await load(props.parentId);
  await wlh.App.i18n.load('messages');
});
</script>

<template>
  <hr />
  <q-bar>
    <span>{{ $t('messages.itemsInCurrent', { item: props.plural, parent: props.parent.toLowerCase() }) }}</span>
    <q-space />
    <q-btn v-if="!deleteMode"
           dense
           flat
           icon="fa-solid fa-plus"
           size="sm"
           unelevated
           @click="onAddChild">
      <q-tooltip>{{ $t('messages.addTitle', { item: props.singular.toLowerCase() }) }}</q-tooltip>
    </q-btn>
    <q-btn v-if="items"
           :disable="items.length <= 1"
           :text-color="!deleteMode ? 'black' : 'red'"
           dense
           flat
           icon="fa-solid fa-trash"
           size="sm"
           @click="deleteMode = !deleteMode"
    >
      <q-tooltip>{{ $t('messages.deleteTitle', { item: props.singular.toLowerCase() }) }}</q-tooltip>
    </q-btn>
  </q-bar>

  <div v-if="items && items.length > 0">
    <q-list dense separator>
      <q-item v-for="(item, itemIndex) in items"
              :key="itemIndex"
              :clickable="!deleteMode"
              @click="onSelect(item.id)">
        <q-item-section v-if="deleteMode"
                        avatar>
          <q-btn flat
                 icon="fa-solid fa-trash"
                 size="sm"
                 unelevated
                 @click="onDelete(itemIndex)">
            <q-tooltip>{{ $t('messages.deleteMessage', { item: props.singular.toLowerCase() }) }}</q-tooltip>
          </q-btn>

        </q-item-section>
        <q-item-section>{{ item.summary }}</q-item-section>
        <q-item-section side>
          <q-icon v-if="!deleteMode"
                  color="black"
                  name="fa-solid fa-chevron-right" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div v-else class="q-pa-md text-h6">{{ $t('messages.noItemsFoundMessageInParent', {
    item: props.plural,
    parent: props.parent
  }) }}
  </div>
</template>

<style scoped>

</style>
