import { Common } from 'src/entities/Common';

export function scenes() {
  return new Scenes();

}


export class Scenes extends Common {
  constructor() {
    super('scenes');
  }

  async current() {
    const returnedData = await this.where({ key: 'currentScene' }).table('settings').returnColumns(['data']).readOne();
    if (returnedData) {
      return await this.where({ id: returnedData.data }).table('scenes').returnColumns(['summary', 'id']).readOne();
    }
    return undefined;
  }

  saveText(id: number, text: string) {
    return this.update({ id: id, text: text });
  }

  async getById(id: number) {
    await this.where({ id: id }).returnColumns(['summary', 'id']).read();
  }
}
