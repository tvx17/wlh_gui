import conn from './../connection';
import helper from './../helper';
import tables from './../tables';
import log from '../../common/log'

const tableName = 'texts';
async function setup(projectId: number, chapterId: number) {
  const exists = await tables.create(
    tableName,
    [
      { notNullable: true, type: 'integer', columnName: 'projectId' },
      { notNullable: true, type: 'string', columnName: 'summary' },
      {notNullable: true, type: 'integer', columnName: 'parentId'},
      { type: 'string', columnName: 'text' },
      { type: 'json', columnName: 'dynamicData' }
    ]);
  if (!exists) {
    return await _initialData(projectId);
  }


}

async function _initialData(projectId: number, chapterId: number) {
  log.message(`Table ${tableName} created. Filling in some initial data...`, 'info');
  const result = await conn.db.insert(
    {
      projectId: projectId,
      summary: 'First Scene',
      parentId: chapterId,
      text: 'This is the first text for the first scene',
      createdAt: helper.dtValue(),
      updatedAt: helper.dtValue()
    }).into(tableName);
  return result[0];
}

export default { setup };
