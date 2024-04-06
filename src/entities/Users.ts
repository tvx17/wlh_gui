import { Common } from 'src/entities/Common';

export function users() {
  return new Users();
}

export class Users extends Common {
  constructor() {
    super('users');
  }
  async current() {
return await this.query('SELECT ta.id, ta.summary FROM settings se, users ta WHERE se.key = \'currentBook\' AND se.data = pr.id')
    const returnedData = await this.where({ key: 'currentUser' }).table('settings').returnColumns(['data']).readOne();
    return await this.where({ id: returnedData.data }).table('users').returnColumns(['summary', 'id']).readOne();
  }

  getSexValues() {
//-----------------------------------
  }
}
