import ExecutionContextType from '@dbux/common/src/core/constants/ExecutionContextType';
import { binarySearchByKey } from '@dbux/common/src/util/arrayUtil';
import allApplications from '@dbux/data/src/applications/allApplications';
import traceSelection from '@dbux/data/src/traceSelection';
import UserActionType from '@dbux/data/src/pathways/UserActionType';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import { makeTraceValueLabel, makeTraceLabel, makeContextLocLabel, makeTraceLocLabel } from '@dbux/data/src/helpers/traceLabels';
import { makeContextLabel } from '@dbux/data/src/helpers/contextLabels';
import GraphNodeMode from '@dbux/graph-common/src/shared/GraphNodeMode';
import HostComponentEndpoint from '../componentLib/HostComponentEndpoint';

class ContextNode extends HostComponentEndpoint {
  init(shouldLazyBuild = false) {
    const {
      applicationId,
      context
    } = this.state;

    // get name (and other needed data)
    const app = allApplications.getById(applicationId);
    const dp = app.dataProvider;
    const errorTag = (dp.indexes.traces.errorByContext.get(context.contextId)?.length) ? '🔥' : '';
    this.parentTrace = dp.util.getCallerTraceOfContext(context.contextId);

    this.state.contextNameLabel = makeContextLabel(context, app) + errorTag;
    this.state.contextLocLabel = makeContextLocLabel(applicationId, context);
    this.state.valueLabel = this.parentTrace && makeTraceValueLabel(this.parentTrace) || '';
    this.state.parentTraceNameLabel = this.parentTrace && makeTraceLabel(this.parentTrace) || '';
    this.state.parentTraceLocLabel = this.parentTrace && makeTraceLocLabel(this.parentTrace);

    // register with root
    this.context.graphRoot._contextNodeCreated(this);

    // build sub graph
    let hasChildren;
    if (shouldLazyBuild) {
      hasChildren = !!this.getValidChildContexts().length;
    }
    else {
      this.buildChildNodes();
      hasChildren = !!this.children.getComponents('ContextNode').length;
    }

    // add controllers
    this.controllers.createComponent('GraphNode', { hasChildren, shouldLazyBuild });
    this.controllers.createComponent('PopperController');
    this.controllers.createComponent('Highlighter');
  }

  get firstTrace() {
    const { applicationId, context: { contextId } } = this.state;
    const { dataProvider } = allApplications.getById(applicationId);
    return dataProvider.util.getFirstTraceOfContext(contextId);
  }

  buildChildNodes() {
    const { applicationId } = this.state;
    this.getValidChildContexts().forEach(context => {
      this.children.createComponent('ContextNode', {
        applicationId,
        context
      });
    });
  }

  getValidChildContexts() {
    const { applicationId, context: { contextId } } = this.state;
    const dp = allApplications.getById(applicationId).dataProvider;
    const childContexts = dp.indexes.executionContexts.children.get(contextId) || EmptyArray;
    return childContexts.filter(childContext => {
      if (dp.util.isFirstContextOfRun(childContext.contextId)) {
        return false;
      }

      if (ExecutionContextType.is.Await(childContext.contextType)) {
        return false;
      }

      return true;
    });
  }

  async reveal(expandItself = false) {
    await this.controllers.getComponent('GraphNode').reveal(expandItself);
  }

  expand() {
    this.controllers.getComponent('GraphNode').setOwnMode(GraphNodeMode.ExpandChildren);
  }

  setSelected(isSelected) {
    const selectedTrace = traceSelection.selected;
    let traceId = null;
    let isSelectedTraceCallRelated = false;
    let contextIdOfSelectedCallTrace = null;
    // if selected trace is call related, returns the contextId of this call
    if (selectedTrace) {
      traceId = selectedTrace.traceId;
      const { applicationId } = this.state;
      const dp = allApplications.getById(applicationId).dataProvider;
      const callId = dp.util.getCallerTraceOfTrace(traceId)?.traceId;
      const child = dp.indexes.executionContexts.byCalleeTrace.get(callId);
      isSelectedTraceCallRelated = !!callId;
      contextIdOfSelectedCallTrace = child && child[0].contextId;
    }
    if (isSelected) {
      this.expand();
    }
    this.setState({ isSelected, traceId, isSelectedTraceCallRelated, contextIdOfSelectedCallTrace });
  }

  isHiddenBy() {
    return this.context.runNode.isHiddenBy();
  }

  public = {
    async goToFirstTrace() {
      await this.componentManager.externals.goToTrace(this.firstTrace);
    },
    async goToParentTrace() {
      if (this.parentTrace) {
        await this.componentManager.externals.goToTrace(this.parentTrace);
      }
    },
    selectFirstTrace() {
      this.componentManager.externals.emitCallGraphAction(UserActionType.CallGraphTrace, { trace: this.firstTrace });
      traceSelection.selectTrace(this.firstTrace);
    },
    selectParentTrace() {
      if (this.parentTrace) {
        this.componentManager.externals.emitCallGraphAction(UserActionType.CallGraphCallTrace, { trace: this.parentTrace });
        traceSelection.selectTrace(this.parentTrace);
      }
    },
    toggleStaticContextHighlight() {
      const { applicationId, context: { staticContextId } } = this.state;
      const contextNodeManager = this.context.graphRoot.controllers.getComponent('ContextNodeManager');
      contextNodeManager.toggleStaticContextHighlight(applicationId, staticContextId);
    },
    async selectPreviousContextByStaticContext() {
      const { applicationId, context } = this.state;
      const dp = allApplications.getById(applicationId).dataProvider;
      const contexts = dp.indexes.executionContexts.byStaticContext.get(context.staticContextId) || EmptyArray;
      const index = binarySearchByKey(contexts, context, (x) => x.contextId);
      if (index !== 0) {
        const { contextId } = contexts[index - 1];
        await this.context.graphRoot.focusContext(applicationId, contextId);
      }
      else {
        this.componentManager.externals.alert('This is the first context of staticContext', false);
      }
    },
    async selectNextContextByStaticContext() {
      const { applicationId, context } = this.state;
      const dp = allApplications.getById(applicationId).dataProvider;
      const contexts = dp.indexes.executionContexts.byStaticContext.get(context.staticContextId) || EmptyArray;
      const index = binarySearchByKey(contexts, context, (x) => x.contextId);
      if (index !== contexts.length - 1) {
        const { contextId } = contexts[index + 1];
        await this.context.graphRoot.focusContext(applicationId, contextId);
      }
      else {
        this.componentManager.externals.alert('This is the last context of staticContext', false);
      }
    }
  }
}

export default ContextNode;