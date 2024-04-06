import { Common } from 'src/entities/Common';

export function universeSections() {
  return new UniverseSections();
}

export class UniverseSections extends Common {
  constructor() {
    super('universe_sections');
  }
}
