import {ref} from "vue";

export const currentProject = {
  id: ref<number>(0),
  summary: ref<string>('')
}
export const currentBook = {
  id: ref<number>(0),
  summary: ref<string>('')
}
export const currentChapter = {
  id: ref<number>(0),
  summary: ref<string>('')
}
export const currentScene = {
  id: ref<number>(0),
  summary: ref<string>('')
}

export const currentUser ={
  id: ref<number>(0),
  summary: ref<string>('')
}

export const use = {
  universes: ref<boolean>(false),
  universeSections: ref<boolean>(false)
};

export const activeLevel = ref(1)
export const layoutType = ref('appLayout')

export default {
  layoutType,
  activeLevel,
  currentProject,
  currentBook,
  currentChapter,
  currentScene,
  currentUser,
  use
};
