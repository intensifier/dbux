/* eslint-disable camelcase */

import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import size from 'lodash/size';
import groupBy from 'lodash/groupBy';
import allApplications from '@dbux/data/src/applications/allApplications';
import DataDependencyGraph from '@dbux/data/src/ddg/DataDependencyGraph';
import ddgQueries from '@dbux/data/src/ddg/ddgQueries';
import DDGSummaryMode, { isExpandedMode } from '@dbux/data/src/ddg/DDGSummaryMode';
import { isControlGroupTimelineNode } from '@dbux/common/src/types/constants/DDGTimelineNodeType';
import { truncateStringDefault, truncateStringShort } from '@dbux/common/src/util/stringUtil';
import makeTreeItem, { makeTreeChildren, mkTreeItem, makeTreeItems, objectToTreeItems } from '../../helpers/makeTreeItem';
import BaseTreeViewNode from '../../codeUtil/treeView/BaseTreeViewNode';
import { disposeDDGWebviews, getDDGDot } from '../../webViews/ddgWebView';
import { renderStringInNewEditor } from '../../traceDetailsView/valueRender';
// eslint-disable-next-line max-len
import { makeDDGNodeDescription, makeDDGNodeLabel, renderEdges, renderDDGNodesItem, renderNodeTree, renderDDGSummaries, renderDDGNode, renderAccessedRefIdGroups } from '../../treeViewsShared/ddgTreeViewUtil';
import traceSelection from '@dbux/data/src/traceSelection';


/** @typedef {import('@dbux/common/src/types/Trace').default} Trace */

/** ###########################################################################
 * util
 *  #########################################################################*/

function makeArrayLengthLabel(arr, label) {
  return `${label && (label + ' ') || ''}(${arr?.length || 0})`;
}

/** ###########################################################################
 * {@link GlobaDDGNode}
 * ##########################################################################*/

export default class GlobaDDGNode extends BaseTreeViewNode {
  static makeLabel(/*app, parent*/) {
    return `PDGs`;
  }

  allDDGs;

  init() {
    // hook up events
    allApplications.selection.onApplicationsChanged((selectedApps) => {
      this.refresh();
      for (const app of selectedApps) {
        allApplications.selection.subscribe(app.dataProvider.ddgs.onSetChanged(this.refresh));
        allApplications.selection.subscribe(app.dataProvider.ddgs.onGraphUpdate(this.refresh));
      }
    });
    this.#handleRefreshOrInit();
  }

  refresh = () => {
    this.#handleRefreshOrInit();
    this.treeNodeProvider.refreshNode(this);
  };

