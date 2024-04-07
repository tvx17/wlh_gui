import { Common } from './Common';

export class Releases extends Common {
  constructor() {
    super();
  }
}

export function releases() {
  return new Releases();
}
