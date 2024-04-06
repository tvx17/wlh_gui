// ------------------------------------------------------ App
import * as dialogs from 'src/app/dialogs';
import * as helper from 'src/app/helper';
import * as i18n from 'src/app/i18n';
import * as logging from 'src/app/logging';
import * as notifies from 'src/app/notifies';
// ------------------------------------------------------ Constants
import * as app from 'src/constants/app';
// ------------------------------------------------------ Entities
import { books } from 'src/entities/Books';
import { chapters } from 'src/entities/Chapters';
import { chapterSections } from 'src/entities/ChapterSections';
import { characters } from 'src/entities/Characters';
import { common } from 'src/entities/Common';
import { forms } from 'src/entities/Forms';
import { locations } from 'src/entities/Locations';
import { objects } from 'src/entities/Objects';
import { scenes } from 'src/entities/Scenes';
import { projects } from 'src/entities/Projects';
import { settings } from 'src/entities/Settings';
import { structures } from 'src/entities/Structure';
import { universes } from 'src/entities/Universes';
import { universeSections } from 'src/entities/UniverseSections';
import { users } from 'src/entities/Users';
// ------------------------------------------------------ Store
import * as main from 'src/store';
// ------------------------------------------------------ Supporting
import * as form from 'src/supporting/form';
// ------------------------------------------------------ Vue
import {useRouter, useRoute} from 'vue-router';
// ------------------------------------------------------ Quasar
import {useQuasar} from 'quasar';

export function useSupporting() {
  return {
    form
  };
}


export function useApp() {
  return {
    helper,
    i18n,
    logging,
    notifies,
    dialogs,
  };

};

export function useConstants() {
  return {
    app
  };
}

export function useEntities() {
  return {
    books,
    common,
    scenes,
    chapters,
    chapterSections,
    characters,
    forms,
    locations,
    objects,
    projects,
    settings,
    structures,
    universes,
    universeSections,
    users
  };
}

export function useStore() {
  return { main };
}

// ------------------------------------------------------ WLH
async function init() {
  await helper.initApp()
}


export function useWLH() {
  return {
    init,
    App: {
      helper,
      i18n,
      logging,
      notifies,
      dialogs,
    },
    Constants: { app },
    Entities: {
      books,
      common,
      chapters,
      chapterSections,
      characters,
      scenes,
      forms,
      locations,
      objects,
      projects,
      settings,
      structures,
      universes,
      universeSections,
      users
    },
    Store: { main },
    $r: {router: useRouter(), route: useRoute()},
    $q: useQuasar()
  };
}
