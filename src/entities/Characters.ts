import { Common } from 'src/entities/Common';

export function characters() {
  return new Characters();
}
export class Characters extends Common {
  constructor() {
    super('characters');
  }
}
