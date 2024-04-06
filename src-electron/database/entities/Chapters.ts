import conn from './../connection';
import helper from './../helper';
import tables from './../tables';
import log from '../../common/log'

const tableName = 'chapters';

export async function setup(projectId: number, bookId: number) {
  const exists = await tables.create(tableName, [
    {notNullable: true, type: 'integer', columnName: 'projectId'},
    {notNullable: true, type: 'string', columnName: 'summary'},
    {notNullable: true, type: 'integer', columnName: 'parentId'},
    {notNullable: true, type: 'integer', columnName: 'order'},
    {type: 'json', columnName: 'dynamicData'},
  ]);
  if (!exists) {
    return await _initialData(projectId, bookId);
  }

}

async function _initialData(projectId: number, bookId: number) {
  log.message(`Table ${tableName} created. Filling in some initial data...`, 'info');
  const result = await conn.db.insert(
    {
      projectId: projectId,
      summary: 'First Chapter',
      parentId: bookId,
      order: 10,
      createdAt: helper.dtValue(),
      updatedAt: helper.dtValue(),
    }).into(tableName);
  return result[0];
}

export default {setup};