  #handleRefreshOrInit() {
    /**
     * @type {DataDependencyGraph[]}
     */
    this.allDDGs = allApplications.selection.data.collectGlobalStats((dp) => {
      return dp.ddgs.getAll();
    });
    this.description = `(${this.allDDGs.length})`;
  }

  handleClick() {
    this.treeNodeProvider.refresh();
    // this.refresh();
  }

  buildChildren() {
    if (!this.allDDGs.length) {
      return [makeTreeItem('(no DDG is open)')];
    }
    return this.allDDGs.map((ddg) => {
      const ddgItem = this.buildDDGNode(ddg);
      return ddgItem;
    });
  }

  /**
   * 
   * @param {DataDependencyGraph} ddg 
   */
  buildDDGNode(ddg) {
    const { graphId, og } = ddg;
    const {
      timelineNodes,
      edges: allEdges,
      nodeSummaries
    } = ddg.getRenderData();

    const self = this; // hackfix

    const ddgItem = makeTreeItem(() => ({
      label: graphId,
      children: () => (makeTreeItems(
        function Group_Tree() {
          const root = timelineNodes[1];
          const rootItem = renderNodeTree(ddg, root, {
            predicate: (node) => isControlGroupTimelineNode(node.type),
            propsFactory: (node, children) => {
              const summaryMode = ddg.summaryModes[node.timelineId];
              const expanded = isExpandedMode(summaryMode) ||
                Object.values(children).some(c => c.collapsibleState === TreeItemCollapsibleState.Expanded);
              const cannotExpand = !expanded && !ddgQueries.canNodeExpand(ddg, node);
              const collapsibleState = (expanded) ?
                TreeItemCollapsibleState.Expanded :
                cannotExpand ?
                  TreeItemCollapsibleState.None :
                  TreeItemCollapsibleState.Collapsed;
              return {
                handleClick: () => {
                  ddg.toggleSummaryMode(node.timelineId);
                },
                // collapsibleState: TreeItemCollapsibleState.Expanded
                collapsibleState
              };
            }
          });

          // console.log(`ROOT EXPANDED ${DDGSummaryMode.nameFrom(ddg.summaryModes[1])} ${rootItem.collapsibleState === TreeItemCollapsibleState.Expanded}`);
          return rootItem;
        },

        // function Detailed_Tree() {
        //   const root = timelineNodes[1];
        //   return renderNodeTree(ddg, root);
        // },

        function Visible_Nodes() {
          const visibleNodes = ddgQueries.getAllVisibleNodes(ddg);
          return renderDDGNodesItem(ddg, visibleNodes, 'Visible Nodes');
        },
        function Visible_Edges() {
          const actualEdges = allEdges.filter(Boolean);
          return renderEdges(ddg, actualEdges, 'Visible Edges');
        },

        function All_Nodes() {
          const nodes = timelineNodes.filter(Boolean);
          return renderDDGNodesItem(ddg, nodes, 'All Nodes');
        },
        function All_Edges() {
          const actualEdges = og.edges.filter(Boolean);
          return renderEdges(ddg, actualEdges, 'All Edges');
        },
        function All_In_Edges() {
          return {
            children() {
              return Object.entries(og.inEdgesByTimelineId)
                .map(([nodeId, edgeIds]) => {
                  const edges = edgeIds.map(id => og.edges[id]);
                  return renderEdges(ddg, edges,
                    makeDDGNodeLabel(ddg, nodeId),
                    makeDDGNodeDescription(ddg, timelineNodes[nodeId])
                  );
                });
            },
            props: {
              description: `(${size(og.inEdgesByTimelineId)})`
            }
          };
        },
        function All_Out_Edges() {
          return {
            children() {
              return Object.entries(og.outEdgesByTimelineId)
                .map(([nodeId, edgeIds]) => {
                  const edges = edgeIds.map(id => og.edges[id]);
                  return renderEdges(ddg, edges,
                    makeDDGNodeLabel(ddg, nodeId),
                    makeDDGNodeDescription(ddg, timelineNodes[nodeId])
                  );
                });
            },
            props: {
              description: `(${size(og.outEdgesByTimelineId)})`
            }
          };
        },
        function Node_Summaries() {
          return {
            children() {
              return renderDDGSummaries(ddg, nodeSummaries);
            },
            props: {
              description: `(${size(nodeSummaries)})`
            }
          };
        },
        /** ###########################################################################
         * Summarizable Writes
         * ##########################################################################*/
        function Summarizable_Writes() {
          const { dp } = ddg;
          function makeWriteEntry(timelineNode, props) {
            const { traceId } = dp.util.getDataNode(timelineNode.dataNodeId);
            const { staticTraceId } = dp.util.getTrace(traceId);
            return {
              ...props,
              staticTraceId,
              traceId,
              timelineNode,
              treeItem: renderDDGNode(ddg, timelineNode)
            };
          }
          function makeGroups(prop, allItems) {
            return Object.values(groupBy(allItems, prop))
              .sort((a, b) => a[0][prop] - b[0][prop])
              .map(outerGroup => {
                // TODO: sort by outer staticTraceId
                const innerGroups = Object.values(groupBy(outerGroup, 'staticTraceId'))
                  .sort((a, b) => a.staticTraceId - b.staticTraceId);
                return {
                  [prop]: outerGroup[0][prop],
                  children: () => innerGroups.map(innerItems => {
                    const label = truncateStringShort(dp.util.getStaticTraceDeclarationVarName(innerItems[0].staticTraceId));
                    return mkTreeItem(
                      label,
                      () => innerItems.map(item => item.treeItem),
                      {
                        description: `(${innerItems.length})`,
                        handleClick() {
                          const trace = dp.util.getTrace(innerItems[0].traceId);
                          traceSelection.selectTrace(trace);
                        }
                      }
                    );
                  }),
                  props: {
                    description: `(${outerGroup.length})`
                  },
                  handleClick() {
                    // TODO: get proper click place
                    const trace = dp.util.getTrace(outerGroup[0].traceId);
                    traceSelection.selectTrace(trace);
                  }
                };
              });
          }
          return {
            children() {
              const summarizableNodes = timelineNodes.filter(node => !!node?.hasSummarizableWrites && !!node.dataNodeId);

              // truncateStringShort(dp.util.getStaticTraceDeclarationVarName(group.declarationStaticTraceId)),
              // const summarizableVars = makeGroups(
              //   'declarationStaticTraceId',
              //   summarizableNodes.map(timelineNode => {
              //     const declarationTid = dp.util.getDataNodeAccessedDeclarationTid(timelineNode.dataNodeId);
              //     if (!declarationTid) {
              //       return null;
              //     }
              //     const declarationStaticTraceId = dp.util.getTrace(declarationTid).staticTraceId;
              //     return makeWriteEntry(timelineNode, {
              //       declarationStaticTraceId,
              //       declarationTid,
              //     });
              //   }).filter(Boolean)
              // );

              const getAccessedRefId = timelineNode => dp.util.getDataNodeAccessedRefId(timelineNode.dataNodeId);
              const accessedRefIds = new Set(summarizableNodes.map(getAccessedRefId));
              const accessedRefGroups = renderAccessedRefIdGroups(
                ddg,
                summarizableNodes,
                getAccessedRefId
              );
              const otherRefGroups = renderAccessedRefIdGroups(
                ddg,
                summarizableNodes,
                timelineNode => {
                  const { refId } = dp.util.getDataNode(timelineNode.dataNodeId);
                  if (accessedRefIds.has(refId)) { return null; }
                  return refId;
                }
              );
              return [
                mkTreeItem(
                  'Accessed Refs',
                  accessedRefGroups,
                  {
                    tooltip: 'All PDG nodes capturing access to a property of a reference type object.',
                    description: `(${accessedRefGroups.length})`
                  }
                ),
                mkTreeItem(
                  'Other Refs',
                  otherRefGroups,
                  {
                    tooltip: 'All PDG nodes capturing reference type objects whose properties are never accessed in the entire PDG.',
                    description: `(${otherRefGroups.length})`
                  }
                )
              ];
            }
          };
        },

        /** ###########################################################################
         * DOT
         * ##########################################################################*/
        function Dot() {
          return {
            props: {
              async handleClick() {
                let dot = await getDDGDot(ddg);
                if (!dot) {
                  try {
                    this.treeNodeProvider.refresh();
                  }
                  catch (err) {
                    // ignore err
                  }
                  dot = await getDDGDot();
                }
                if (dot) {
                  await renderStringInNewEditor('dot', dot);
                }
              }
            }
            // children() {
            // }
          };
        }
      )),
      props: {
        /**
         * Used for reveal magic in `revealDDG`.
         */
        ddg,
        collapsibleState: TreeItemCollapsibleState.Expanded
      }
    }));

    return ddgItem;
  }
}