import { Common } from './Common';

export function chapters() {
  return new Chapters();
}

export class Chapters extends Common {
  constructor() {
    super('chapters');
  }

  async getFromBookById(bookId: string) {
    return await super.where({ bookId: bookId }).readAll();
  }

  async current() {
    const returnedData = await this.where({ key: 'currentChapter' }).table('settings').returnColumns(['data']).readOne();
    if (returnedData) {
      return await this.where({ id: returnedData.data }).table('chapters').returnColumns(['summary', 'id']).readOne();
    }
    return undefined;
  }

  async getScenes(chapterId: number) {
    return this.query(`SELECT sc.id, sc.summary
                       FROM SCENES sc,
                            chapters ch
                       WHERE sc.parentId = ch.id
                         AND ch.id = ${chapterId}`, false);
  }
}
