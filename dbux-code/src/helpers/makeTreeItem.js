import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import map from 'lodash/map';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import size from 'lodash/size';

/**
 * Use:
 * ```js
makeTreeItem('Debug', [
  [
    '1', [
      '1.1'
    ]
  ],
  [
    '2', [
      '2.1',
      [
        '2.2', [
          '2.2.1',
          '2.2.2'
        ]
      ],
      '2.3'
    ]
  ]
])
 * ```
 */

// class TreeChildNode {
//   constructor(value, cfg) {
//     this.value = value;
//     this.cfg = cfg;
//   }
// }

function arrayToTreeItems(arr) {
  return arr.map((value, i) => makeChildNode(i, value)); //makeTreeItem(child));
}

function objectToTreeItems(obj) {
  return map(obj, (value, key) => makeChildNode(key, value)
  );
}

function keyValueLabel(key, value) {
  return `${key}: ${JSON.stringify(value)}`;
}

function makeChildNode(key, value) {
  if (value instanceof TreeItem) {
    return value;
    // return makeTreeItem(value);
  }
  // if (value instanceof TreeChildNode) {

  // }
  // if (isFunction(value)) {
  //   return makeTreeItem(value(key));
  // }
  // if (Array.isArray(value)) {
  //   return makeTreeItem(key, value);
  // }
  if (isFunction(value)) {
    return makeTreeItem(value);
  }
  if (isObject(value)) { // implies isPlainObject, isArray, isFunction
    return makeTreeItem(key, value);
  }

  return makeTreeItem(keyValueLabel(key, value));
}

export function makeTreeChildren(obj) {
  return Array.isArray(obj) ?
    arrayToTreeItems(obj) :    // array
    objectToTreeItems(obj);    // object
}

/** ###########################################################################
 * {@link makeTreeItem}
 * ##########################################################################*/

// /**
//  * NOTE: use `{ myLabel: makeTreeItem('myLabel', ...) }` instead.
//  * future-work: use this, so as to not repeat `label`. 
//  */
// export function makeTreeChild(value, itemProps) {
// }

/**
 * TODO: Replace this with `makeTreeViewItem`, rename this to `makeTreeItemSimple`.
 */
export default function makeTreeItem(labelOrArrOrItem, childrenOrCfg, itemProps) {
  let label;
  let item;
  let children;

  // if (isFunction(children)) {
  //   children = children();
  // }

  if (isFunction(labelOrArrOrItem)) {
    label = (labelOrArrOrItem.name || '').replace(/[_]/g, ' ');
    labelOrArrOrItem = labelOrArrOrItem();
    ({
      children,
      props: itemProps
    } = labelOrArrOrItem);
  }
  else {
    if (Array.isArray(labelOrArrOrItem)) {
      // if (!labelOrArrOrItem.length || labelOrArrOrItem[0] instanceof TreeItem) {
      //   // NOTE: if there is only an array of children, we would be missing the label -> wrap in `makeTreeItem` instead
      //   /**
      //    * `children` is array of `TreeItem`.
      //    * Don't do anything: will be handled in {@link makeTreeChildren}
      //    */
      // }
      // else {
      // array represents a single node
      [label, childrenOrCfg, itemProps] = labelOrArrOrItem;
      // }
    }
    else {
      label = labelOrArrOrItem;
    }

    if (Array.isArray(childrenOrCfg)) {
      children = childrenOrCfg;
    }
    else {
      if (isFunction(childrenOrCfg)) {
        childrenOrCfg = childrenOrCfg();
      }
      // if (childrenOrCfg?.children && !itemProps && size(childrenOrCfg) <= 2) {
      //   // hackfix: since we allow arbitrary objects to also represent `children`, 
      //   //      we need to use heuristics to distinguish between config and unstructured.
      //   ({
      //     children,
      //     props: itemProps
      //   } = childrenOrCfg);
      // }
      // else {
      children = childrenOrCfg;
      // }
    }
  }

  const hasChildren = children && !isEmpty(children);
  let collapsibleState;
  if (hasChildren) {
    collapsibleState = TreeItemCollapsibleState.Expanded;
  }
  else {
    collapsibleState = TreeItemCollapsibleState.None;
  }

  if (label instanceof TreeItem) {
    item = label;
  }
  else {
    label = ('' + label); // coerce to string (else it won't show up)

    if (!hasChildren && !isString(labelOrArrOrItem)) {
      label = keyValueLabel(label, children);
    }
    item = new TreeItem(label, collapsibleState);
  }

  if (hasChildren) {
    item.children = makeTreeChildren(children);
  }
  if (itemProps) {
    Object.assign(item, itemProps);
  }
  return item;
}

/**
 * 
 */
export function makeTreeItems(...configs) {
  return configs.map(cfg => makeTreeItem(cfg));
}
