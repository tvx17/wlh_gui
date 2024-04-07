import { Common } from './Common';

export class I18n extends Common {
  constructor() {
    super();
  }
}

export function i18n() {
  return new I18n();
}
