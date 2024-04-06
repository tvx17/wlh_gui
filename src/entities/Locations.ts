import { Common } from 'src/entities/Common';

export function locations() {
  return new Locations();
}
export class Locations extends Common {
  constructor() {
    super('locations');
  }
}
