import NanoEvents from 'nanoevents';

class Thread {
  /**
   * @type {number}
   */
  applicationId;
  /**
   * @type {number}
   */
  threadId;
}

export class ThreadSelection {
  constructor() {
    this._emitter = new NanoEvents();
    this.selected = new Set();
    this._isActive = false;
  }

  /**
   * @param {number} applicationId 
   * @param {number[]} threadIds 
   * @param {string} [sender] 
   */
  select(applicationId, threadIds, sender = null) {
    if (applicationId && threadIds) {
      this._isActive = true;
      this.selected.clear();
      threadIds.forEach((threadId) => this._addOne({ applicationId, threadId }));
    }
    else {
      this._isActive = false;
    }
    this._emitSelectionChangedEvent(sender);
  }

  clear(sender = null) {
    this.selected.clear();
    this._isActive = false;
    this._emitSelectionChangedEvent(sender);
  }

  isActive() {
    return this._isActive;
  }

  /**
   * @param {number} applicationId 
   * @param {number} threadId 
   * @returns {boolean}
   */
  isSelected(applicationId, threadId) {
    return this.selected.has(this._makeKey({ applicationId, threadId }));
  }

  isNodeSelected(node) {
    const { applicationId, threadId } = node;
    return this.isSelected(applicationId, threadId);
  }

  _addOne(thread) {
    this.selected.add(this._makeKey(thread));
  }

  _makeKey({ applicationId, threadId }) {
    return `${applicationId}_${threadId}`;
  }

  _emitSelectionChangedEvent(sender = null) {
    this._emitter.emit('selectionChanged', sender);
  }

  onSelectionChanged(cb) {
    return this._emitter.on('selectionChanged', cb);
  }
}

const threadSelection = new ThreadSelection();
export default threadSelection;
