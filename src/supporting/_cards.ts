import { settings } from 'src/entities';
import store from 'src/store';
import { ref } from 'vue';

const showDialog = ref(false);
const destination = ref('');
const minDatasets = ref(0);
const table = ref('');


function onShowDialog(data: object) {
  destination.value = data.destination;
  minDatasets.value = data.minDatasets;
  table.value = data.table;

  showDialog.value = true;
}

function unsetItem(type: string) {
  switch (type) {
    case 'books':
      store.currentBookId.value = 0;
      store.currentBookSummary.value = '';
      store.currentChapterId.value = 0;
      store.currentChapterSummary.value = '';
      store.currentSceneId.value = 0;
      store.currentSceneSummary.value = '';
      settings().set('currentBook', 0);
      settings().set('currentChapter', 0);
      settings().set('currentScene', 0);
      break;
    case 'chapters':
      store.currentChapterId.value = 0;
      store.currentChapterSummary.value = '';
      store.currentSceneId.value = 0;
      store.currentSceneSummary.value = '';
      settings().set('currentChapter', 0);
      settings().set('currentScene', 0);
      break;
    case 'scenes':
      store.currentSceneId.value = 0;
      store.currentSceneSummary.value = '';
      settings().set('currentScene', 0);
      break;
  }
}

function setItem(data) {
  switch (data.type) {
    case 'books':
      store.currentBookId.value = data.id;
      store.currentBookSummary.value = data.summary;
      settings().set('currentBook', data.id);
      break;
    case 'chapters':
      store.currentChapterId.value = data.id;
      store.currentChapterSummary.value = data.summary;
      settings().set('currentChapter', data.id);
      break;
    case 'scenes':
      store.currentSceneId.value = data.id;
      store.currentSceneSummary.value = data.summary;
      settings().set('currentScene', data.id);
      break;
    case 'projects':
      store.currentProjectId.value = data.id;
      store.currentProjectSummary.value = data.summary;
      settings().set('currentProject', data.id);
      break;
    case 'users':
      store.currentUserId.value = data.id;
      store.currentUserSummary.value = data.summary;
      settings().set('currentProject', data.id);
      break;
  }
}

export function useCards() {
  return {
    destination,
    minDatasets,
    table,
    showDialog,
    onShowDialog,
    unsetItem,
    setItem
  };
}
