import { api } from 'src/boot/axios';
import { Common } from 'src/entities/Common';

import { useWLH } from 'src/WLH';

const wlh = useWLH();

const _file = 'src/entities/Application.ts';

export class Application extends Common {
  constructor() {
    super();
  }

  public async getRelease() {
    //--
    const data = await api.get('releases/releases.json');
    return data.data;
  }

  public async getBuildData() {
    const data = await api.get('releases/build.json');
    return data.data;
  }

  public async getReleaseNotes(releaseVersion: string) {
    const data = await api.get(`releases/${releaseVersion}.json`);
    return data.data;
  }

  public async init() {
    if (wlh.Constants.app.appRunMode === 'desktop') {
      //wlh.App.logging.message(_file, 'settings->init', 'App in desktop mode, initializing db...');
      await window.db.init();
    }
  }
}

export function application() {
  return new Application();
}
