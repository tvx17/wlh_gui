import store from 'src/store';
import { useWLH } from 'src/WLH';

const wlh = useWLH();

export class Component {
  _type: string;
  _id: string;
  _name: string;
  _data: object;
  _configName: string;
  configuration: object;
  visible: boolean;
  items: any;
  isTopLevel: boolean;
  emits: any;
  selectedIndex: any;
  levelIndex: number;
  deleteMode: boolean;

  /**
   * Constructs a new instance of the class.
   *
   * @param {string} type - The type of the instance.
   * @param {number} levelIndex - The level index of the instance.
   * @param {string} id - The ID of the instance.
   * @param {string} name - The name of the instance.
   * @param {object} data - The data of the instance.
   * @param {string} configName - The configuration name of the instance.
   * @param {boolean} visible - The visibility of the instance.
   * @param {any} emits - The emits value of the instance.
   */
  constructor(type: string, levelIndex: number, id: string, name: string, data: object, configName: string, visible: boolean, emits: any) {
    this._type = type;
    this._id = id;
    this._name = name;
    this._data = data;
    this._configName = configName;
    this.visible = visible;
    this.configuration = {};
    this.isTopLevel = true;
    this.emits = emits;
    this.selectedIndex = -1;
    this.levelIndex = levelIndex;
    this.deleteMode = false;
  }

  async loadConfiguration() {
    this.configuration = await wlh.Entities.settings().component(this._configName);
    await this.loadItems();
  }

  async loadItems() {
    switch (this.configuration.sourceType) {
      case 'json':
        this.items = await wlh.Entities.settings().data(this.configuration.sourceName);
        break;
      case 'database':
        this.items = await wlh.Entities.common(this.configuration.sourceName).returnColumns([...this.configuration.returnColumns]).readAll();
        break;
      default:
        break;
    }
  }

  onSetTopLevel() {
    this.emits('on:setTopLevel', this.levelIndex);
    this.isTopLevel = true;
    this.items[this.selectedIndex].active = false;
  }

  onSelected(itemIndex: number) {
    if (this.selectedIndex !== -1) {
      this.items[this.selectedIndex].active = false;
    }
    this.selectedIndex = itemIndex;
    this.items[itemIndex].active = true;
    const returnData = { index: this.levelIndex + 1, componentId: this._id };
    for (const returnConfig of this.configuration.return) {
      const keyName = returnConfig.keyName;
      const valueName = returnConfig.valueName;
      returnData[keyName] = this.items[itemIndex][valueName];
    }
    if (this.configuration.hasOwnProperty('nextLevel')) {
      returnData['level'] = this.configuration.nextLevel;
    }
    this.emits('on:click', returnData);
    this.isTopLevel = false;
  }

  onAdd() {
    wlh.App.dialogs.getString(this.configuration.texts.addTitle, this.configuration.texts.addMessage).then(newSummary => {
      if (newSummary !== '') {
        const data = { summary: newSummary };
        if (this.configuration.hasOwnProperty('create') && this.configuration.create.hasOwnProperty('additionalColumns')) {
          for (const column of this.configuration.create.additionalColumns) {
            switch (column.sourceType) {
              case 'store':
                if (column.sourceName.length === 1) data[column.keyName] = store[column.sourceName[0]].value;
                if (column.sourceName.length === 2) data[column.keyName] = store[column.sourceName[0]][column.sourceName[1]].value;
                break;
            }
          }
        }
        wlh.Entities.common(this.configuration.sourceName).create(data).then(newId => {
          this.items.push({ id: newId, summary: newSummary });
        });
      }
    });
  }

  onDelete(index: number) {
    wlh.App.dialogs.del(this.configuration.texts.deleteTitle, this.configuration.texts.deleteMessage + this.items[index].summary).then(res => {
      if (res) {
        wlh.Entities.common(this.configuration.sourceName).delete(this.items[index].id).then(() => {
          this.items.splice(index, 1);
        });
      }
    });
  }
}
