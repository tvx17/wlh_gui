import { useWLH } from 'src/WLH';

const wlh = useWLH();

const _file = 'src/app/entities/Common.ts';

export function common(tableName?: string) {
  return new Common(tableName);
}

interface ICommon {
  _table: string;
  _includeDeleted: boolean;
}

interface IParams {
  where: object;
  orderBy: object;
  limit: number;
  offset: number;
  raw: boolean;
  join: string[];
  returnColumns: string[];
}

export class Common implements ICommon {
  _table: string;
  _includeDeleted: boolean;
  _where: object;
  _orderBy: object[];
  _limit: number;
  _offset: number;
  _raw: boolean;
  _returnColumns: string[];
  _join: string[];
  _softDelete: boolean;

  constructor(tableName?: string) {
    this._table = tableName ? tableName : '';
    this._includeDeleted = false;
    this._where = {};
    this._orderBy = [];
    this._limit = 0;
    this._offset = 0;
    this._raw = false;
    this._returnColumns = [];
    this._join = [];
    this._softDelete = true;
  }

  private _checkTable() {
    if (!this._table) {
      throw new Error('Table name not set');
    }
  }

  private _checkMinRequirements(data: object, isCreation = false) {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided');
    }
    if (!isCreation && !data.hasOwnProperty('id')) {
      throw new Error('No id provided');
    }
    if (isCreation && data.hasOwnProperty('id')) {
      delete data['id'];
    }

    if (!data.hasOwnProperty('summary')) {
      throw new Error('No summary provided');
    }
    if (!data.hasOwnProperty('createdAt')) {
      data['createdAt'] = new Date().toISOString();
    }
    if (!data.hasOwnProperty('updatedAt')) {
      data['updatedAt'] = new Date().toISOString();
    }
    if (!data.hasOwnProperty('deletedAt')) {
      data['deletedAt'] = null;
    }
    if (!data.hasOwnProperty('projectId') && !isCreation) {
      data['projectId'] = wlh.Store.main.currentProjectId.value;
    }
    return data;
  }

  private _removeReactivity(data: object) {
    return JSON.parse(JSON.stringify(data));
  }

  //-----------------------------------------------------------------------------
  public noSoftDelete() {
    this._softDelete = false;
    return this;
  }

  public table(tableName: string) {
    this._table = tableName;
    return this;
  }

  public where(where: object) {
    this._where = where;
    return this;
  }

  public orderBy(column: string, order = 'asc'): any {
    this._orderBy.push({ column: column, order: order });
    return this;
  }

  public limit(limit: number) {
    this._limit = limit;
    return this;
  }

  public offset(offset: number) {
    this._offset = offset;
    return this;
  }

  public raw(raw?: boolean) {
    this._raw = raw ? raw : true;
    return this;
  }

  public returnColumns(columns: string[]) {
    this._returnColumns = columns;
    return this;
  }

  public includeDeleted() {
    this._includeDeleted = true;
    return this;
  }

  public join(leftColumn: string, rightColumn: string, joinTable: string) {
    this._join = [leftColumn, rightColumn, joinTable];
    return this;

  }

//-------------------------------------------------------------------------
  public async specialQuery(type: string, data: number | object) {
    //--
    switch (type) {
      case 'findChaptersByProjectId':
        return await wlh.Entities.projects().getChapters(data);
      case 'findBooksByProjectId':
        return await wlh.Entities.projects().getBooks(data);
      case 'findScenesByProjectId':
        return await wlh.Entities.projects().getScenes(data);
      case 'findScenesByBookId':
        return await wlh.Entities.books().getScenes(data);
      case 'findChaptersByBookId':
        return await wlh.Entities.books().getChapters(data);
      case 'findScenesByChapterId':
        return await wlh.Entities.chapters().getScenes(data);
      case 'findScenesBySceneId':
        return await wlh.Entities.scenes().getById(data);
    }
  }


  public async query(query: string, checkArraySize = true) {
    if (wlh.Constants.app.appRunMode === 'desktop') {
      const res = await window.db.raw(query);
      if (Array.isArray(res) && checkArraySize && res.length === 1) {
        return res[0];
      }
      return res;
    }

  }

  public async count() {
    this._checkTable();
    const res = await window.db.count(this._table, this._where);
    return res;
  }

  public async read() {
    this._checkTable();
    const params: IParams = {
      where: this._where,
      orderBy: this._orderBy,
      limit: this._limit,
      offset: this._offset,
      raw: this._raw,
      join: this._join,
      returnColumns: this._returnColumns
    };

    if (wlh.Constants.app.appRunMode === 'desktop') {
      const res = await window.db.read(this._table, params, this._includeDeleted);
      return res;
    }
  }

  public async readAll() {
    return await this.read();
  }

  public async readOne() {
    //----
    this._limit = 1;
    const res = await this.readAll();
    if (res.length === 1) {
      return res[0];
    }
  }

  public async readOneById(id: number) {
    this._where = { id: id };
    const res = await this.read();
    if (Array.isArray(res) && res.length === 1) {
      return res[0];
    } else {
      return res;
    }
  }

  public async create(data: object) {
    let lastCreatedId = null;
    if (wlh.Constants.app.appRunMode === 'desktop') {

      data = this._checkMinRequirements(data, true);
      lastCreatedId = await window.db.create(this._table, JSON.stringify(data));
    }
    return lastCreatedId;
  }

  public async update(data: { id?: number }) {
    this._checkTable();
    if (Object.keys(this._where).length === 0 && !data.hasOwnProperty('id')) {
      throw new Error('You need to provide a where clause or an id in the data object to update a record.');
    }
    if (Object.keys(this._where).length === 0 && data.hasOwnProperty('id')) {
      this._where = { id: data.id };
      delete data.id;
    }
    if (wlh.Constants.app.appRunMode === 'desktop') {
      await window.db.update(this._table, data, this._where);
    }
  }

  public async updateBulk(data: object[]) {
    if (wlh.Constants.app.appRunMode === 'desktop') {
      await window.db.updateBulk(data);
    }
  }

  async getByParentId(parentId: number) {
    this._where = { parentId: parentId };
    return await this.read();
  }

  public async delete(id?: number) {
    this._checkTable();

    if (id) {
      this._where = { id: id };
    }
    if (Object.keys(this._where).length === 0) {
      throw new Error('You need to provide a where clause or an id to delete a record.');
    }

    if (wlh.Constants.app.appRunMode === 'desktop') {
      await window.db.delete(this._table, this._where, this._softDelete);
    }
    await this.deleteOneById(id);
  }

  public async deleteOneById(id: number) {
    await this.delete(id);
  }

  public deleteAll() {
    //----
  }

  public restoreOneById(id: number) {
    //----
  }

  public restoreAll() {
    //----
  }

  public async remove(id: number) {
    await this.removeOneById(id);
  }

  public async removeOneById(id: number) {
    this._softDelete = false;
    await this.delete(id);
  }


}
