import { compileHtmlElement } from '../util/domUtil';
import ClientComponentEndpoint from '../componentLib/ClientComponentEndpoint';

class PathwaysView extends ClientComponentEndpoint {
  createEl() {
    return compileHtmlElement(/*html*/`<div>
      <div data-mount="PathwaysAction" class="flex-column">
      </div>
    </div>`);
  }

  update() {
    
  }
}

export default PathwaysView;