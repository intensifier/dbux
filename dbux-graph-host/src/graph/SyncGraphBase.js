import NanoEvents from 'nanoevents';
import ExecutionContext from '@dbux/common/src/types/ExecutionContext';
import { newLogger } from '@dbux/common/src/log/logger';
import allApplications from '@dbux/data/src/applications/allApplications';
import GraphNodeMode from '@dbux/graph-common/src/shared/GraphNodeMode';
import GraphBase from './GraphBase';
import RunNode from './syncGraph/RunNode';
import ContextNode from './syncGraph/ContextNode';

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('SyncGraphBase');


export class RunNodeMap {
  constructor() {
    this._all = new Map();
  }

  set(applicationId, runId, node) {
    this._all.set(this.makeKey(applicationId, runId), node);
  }

  delete(applicationId, runId) {
    this._all.delete(this.makeKey(applicationId, runId));
  }

  /**
   * @return {RunNode}
   */
  get(applicationId, runId) {
    return this._all.get(this.makeKey(applicationId, runId));
  }

  has(applicationId, runId) {
    return !!this.get(applicationId, runId);
  }

  *getApplicationIds() {
    for (const runNode of this.getAll()) {
      yield runNode.state.applicationId;
    }
  }

  /**
   * @return {RunNode[]}
   */
  getAll() {
    return this._all.values();
  }

  makeKey(appId, runId) {
    return `${appId}_${runId}`;
  }
}

class SyncGraphBase extends GraphBase {
  /**
   * @type {Map<ExecutionContext, ContextNode>}
   */
  contextNodesByContext;

  init() {
    this.contextNodesByContext = new Map();
    this.runNodesById = new RunNodeMap();
    this.state.applications = [];
    this._emitter = new NanoEvents();
    this._unsubscribeOnNewData = [];

    this.controllers.createComponent('GraphNode', {
      mode: GraphNodeMode.ExpandChildren,
      hasChildren: true
    });
    this.controllers.createComponent('ContextNodeManager');
    this.controllers.createComponent('PopperController');
  }

  /** ###########################################################################
   * public interface
   *  #########################################################################*/

  handleRefresh() {
    this.updateRunNodes();
  }

  clear() {
    this.removeAllRunNode();
  }

  updateRunNodes() {
    // oldApps
    const oldAppIds = new Set(this.runNodesById.getApplicationIds());
    const newAppIds = new Set(allApplications.selection.getAll().map(app => app.applicationId));

    // always re-subscribe since applicationSet clears subscribtion everytime it changes
    this._resubscribeOnData();
    this._setApplicationState();

    // remove old runNodes
    for (const runNode of this.runNodesById.getAll()) {
      const { applicationId, runId } = runNode.state;
      if (!newAppIds.has(applicationId)) {
        this.removeRunNode(applicationId, runId);
      }
    }

    // add new runNodes
    for (const appId of newAppIds) {
      if (!oldAppIds.has(appId)) {
        const app = allApplications.getById(appId);
        const allRunIds = app.dataProvider.indexes.executionContexts.byRun.getAllKeys();
        this.addRunNodeByIds(appId, allRunIds);
      }
    }
  }

  _resubscribeOnData() {
    // unsubscribe old
    this._unsubscribeOnNewData.forEach(f => f());
    this._unsubscribeOnNewData = [];

    // subscribe new
    for (const app of allApplications.selection.getAll()) {
      const { dataProvider: dp } = app;
      const unsubscribes = [
        dp.onData('executionContexts',
          this._handleAddExecutionContexts.bind(this, app)
        ),
        // [future-work]: only subscribe when stats are enabled
        dp.queryImpl.statsByContext.subscribe()
      ];

      // unsubscribe on refresh
      this._unsubscribeOnNewData.push(...unsubscribes);

      // also when application is deselected
      allApplications.selection.subscribe(...unsubscribes);

      // also when node is disposed
      this.addDisposable(...unsubscribes);
    }
  }

  _handleAddExecutionContexts = (app, newContexts) => {
    const { applicationId } = app;
    const newRunIds = [...new Set(newContexts.map(c => c.runId))];
    const newNodes = this.addRunNodeByIds(applicationId, newRunIds);
    this._setApplicationState();
    this._emitter.emit('newNode', newNodes);
  }

