import { Common } from 'src/entities/Common';
const _file = 'src/entities/Data.ts';

export class Data extends Common {
  constructor() {
    super();
  }

}

export function data() {
  return new Data();

}
