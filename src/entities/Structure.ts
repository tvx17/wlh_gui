import { Common } from 'src/entities/Common';

export function structures() {
  return new Structure();

}

export class Structure extends Common {
  constructor() {
    super('structures');
  }
}
