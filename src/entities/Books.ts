import { Common } from './Common';

export class Books extends Common {
  constructor() {
    super('books');
  }

  async current() {
    const returnedData = await this.where({ key: 'currentBook' }).table('settings').returnColumns(['data']).readOne();
    if (returnedData) {
      return await this.where({ id: returnedData.data }).table('books').returnColumns(['summary', 'id']).readOne();
    }
    return undefined;
  }

  async getChapters(bookId: number) {
    return await this.where({ parentId: bookId }).table('chapters').orderBy('order', 'asc').returnColumns(['id', 'summary', 'order']).readAll();
  }

  async addChapter(bookId: number, summary: string, order: number) {
    return await this.table('chapters').create({ parentId: bookId, summary: summary, order: order });
    // --
  }

  async getScenes(bookId: number) {
    return await this.query(`SELECT sc.id, sc.summary
                             FROM SCENES sc,
                                  chapters ch,
                                  books bo
                             WHERE sc.parentId = ch.id
                               AND ch.parentId = bo.id
                               AND bo.id = ${bookId}`, false);
  }
}

export function books() {
  return new Books();
}
