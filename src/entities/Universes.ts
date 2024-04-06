import { Common } from 'src/entities/Common';

export function universes() {
  return new Universes();
}

export class Universes extends Common {
  constructor() {
    super('universes');
  }
}
