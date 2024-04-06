import { Common } from 'src/entities/Common';


export function objects() {
  return new Objects();

}
export class Objects extends Common {
  constructor() {
    super('objects');
  }
}
