import { newLogger } from '@dbux/common/src/log/logger';
import { getDefaultClient } from '../client/index';

/**
 * dbux-runtime implementation of collection.
 * (responsible for sending data)
 */
export default class Collection {
  _all = [null];

  constructor(name) {
    if (!name) {
      throw new Error(`Collection did not provide name to ctor - ${this.constructor.name}`);
    }
    this._name = name;
    this.logger = newLogger(`${name} Collection`);
  }

  push(entry) {
    entry._id = this._all.length;
    this._all.push(entry);
  }

  getAll() {
    return this._all;
  }

  getAllActual(startId = 1) {
    return this._all.slice(startId);
  }

  getById(id) {
    return this._all[id];
  }

  /**
   * 
   */
  _send(newEntry) {
    const client = getDefaultClient();
    client.send(this._name, newEntry);
  }

  /**
   * 
   */
  _sendAll(newEntry) {
    const client = getDefaultClient();
    client.sendAll(this._name, newEntry);
  }
}