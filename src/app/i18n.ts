import { api } from 'boot/axios';
import { i18n as i18nReference } from 'boot/i18n';
import { useConstants } from 'src/WLH';

const { app } = useConstants();


const unload = (section: string) => {
  const locale = i18nReference.global.locale.value;
  if (i18nReference.global.messages.value[locale].hasOwnProperty(section)) {
    delete i18nReference.global.messages.value[locale][section];
  }

}
const load = async (section: string) => {
  const promise = new Promise(async(resolve, reject) => {
    const locale = i18nReference.global.locale.value;
    if (i18nReference.global.messages.value[locale].hasOwnProperty(section)) {
      console.log('Section already loaded', section);
      resolve(true);
    }
    if (app.appRunMode === 'desktop') {
      const filePath = `i18n/${i18nReference.global.locale.value}/${section}.json`;
       await api.get(filePath).then((res) => {
        i18nReference.global.messages.value[locale][section] = res.data;
      });
      resolve(true);
    }
  });
  await promise;

};
const setLocale = async (locale: string) => {
  if (!i18nReference.global.availableLocales.includes(locale)) {
    throw new Error('Locale not available');
  }
  if (i18nReference.global.locale.value === locale) {
    console.log('Locale already set', locale);
    return;
  }

  const loadedSections = Object.keys(i18nReference.global.getLocaleMessage(i18nReference.global.locale.value));

  i18nReference.global.locale.value = locale;
  for (const localLocale of i18nReference.global.availableLocales) {
    if (localLocale !== locale) {
      i18nReference.global.setLocaleMessage(localLocale, {});
    }
  }
  for (const section of loadedSections) {
    await load(section);
  }
};

const i18n = {
  setLocale, load, unload
};

export default i18n;

export { i18n, setLocale, load, unload };
