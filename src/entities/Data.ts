import { api } from 'boot/axios';
import { Common } from 'src/entities/Common';

import { useWLH } from 'src/WLH';

const wlh = useWLH();
//import constants from 'src/constants';
//import { Common } from 'src/entities/Common';
//import { useApp } from 'src/app/useApp';

//const { logging } = useApp();

const _file = 'src/app/entities/Settings.ts';

export function settings() {
  return new Settings();

}

export class Settings extends Common {
  constructor() {
    super('settings');
  }

  async get(key: string, convertJson = true) {
    const res = await this.returnColumns(['data']).where({ key: key }).readOne();
    if (convertJson) {
      return JSON.parse(res.data);
    }
    return res.data;
  }

  async set(key: string, data: any) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    return await this.where({ key: key }).update({ data: JSON.stringify(data) });
  }

  async load(path: string, name: string) {
    const promise = new Promise((resolve, reject) => {

      if (wlh.Constants.app.appRunMode === 'desktop') {
        const filePath = `settings/${path}/${name}.json`;
        api.get(filePath).then((res) => {
          resolve(res.data);
        });
      }
    });
    return await promise;
  }

  async level(level: string): Promise<object[] | null> {
    return await this.load('levels', level);
  }

  async component(component: string) {
    return await this.load('components', component);
  }

  async data(sourceName: string) {
    return await this.load('data', sourceName);
  }

  public async getCurrent(tableName: string, currentName: string) {
    return await this.query(`SELECT tab.id, tab.summary
                             FROM settings se,
                                  ${tableName} tab
                             WHERE se.key = '${currentName}'
                               AND se.data = tab.id`);
  }

  public async init() {
    if (wlh.Constants.app.appRunMode === 'desktop') {
      //wlh.App.logging.message(_file, 'settings->init', 'App in desktop mode, initializing db...');
      await window.db.init();
    }
  }
}
