import { common, settings } from 'src/entities';
import store from 'src/store';
import dialogs from './dialogs';
import notifies from './notifies';
import i18n from 'src/app/i18n'
import { i18n as i18nReference } from 'boot/i18n';

export function createIID(pId = -1) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let id = '';
  for (let i = 0; i < 3; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }
  for (let i = 0; i < 3; i++) {
    id += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return id + (pId !== -1 ? '_' + pId : '');
}

export function getValueFromStore(location: string | string[]) {
  if (typeof location === 'string') {
    return store[location].value;
  } else {
    switch (location.length) {
      case 1:
        return store[location[0]].value;
      case 2:
        return store[location[0]][location[1]].value;
    }
  }
}

export function getValue(source: string, location: string | string[]) {
  switch (source) {
    case 'store':
      return getValueFromStore(location);
  }
}


export async function setDependentItems(type: string, id: number, summary: string) {
  switch (type) {
    case 'books':
      store.currentBookId.value = id;
      store.currentBookSummary.value = summary;
      store.currentChapterId.value = 0;
      store.currentChapterSummary.value = '';
      store.currentSceneId.value = 0;
      store.currentSceneSummary.value = '';
      await settings().set('currentBook', id);
      await settings().set('currentChapter', 0);
      await settings().set('currentScene', 0);
      break;
    case 'chapters':
      store.currentChapterId.value = id;
      store.currentChapterSummary.value = summary;
      store.currentSceneId.value = 0;
      store.currentSceneSummary.value = '';
      await settings().set('currentChapter', id);
      await settings().set('currentScene', 0);
      break;
    case 'scenes':
      store.currentSceneId.value = id;
      store.currentSceneSummary.value = summary;
      await settings().set('currentScene', id);
      break;
  }
}

function _setCurrent(res, currentName) {
  if (res) {
    store[`current${currentName}`]['summary'].value = res.summary;
    store[`current${currentName}`]['id'].value = res.id;
  } else {
    store[`current${currentName}`]['summary'].value = '';
    store[`current${currentName}`]['summary'].value = 0;
  }
}

export async function initApp() {
  await settings().init();

  await settings().getCurrent('projects', 'currentProject').then(res => {
    _setCurrent(res, 'Project');
  });
  await settings().getCurrent('users', 'currentUser').then(res => {
    _setCurrent(res, 'User');
  });
  await settings().getCurrent('books', 'currentBook').then(res => {
    _setCurrent(res, 'Book');
  });
  await settings().getCurrent('chapters', 'currentChapter').then(res => {
    _setCurrent(res, 'Chapter');
  });
  await settings().getCurrent('scenes', 'currentScene').then(res => {
    _setCurrent(res, 'Scene');
  });
  await settings().get('appLanguage', false).then(async res => {
    await i18n.setLocale(res);
    await i18n.load('generic');
    await i18n.load('messages');
    console.log('Done loading i18n messages for locale',res);
  });
}

export function onSave(table: string, id: number, data: object) {
  //--
}

export async function onNew(table: string, title = 'New item', message = 'Please enter a summary', additionalData: object) {
  const newSummary = await dialogs.getString(title, message);
  if (newSummary === '') {
    notifies.negative('No summary entered');
    return;
  }
  const newId = await common(table).create({ ...additionalData, summary: newSummary });
  return { id: newId, summary: newSummary };
}

export async function onDelete(table: string, id: number, itemName: string, title = 'Delete item', message = 'Are you sure you want to delete:') {

  const res = await dialogs.delete(title, message + ': ' + itemName);
  if (res) {
    common(table).delete(id);
  }
  return res;

}



export default {
  createIID, setDependentItems, initApp, getValue, onSave, onNew, onDelete
};
