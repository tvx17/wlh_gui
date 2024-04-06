<script lang="ts" setup>
import helper from 'src/app/helper';
import { useWLH } from 'src/WLH';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();
const wlh = useWLH();

const props = defineProps(
  {
    title: {
      type: String,
      required: false,
      default: 'Items'
    },
    sourceType: {
      type: String,
      required: true
    },
    selectedValue: {
      type: Number,
      default: -1
    },
    sourceName: {
      type: String,
      required: true
    },
    minCount: {
      type: Number,
      default: 0
    },
    selectField: {
      type: Boolean,
      default: false
    },
    singular: {
      type: String,
      default: 'Item'
    },
    plural: {
      type: String,
      default: 'Items'
    },
    creationColumns: {
      type: Object,
      default: () => ({})
    },
    filterOptions: {
      type: Array,
      default: () => ([]),
      required: false
    }
  });

const emit = defineEmits(['on:select']);


const items = ref(null);
const isTopLevel = ref(true);
const deleteMode = ref(false);
const selectedIndex = ref(-1);
let _filterOptions = props.filterOptions;


const filter = {
  options: {
    '0': ref(),
    '1': ref(),
    '2': ref()
  },
  values: {
    '0': ref(''),
    '1': ref(),
    '2': ref()
  }
};


const onFilterChanged = async (filterNumber: number) => {

  if (filterNumber > 0) {
    for (let i = filterNumber; i < _filterOptions.length; i++) {
      filter.options[i.toString()].value = null;
      filter.values[i.toString()].value = '';
    }
    wlh.Entities.common().specialQuery(_filterOptions[filterNumber - 1].queryName, filter.values[(filterNumber - 1).toString()].value).then(res => {
      items.value = res;
    });
  }


  if (filterNumber >= _filterOptions.length) {
    return;
  }
  if (!_filterOptions[filterNumber].hasOwnProperty('valueColumn')) _filterOptions[filterNumber].valueColumn = 'id';
  if (!_filterOptions[filterNumber].hasOwnProperty('optionColumn')) _filterOptions[filterNumber].optionColumn = 'summary';
  filter.values[filterNumber.toString()].value = '';
  if (filterNumber === 0) {
    wlh.Entities.common(_filterOptions[filterNumber].table).returnColumns(['id', 'summary']).read().then(res => {
      filter.options[filterNumber.toString()].value = res;
    });
  } else {
    let where = {};
    if (!_filterOptions[filterNumber].hasOwnProperty('where')) {
      where['id'] = filter.values[(filterNumber - 1).toString()].value;
    } else {
      where[_filterOptions[filterNumber].where] = filter.values[(filterNumber - 1).toString()].value;
    }
    wlh.Entities.common(_filterOptions[filterNumber].table).where(where).returnColumns(['id', 'summary']).read().then(res => {
      filter.options[filterNumber.toString()].value = res.length > 0 ? res : null;
    });
  }


};


const onSelected = (index) => {
  if (typeof index === 'string') {
    index = parseInt(index);
  }
  if (selectedIndex.value !== -1) {
    items.value[selectedIndex.value].active = false;
  }
  items.value[index].active = true;
  selectedIndex.value = index;
  emit('on:select', items.value[index].id);
};

const onDelete = async (index) => {
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

const onAdd = async () => {
  const res = await helper.onNew(
    props.table,
    t('messages.addTitle', { item: props.singular.toLowerCase() }),
    t('messages.addMessage', { item: props.singular.toLowerCase() }),
    { [props.relationshipColumn]: props.parentId });
  items.value.push(res);
};

onMounted(async () => {
  items.value = await wlh.Entities.common(props.sourceName).returnColumns(['id', 'summary']).read();
  if (props.selectedValue !== -1 && props.selectedValue !== '') {
    //TODO: Check if there maybe a faster solution to find the values
    items.value.forEach((item, index) => {
      if (item.id === parseInt(props.selectedValue)) {
        onSelected(index);
      }
    });
  }
  if (props.filterOptions.length > 0) {
    onFilterChanged(0);
  }
  await wlh.App.i18n.load('messages');
});
</script>

<template>
  <div v-if="items">
    <q-bar>
      <span class="text-weight-bolder">{{ props.title }}</span>
      <q-space />
      <q-btn v-if="!deleteMode" dense flat icon="add" @click="onAdd">
        <q-tooltip>{{ $t('messages.addTitle', { item: props.singular.toLowerCase() }) }}</q-tooltip>
      </q-btn>
      <q-btn v-if="items.length > props.minCount"
             :text-color="!deleteMode ? 'black' : 'red'"
             dense
             flat
             icon="delete"
             @click="deleteMode = !deleteMode">
        <q-tooltip>{{ $t('messages.deleteTitle', { item: props.singular.toLowerCase() }) }}</q-tooltip>
      </q-btn>
    </q-bar>
    <div v-if="props.filterOptions.length > 0">
      <div v-for="filterNumber in 3"
           :key="filterNumber">
        <q-select v-if="filter.options[(filterNumber-1).toString()].value"
                  v-model="filter.values[(filterNumber-1).toString()].value"
                  :label="props.filterOptions[(filterNumber-1).toString()].hasOwnProperty('label') ? props.filterOptions[(filterNumber-1).toString()].label : 'Filter'"
                  :option-label="_filterOptions[(filterNumber-1).toString()].optionColumn"
                  :option-value="_filterOptions[(filterNumber-1).toString()].valueColumn"
                  :options="filter.options[(filterNumber-1).toString()].value"
                  class="q-ml-sm"
                  clearable
                  dense
                  emit-value
                  map-options
                  @update:model-value="onFilterChanged(filterNumber)" />
      </div>
      <q-separator />
      <br />
    </div>
    <q-list dense separator>
      <q-item
        v-for="(item, itemIndex) in items"
        :key="item.id"
        :active="item.active"
        :clickable="!deleteMode"
        @click="onSelected(itemIndex)">
        <q-item-section v-if="deleteMode" avatar>
          <q-btn v-if="items.length > props.minCount" flat icon="fa-solid fa-trash" size="sm" unelevated
                 @click="onDelete(itemIndex)">
            <q-tooltip>{{ $t('messages.deleteTitle', { item: props.singular.toLowerCase() }) }}</q-tooltip>
          </q-btn>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.summary }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="!deleteMode" side>
          <q-icon v-if="!item.active" color="black" name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style scoped>

</style>
