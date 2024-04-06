import { Common } from 'src/entities/Common';

export function forms() {
  return new Forms();
}
export class Forms extends Common {
  constructor() {
    super('forms');
  }
}
