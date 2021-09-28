import { window, workspace } from 'vscode';
// import { isPlainObjectOrArrayCategory } from '@dbux/common/src/types/constants/ValueTypeCategory';
import { showInformationMessage } from '../codeUtil/codeModals';

export function valueRender(valueRef, value) {
  let modalString = '';

  // if (valueRef && isPlainObjectOrArrayCategory(valueRef.category)) {
  modalString = JSON.stringify(value);
  // }

  showInformationMessage(`${modalString}`, {
    async 'Open In Editor'() {
      return renderValueAsJsonInEditor(value, null, valueRef);
    }
  }, { modal: true });
}

export async function renderValueAsJsonInEditor(value, comment = null, valueRef = null) {
  let content = JSON.stringify(value, null, 2);

  // hackfix: render multi-line strings a bit better
  // console.log(JSON.stringify('hi\nqwer\\node_modules').replace(/(?<!\\)\\n/g, '" +\n"'))
  content = content.replace(/(?<!\\)\\n/g, '" +\n"');
  // if (valueRef && isPlainObjectOrArrayCategory(valueRef.category)) {
  //   content = JSON.stringify(value);
  // }
  // else {
  //   content = `${value}`;
  // }

  comment = comment ? `// ${comment}\n` : '';
  content = comment + content;

  const doc = await workspace.openTextDocument({ 
    language: 'javascript',
    content
  });
  await window.showTextDocument(doc.uri);
}