  _setApplicationState() {
    const update = {
      applications: allApplications.selection.getAll().map(app => ({
        applicationId: app.applicationId,
        entryPointPath: app.entryPointPath,
        name: app.getPreferredName()
      }))
    };
    this.setState(update);
  }

  addRunNodeByIds(applicationId, runIds) {
    return runIds.map(runId => {
      return this.addRunNode(applicationId, runId);
    });
  }

  async focusContext(applicationId, contextId) {
    await this.focusController.focus(applicationId, contextId);
  }

  // ###########################################################################
  // own event listener
  // ###########################################################################

  on(eventName, cb) {
    this._emitter.on(eventName, cb);
  }

  // ###########################################################################
  // run node management
  // ###########################################################################

  addRunNode(applicationId, runId) {
    const newNode = this.children.createComponent(RunNode, { applicationId, runId });
    this.runNodesById.set(applicationId, runId, newNode);
    return newNode;
  }

  removeRunNode(applicationId, runId) {
    const runNode = this.runNodesById.get(applicationId, runId);
    runNode.dispose();
    this.runNodesById.delete(applicationId, runId);
  }

  removeAllRunNode() {
    for (const { state: { applicationId, runId } } of this.getAllRunNode()) {
      this.removeRunNode(applicationId, runId);
    }
  }

  /**
   * @return {RunNode[]}
   */
  getAllRunNode() {
    return this.runNodesById.getAll();
  }

  // ###########################################################################
  // context node management
  // ###########################################################################

  _buildContextNode(parentNode, applicationId, context, isRoot = false) {
    if (this.contextNodesByContext.get(context)) {
      this.logger.warn(`ContextNode with id=${context.contextId} already exist`);
      return null;
    }

    const nodeClass = isRoot ? 'RootContextNode' : 'ContextNode';

    const contextNode = parentNode.children.createComponent(nodeClass, {
      applicationId,
      context
    });

    this.contextNodesByContext.set(context, contextNode);
    contextNode.addDisposable(() => {
      this.contextNodesByContext.delete(context);
    });

    // this.logger.log(`ContextNode created id=${context.contextId}`);
    return contextNode;
  }

  buildContextNodeChildren(contextNode) {
    if (contextNode.childrenBuilt) {
      return contextNode.children.getComponents('ContextNode');
    }

    contextNode.childrenBuilt = true;
    const { applicationId } = contextNode.state;
    return contextNode.getValidChildContexts().map(context => {
      return this._buildContextNode(contextNode, applicationId, context);
    });
  }

  buildContextNode(context) {
    const { applicationId } = context;
    const dp = allApplications.getById(applicationId).dataProvider;
    let currentContext = context;
    let currentNode;
    const contextQueue = [];

    while (!(currentNode = this.contextNodesByContext.get(currentContext))) {
      if (!currentContext) {
        this.logger.error(`Cannot build context node: RootContextNode does not exist. contextQueue=[${contextQueue.map(x => x?.contextId)}]`);
        return null;
      }
      contextQueue.push(currentContext);
      currentContext = dp.collections.executionContexts.getById(currentContext.parentContextId);
    }

    for (const childContext of contextQueue.reverse()) {
      this.buildContextNodeChildren(currentNode);
      currentNode = this.contextNodesByContext.get(childContext);
    }

    return currentNode;
  }

  /**
   *  @return {ContextNode}
   */
  getContextNodeById(applicationId, contextId) {
    const dp = allApplications.getById(applicationId).dataProvider;
    const context = dp.collections.executionContexts.getById(contextId);
    return this.getContextNodeByContext(context);
  }

  /**
   *  @return {ContextNode}
   */
  getContextNodeByContext = (context) => {
    let node = this.contextNodesByContext.get(context);
    if (!context) {
      logError(`Cannot find ContextNode of context ${context}`);
      return null;
    }
    else if (!node) {
      // node not created
      node = this.buildContextNode(context);
    }

    return node;
  }

  _selectContextNode(contextNode) {
    if (this._selectedContextNode && !this._selectedContextNode.isDisposed) {
      // deselect old
      this._selectedContextNode.setSelected(false);
    }

    if (contextNode) {
      // select new
      contextNode.setSelected(true);
    }

    this._selectedContextNode = contextNode;
  }

  shared() {
    return {
      context: {
        graphRoot: this,
      }
    };
  }
}

export default SyncGraphBase;