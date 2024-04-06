import { i18n as i18nReference } from 'boot/i18n';
import { Router } from 'src/router/index';
import { useApp, useEntities } from 'src/WLH';
import { ref } from 'vue';

const { i18n, helper } = useApp();
const { common, settings } = useEntities();


//------------------------------------------------------------------

const dataset = ref<IBasicForm>({ id: 0, summary: '' });
const children = ref(null);
const deleteMode = ref(false);
let _id = 0;
let _table = '';
const configuration = ref({});
const additionalInformationVisible = ref(false);


//------------------------------------------------------------------
async function init(id = 0, table = '', langFiles = [], childrenNames: { singular: string; plural: string; parent: string }) {
  datasetId(id);
  _table = table;
  if (langFiles.length > 0) await language(langFiles);
  if (table !== '') await load();

}

/*function setupStrings(childrenNames: { singular: string; plural: string; parent: string }) {
  childrenStrings.value = {
    childrenInCurrent: i18nReference.global.t(`children.childrenInCurrent`, { child: childrenNames.plural, parent: childrenNames.parent }),
    addTitle: i18nReference.global.t(`children.addChildTitle`, { child: childrenNames.singular.toLowerCase() }),
    deleteTitle: i18nReference.global.t(`children.deleteChildTitle`, { child: childrenNames.singular.toLowerCase() }),
    addMessage: i18nReference.global.t(`children.addChildMessage`, { child: childrenNames.singular.toLowerCase() }),
    deleteMessage: i18nReference.global.t(`children.deleteChildMessage`, { child: childrenNames.singular.toLowerCase() }),
    notFoundMessage: i18nReference.global.t(`children.noChildrenFoundMessage`, { child: childrenNames.plural, parent: childrenNames.parent })
  };
}*/

async function language(files: string | string[]) {
  if (!Array.isArray(files)) {
    files = [files];
  }
  for (const file of files) {
    await i18n.load(file);
  }
}


//------------------------------------------------------------------
function datasetId(id: number | string) {
  if (typeof id === 'string') {
    _id = parseInt(id);
  } else {
    _id = id;
  }
}

//------------------------------------------------------------------
function onSelect(id) {
  Router.push({ name: _table, params: { id: id } });
}

//------------------------------------------------------------------
async function load(id = -1) {
  if (id !== -1) {
    datasetId(id);
  }
  dataset.value = await common(_table).readOneById(_id);
}

export default {
  //childrenStrings,
  onSelect,
  init,
  load,
  language,
  datasetId,
  dataset,
  children,
  entity: configuration,
  deleteMode,
  additionalInformationVisible
};

export function useForm() {
  return {
    //childrenStrings,
    onSelect,
    init,
    load,
    datasetId,
    language,
    dataset,
    children,
    entity: configuration,
    deleteMode,
    additionalInformationVisible
  };
}
