import isEmpty from 'lodash/isEmpty';
import ddgQueries, { RenderState } from '@dbux/data/src/ddg/ddgQueries';
import DDGTimelineNodeType, { isControlGroupTimelineNode, isDataTimelineNode, isRepeatedRefTimelineNode } from '@dbux/common/src/types/constants/DDGTimelineNodeType';
import { RootTimelineId } from '@dbux/data/src/ddg/constants';
import EmptyArray from '@dbux/common/src/util/EmptyArray';
import { newLogger } from '@dbux/common/src/log/logger';
import DDGEdgeType from '@dbux/data/src/ddg/DDGEdgeType';
import UniqueRefId from '@dbux/common/src/types/constants/UniqueRefId';
import { makeSummaryLabel } from './ddgDomUtil';
import { truncateStringDefault } from '@dbux/common/src/util/stringUtil';

// eslint-disable-next-line no-unused-vars
const { log, debug, warn, error: logError } = newLogger('DotBuilder');

const Verbose = 1;


/** ###########################################################################
 * Util
 * ##########################################################################*/

/**
 * @see https://stackoverflow.com/a/18750001
 */
function dotEncode(s) {
  return (s + '').replace(/[\u00A0-\u9999<>&|{}()[]/g, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
  // /**
  //  * @see https://stackoverflow.com/a/29482788
  //  */
  // converter.textContent = s;
  // return converter.innerHTML;
}

function fixProp(prop) {
  if (prop.includes(UniqueRefId)) {
    return '{}';
  }
  return prop;
}

/** ###########################################################################
 * Colors
 * ##########################################################################*/

// future-work: use theme colors via CSS vars (to make it prettier + also support light theme)
//    → (see: https://stackoverflow.com/a/56759634)
/**
 * NOTE: colors have RGBA support (e.g. `bg`)
 */
const Colors = {
  bg: '#0000001A',

  /**
   * Default text
   */
  text: 'white',

  edgeText: 'gray',
  line: 'white',
  nodeOutlineDefault: 'white',
  watchedNodeOutline: 'green',
  edge: 'white',
  groupBorder: 'gray',

  groupLabel: 'yellow',
  snapshotSeparator: 'gray',
  snapshotProp: 'gray',

  deleteValue: 'red',
  deleteEdge: 'red',

  value: 'lightblue',
};



export default class DotBuilder {
  _indentLevel;
  fragments = [];

  constructor(doc, renderState) {
    this.doc = doc;
    this.renderState = renderState;
  }

  /** ###########################################################################
   * getters + generators
   * ##########################################################################*/

  get ddg() {
    return this.renderState;
  }

  get root() {
    return this.renderState.timelineNodes?.[RootTimelineId];
  }

  getNode(timelineId) {
    return this.renderState.timelineNodes[timelineId];
  }

  /**
   * @param {DDGTimelineNode} node 
   */
  isRootNode(node) {
    return this.root === node;
  }

  /**
   * @param {DDGTimelineNode} node 
   */
  makeNodeId(node) {
    if (node.parentNodeId) {
      // NOTE: this is required for RefSnapshot structure nodes to be addressable
      return `${node.parentNodeId}:${node.timelineId}`;
    }
    return node.timelineId;
  }

  makeLabel(text) {
    text = truncateStringDefault(text + '');
    return `label="${dotEncode(text)}"`;
  }

  /**
   * NOTE: this is pseudo (not real) HTML
   * @see https://graphviz.org/doc/info/shapes.html#html
   */
  makeLabelHtml(html) {
    return `label=<${html}>`;
  }

  nodeIdAttr(timelineId) {
    return `id=${timelineId}`;
  }

  nodeAttrs(timelineId) {
    return [
      this.nodeIdAttr(timelineId),
      this.nodeOutlineColorAttr(timelineId)
    ]
      .filter(Boolean)
      .join(',');
  }

  nodeOutlineColor(timelineId) {
    const node = this.ddg.timelineNodes[timelineId];
    if (node.watched) {
      return `${Colors.watchedNodeOutline}`;
    }
    return null;
  }


  nodeOutlineColorAttr(timelineId) {
    const node = this.ddg.timelineNodes[timelineId];
    if (node.watched) {
      return `color="${Colors.watchedNodeOutline}"`;
    }
    return '';  // ignore → already taken care of
  }

  /** ###########################################################################
   * indent, lines + fragments
   * ##########################################################################*/

  get indentLevel() {
    return this._indentLevel;
  }

  set indentLevel(val) {
    this._indentLevel = val;
    this.indent = '  '.repeat(this.indentLevel);
  }

  compileFragments() {
    // const extra = this.buildPullDownStructure().join('\n');
    return /* extra + '\n' + */ this.fragments.join('\n');
  }

  fragment = (s) => {
    // Verbose && debug(`fragment`, s);
    this.fragments.push(this.indent + s);
  }

  command = (s) => {
    if (!s) {
      return;
    }
    this.fragment(s + ';');
  }

  label = s => {
    this.command(this.makeLabel(s));
  }

  /** ###########################################################################
   * build
   * ##########################################################################*/

  build() {
    this.indentLevel = 0;
    this.buildRoot();
    return this.compileFragments();
  }

  /**
   * attrs that apply to graph and all subgraphs.
   */
  subgraphAttrs() {
    this.command(`color="${Colors.groupBorder}"`);
    this.command(`fontcolor="${Colors.groupLabel}"`);
  }

  buildRoot() {
    const { root, renderState: { edges } } = this;

    this.fragment('digraph {');
    this.indentLevel += 1;

    // global settings
    this.command(`bgcolor="${Colors.bg}"`);
    this.command(`node[color="${Colors.nodeOutlineDefault}", fontcolor="${Colors.text}"]`);
    // `node [fontsize=9]`,
    this.command(`edge[arrowsize=0.5, arrowhead="open", color="${Colors.edge}", fontcolor="${Colors.edgeText}"]`);
    this.command(`labeljust=l`); // graph/cluster label left justified
    this.subgraphAttrs();

    this.nodesByIds(root.children);

    // NOTE: edges should be placed after all nodes have been defined, else things will not get rendered in the right places/groups
    // const edgeIds = childNodes.flatMap(childNode => outEdgesByTimelineId[childNode.timelineId] || EmptyArray);
    // const edges = edgeIds
    //   .map(edgeId => {
    //     return edges[edgeId];
    //   });
    for (const edge of edges) {
      if (!edge) continue;
      this.edge(edge);
    }

    // extra stuff
    this.buildPullDownStructure();

    this.indentLevel -= 1;

    this.fragment('}');
  }

  nodesByIds(nodeIds) {
    const { timelineNodes } = this.renderState;
    for (const nodeId of nodeIds || EmptyArray) {
      const node = timelineNodes[nodeId];
      this.node(node);
    }
  }

  node(node, force = false) {
    const { ddg } = this;
    const show = force || ddgQueries.isVisible(ddg, node);
    if (ddgQueries.isNodeSummarized(ddg, node)) {
      this.nodeSummary(node);
    }
    else if (show) {
      if (ddgQueries.isExpandedGroupNode(ddg, node)) {
        this.controlGroup(node);
      }
      else if (ddgQueries.isSnapshot(ddg, node)) {
        this.refSnapshotRoot(node);
      }
      else if (ddgQueries.isDeleteNode(ddg, node)) {
        this.deleteNode(node);
      }
      else {
        this.valueNode(node);
      }
      this.addNodeToPullDownStructure(node);
    }
    else if (isControlGroupTimelineNode(node.type)) {
      ddgQueries.isVisible(ddg, node);
      // console.log(`Control group: ${node}, show=${show}, summary=${ddgQueries.getNodeSummaryMode(ddg, node)}`);
      // NOTE: this is to render Watched node inside of hidden groups
      this.nodesByIds(node.children);
    }
  }

  _groupAttrs(node) {
    // const { ddg } = this;
    const { timelineId, label } = node;
    this.command(this.nodeIdAttr(timelineId));
    // this.label(node.label || '');
    // NOTE: mode is hacked in in `decorateNode`

    // const mode = ddgQueries.getNodeSummaryMode(ddg, node);
    // const modeEl = makeSummaryLabel(ddg, mode);
    // ${modeEl}
    this.command(`label="${dotEncode(label) || '()'}"`);
    this.subgraphAttrs();
  }

  controlGroup(node) {
    const { timelineId } = node;

    this.fragment(`subgraph cluster_group_${timelineId} {`);
    this.indentLevel += 1;
    this._groupAttrs(node);

    this.nodesByIds(node.children);

    this.indentLevel -= 1;
    this.fragment(`}`);
  }

  nodeSummary(node) {
    const { ddg } = this;
    if (ddgQueries.doesNodeHaveSummary(ddg, node)) {
      // render summary nodes
      this.summaryGroup(node);
    }
    else {
      // render node as-is
      this.valueNode(node);
    }
  }

  summaryGroup(node) {
    const { ddg } = this;
    const { nodeSummaries } = ddg;

    const summary = nodeSummaries[node.timelineId];
    const roots = ddgQueries.getSummaryRoots(ddg, summary);
    const { timelineId } = node;
    this.fragment(`subgraph cluster_summary_${timelineId} {`);
    this.indentLevel += 1;
    this._groupAttrs(node);

    for (const root of roots) {
      this.node(root, true);
    }

    this.indentLevel -= 1;
    this.fragment(`}`);
  }

  /**
   * A root of a snapshot
   */
  refSnapshotRoot(node, label = null) {
    const { ddg } = this;
    const { timelineId } = node;

    this.fragment(`subgraph cluster_ref_${timelineId} {`);
    this.indentLevel += 1;
    const isNesting = ddgQueries.isNestingSnapshot(ddg, node);
    const color = !isNesting ?
      'transparent' : // no outline
      node.watched ?
        Colors.watchedNodeOutline :
        'gray';
    this.command(`color="${color}"`);
    this.command(`fontcolor="${Colors.groupLabel}"`);
    this.command(this.nodeIdAttr(timelineId));
    this.label(label || '');

    this.snapshotTable(node, !isNesting && node.watched ? Colors.watchedNodeOutline : null);

    this.indentLevel -= 1;
    this.fragment(`}`);
  }

  deleteNode(node) {
    if (!node.varAccess) {
      // this should never happen
      this.valueNode(node, 'red');
    }
    if (node.varAccess) {
      // simple label
      const attrs = [
        this.nodeAttrs(node.timelineId),
        `color="${Colors.deleteValue}"`,
        `fontcolor="${Colors.deleteValue}"`,
        this.makeLabelHtml(`<S>${dotEncode(node.label)}</S>`)
      ].join(',');
      this.command(`${this.makeNodeId(node)} [${attrs}]`);
    }
  }

  valueNode(node, colorOverride) {
    if (node.varAccess || node.value !== node.label) { // hackfix heuristic
      // record
      this.nodeRecord(node);
    }
    else {
      // simple label
      const attrs = [
        this.nodeAttrs(node.timelineId),
        `fontcolor="${colorOverride || Colors.value}"`,
        this.makeLabel(node.label)
      ].join(',');
      this.command(`${this.makeNodeId(node)} [${attrs}]`);
    }
  }

  /**
   * Edge from nested reference DataNode to its own snapshot node.
   */
  snapshotEdge(node) {
    this.snapshotEdgeFromTo(this.makeNodeId(node), node.timelineId);
  }

  snapshotEdgeFromTo(from, to) {
    this.command(`${from} -> ${to} [arrowhead="odot", color="gray"]`);
  }

  edge(edge) {
    const from = this.makeNodeId(this.getNode(edge.from));
    const to = this.makeNodeId(this.getNode(edge.to));
    const colorOverride = edge.type === DDGEdgeType.Delete ? `color=${Colors.deleteEdge}` : '';
    const debugAttrs = Verbose && `${this.makeLabel(edge.edgeId)}` || '';
    const attrs = [
      colorOverride,
      debugAttrs
    ]
      .filter(Boolean)
      .join(',');
    this.command(`${from} -> ${to} [${attrs}]`);
  }

  /** ###########################################################################
   * values, records, tables, structs
   *  #########################################################################*/

  makeNodeValueString(node) {
    if (ddgQueries.isSnapshot(this.ddg, node)) {
      return Array.isArray(node.children) ? '[]' : '{}';
    }
    if (node.value !== undefined) {
      return JSON.stringify(node.value);
    }
    if (isRepeatedRefTimelineNode(node.type)) {
      return node.label;
    }
    if (node.refId) {
      return '📦';  // ref value node but without snapshot
    }
    return node.label || '?';
  }

  // makeRecordEntry(timelineId, label) {
  //   return `<${timelineId}> ${label}`;
  // }

  nodeRecord(node) {
    let { timelineId, label } = node;
    const value = this.makeNodeValueString(node);
    // TODO: use table instead, so we can have key + val rows

    // 5 [label="arr|<6> arr|<7> 0|<8> 1"];
    // const valueItem = this.makeRecordEntry(timelineId, value);
    // const l = this.makeLabel(`${label}|${valueItem}}`);
    const l = `label=<
<TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
  <TR>
    <TD BORDER="1" SIDES="R">${dotEncode(label)}</TD>
    <TD ID="${timelineId}" TITLE="${timelineId}"><FONT COLOR="${Colors.value}">${dotEncode(value)}</FONT></TD>
  </TR>
</TABLE>
>`;
    const attrs = [this.nodeAttrs(node.timelineId), `shape=record`, l].join(',');
    this.command(`${timelineId} [${attrs}]`);
  }

  // /**
  //  * @param {DDGTimelineNode} node 
  //  */
  // snapshotRecord(node) {
  //   let { timelineId, label, children } = node;
  //   // TODO: use table instead, so we can have key + val rows

  //   // 5 [label="arr|<6> arr|<7> 0|<8> 1"];
  //   label ||= 'arr';    // TODO: proper snapshot label (e.g. by first `declarationTid` of `ref`)
  //   const childrenItems = Object.entries(children)
  //     .map(([prop, nodeId]) => this.makeRecordEntry(nodeId, prop));
  //   const l = this.makeLabel(`${label}|${childrenItems.join('|')}`);
  //   this.command(`${timelineId} [${this.nodeIdAttr(timelineId)},${l}]`);
  // }

  /** ###########################################################################
   * snapshotTable
   *  #########################################################################*/

  shouldSummarizeSnapshotChild(node) {
    const { ddg } = this;
    return ddgQueries.isSnapshot(ddg, node) && !node.connected;
  }

  /**
   * Produce snapshot table with prop and value for each entry.
   * @param {DDGTimelineNode} node
   * @see https://graphviz.org/doc/info/shapes.html#html-like-label-examples
   */
  snapshotTable(node, colorOverride) {
    const { ddg, ddg: { timelineNodes } } = this;

    const { timelineId, label, parentNodeId, children } = node;
    const hasLabel = !parentNodeId && label !== undefined;
    const childEntries = Object.entries(children);
    const hasChildren = !!childEntries.length;
    if (!hasChildren) {
      // render empty snapshot as ref data node
      this.nodeRecord(node);
    }
    else {
      // render snapshot
      // this.command(`node [shape=record]`);
      this.command(`node [shape=plaintext]`);
      let attrs = this.nodeIdAttr(timelineId);
      if (colorOverride) {
        attrs += `color=${colorOverride}`;
      }
      const childrenCells = childEntries
        .map(([prop, childId]) => {
          const child = timelineNodes[childId];
          prop = fixProp(prop);
          if (ddgQueries.isDeleteNode(this.ddg, child)) {
            return this.makeSnapshotDeleteCell(childId, prop);
          }
          return this.makeSnapshotCell(childId, prop);
        })
        .join('');
      this.command(`${timelineId} [${attrs},label=<
<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
  <TR>
    ${hasLabel ? `<TD ROWSPAN="2">${dotEncode(label)}</TD>` : ''}
    ${childrenCells}
  </TR>
</TABLE>
>]`);
      // add child snapshots separately
      for (const [prop, childId] of childEntries) {
        const child = timelineNodes[childId];
        if (ddgQueries.isSnapshot(ddg, child)) {
          if (isEmpty(child.children) ||
            !child.connected ||
            Object.values(child.children)
              .every(c => this.shouldSummarizeSnapshotChild(timelineNodes[c]))
          ) {
            // don't add empty snapshots or those that are not connected or don't have any connected children
            continue;
          }

          // add child snapshot
          this.snapshotTable(child);

          // add edge
          this.snapshotEdge(child);
        }
        // // NOTE: remove repeatedNode edges for performance reasons
        // else if (child.repeatedTimelineId) {
        //   const repeatedNode = timelineNodes[child.repeatedTimelineId];
        //   this.snapshotEdgeFromTo(this.makeNodeId(child), this.makeNodeId(repeatedNode));
        // }
      }

      // add snapshot root
      // this.addNodeToPullDownStructure(node);
    }
  }

  /**
   * Build a row of "column" cells containing tables.
   * We do this, so every node's column has a singular addressable PORT.
   */
  makeSnapshotCell(timelineId, prop) {
    const { timelineNodes } = this.renderState;
    const node = timelineNodes[timelineId];
    // hide not-connected snapshot children
    const label = this.shouldSummarizeSnapshotChild(node) ?
      '📦' :
      this.makeNodeValueString(node);
    return `<TD ID="${timelineId}" TITLE="${timelineId}" ROWSPAN="2" PORT="${timelineId}">
      <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
        <TR><TD BORDER="1" SIDES="B" COLOR="${Colors.snapshotSeparator}">\
<FONT COLOR="${Colors.snapshotProp}">${prop}</FONT></TD></TR>
        <TR><TD><FONT COLOR="${Colors.value}">${label}</FONT></TD></TR>
      </TABLE>
    </TD>`;
  }

  /**
   * Build a row of "column" cells containing tables.
   * We do this, so every node's column has a singular addressable PORT.
   */
  makeSnapshotDeleteCell(timelineId, prop) {
    // const { timelineNodes } = this.renderState;
    // const node = timelineNodes[timelineId];
    return `<TD ID="${timelineId}" TITLE="${timelineId}" ROWSPAN="2" PORT="${timelineId}">
      <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
        <TR><TD BORDER="1" COLOR="transparent">\
<FONT COLOR="${Colors.deleteValue}"><S>${prop}</S></FONT></TD></TR>
        <TR><TD><FONT COLOR="${Colors.deleteValue}">&nbsp;</FONT></TD></TR>
      </TABLE>
    </TD>`;
  }

  /** ###########################################################################
   * add a "pull-down" effect, using virtual (hidden) nodes
   * ##########################################################################*/

  pullNodes = [];

  addNodeToPullDownStructure(node) {
    if (!this.ddg.settings.extraVertical) {
      return;
    }
    if (!isControlGroupTimelineNode(node.type)) {
      this.pullNodes.push(node);
    }
  }

  /**
   * Idea: simply add invisible edges between all data-like nodes.
   * NOTE: Edges have a vertical "pull down" effect.
   */
  buildPullDownStructure() {
    if (!this.pullNodes.length) {
      return;
    }

    const vertices = this.pullNodes.map(n => n.timelineId);
    this.command(vertices.join(' -> ') + invisAttrs());
    // this.command(vertices.join(' -> ') + ' [color=blue]');
  }

  // /**
  //  * Old idea:
  //  * s1 -> s2 -> s3;
  //  * 1 -> s1 -> 2 -> s2 -> 3 -> s3;
  //  * 
  //  * Idea2:
  //  * s1 -> s2 -> s3;
  //  * {rank=same; s1, 1};
  //  * {rank=same; s2, 2};
  //  * {rank=same; s3, 3};
  //  */
  // buildPullDownStructure() {
  //   if (!this.pullNodes.length) {
  //     return;
  //   }
  // // ignore in-snapshot nodes
  // this.pullNodes.push(node.timelineId);

  // // place pull node and rank command in same subgraph (else `rank=same` breaks subgraphs)
  // this.command(makePullId(node.timelineId) + invisAttrs());
  // this.command(`{rank=same; ${node.timelineId}, ${makePullId(node.timelineId)}}`);
  //   this.command(
  //     this.pullNodes
  //       .map(id => makePullId(id))
  //       .join(' -> ') + invisAttrs()
  //     // this.pullNodes
  //     //   .map(id => `{rank=same; ${id}, ${makePullId(id)}}`)
  //     // this.pullNodes
  //     //   .flatMap(id => [id, makePullId(id)])
  //     //   .join(' -> ')
  //   );
  // }
}

function invisAttr() {
  return 'style=invis';
}

function invisAttrs() {
  return '[style=invis]';
}

function makePullId(id) {
  return 's' + id;
}
