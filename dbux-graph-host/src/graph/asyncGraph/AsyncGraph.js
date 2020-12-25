import NanoEvents from 'nanoevents';
import allApplications from '@dbux/data/src/applications/allApplications';
import { makeContextLabel } from '@dbux/data/src/helpers/contextLabels';
import { makeContextLocLabel } from '@dbux/data/src/helpers/traceLabels';
import KeyedComponentSet from '@dbux/graph-common/src/componentLib/KeyedComponentSet';
import HostComponentEndpoint from '../../componentLib/HostComponentEndpoint';
import ThreadColumn from './ThreadColumn';

/** @typedef {import('@dbux/data/src/applications/Application').default} Application */

class ThreadColumnSet extends KeyedComponentSet {
  makeKey(entry) {
    return `${entry.applicationId}_${entry.threadId}`;
  }
}

class AsyncGraph extends HostComponentEndpoint {
  init() {
    this.state.applications = [];
    this._emitter = new NanoEvents();
    this._unsubscribeOnNewData = [];
    this.threadColumns = new ThreadColumnSet(this, ThreadColumn, { forceUpdate: true });

    this.controllers.createComponent('ZoomBar');
    this.controllers.createComponent('PopperController');

    // register event listeners
    this.addDisposable(
      allApplications.selection.onApplicationsChanged(() => {
        this.refresh();
      })
    );
    this.addDisposable(
      this.context.graphDocument.onAsyncGraphModeChanged(() => {
        this.refresh();
      })
    );

    this.refresh();
  }

  handleRefresh() {
    if (this.context.graphDocument.asyncGraphMode) {
      const app = allApplications.selection.getAll()?.[0];

      if (app) {
        this.buildChildrenColumns(app);
      }

      this._resubscribeOnData();
      this._setApplicationState();
    }
    else {
      this.children.getComponents(ThreadColumn).forEach(comp => comp.dispose());
    }
  }

  /**
   * @param {Application} app 
   */
  buildChildrenColumns(app) {
    const { dataProvider: dp, applicationId } = app;
    const threadIds = dp.indexes.executionContexts.firstsInRunsByThread.getAllKeys();

    const lastRunId = dp.collections.executionContexts.getLast()?.runId;

    this.threadColumns.update(threadIds.map((threadId) => {
      return {
        applicationId,
        threadId,
        nodes: dp.indexes.executionContexts.firstsInRunsByThread.get(threadId).map(context => {
          return {
            displayName: makeContextLabel(context, app),
            locLabel: makeContextLocLabel(applicationId, context),
            context
          };
        }),
        lastRunId
      };
    }));
  }

  _resubscribeOnData() {
    // unsubscribe old
    this._unsubscribeOnNewData?.forEach(f => f());
    this._unsubscribeOnNewData = [];

    // subscribe new
    for (const app of allApplications.selection.getAll()) {
      const { dataProvider } = app;
      const unsubscribe = dataProvider.onData('executionContexts',
        () => {
          this.refresh();
          this._setApplicationState();
        }
      );
      this._unsubscribeOnNewData.push(unsubscribe);
      allApplications.selection.subscribe(unsubscribe);
      this.addDisposable(unsubscribe);
    }
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

  // ###########################################################################
  // own event listener
  // ###########################################################################

  on(eventName, cb) {
    this._emitter.on(eventName, cb);
  }

  // ###########################################################################
  // shared
  // ###########################################################################

  shared() {
    return {
      context: {
        asyncGraph: this
      }
    };
  }
}

export default AsyncGraph;