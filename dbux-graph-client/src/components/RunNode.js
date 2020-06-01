import ClientComponentEndpoint from '../componentLib/ClientComponentEndpoint';
import { compileHtmlElement } from '../util/domUtil';

class RunNode extends ClientComponentEndpoint {
  createEl() {
    const el = compileHtmlElement(/*html*/`
      <div class="run-node new width-fit">
        <div class="run-node-content">
          <div data-el="nodeChildren" data-mount="ContextNode" class="node-children flex-column"></div>
        </div>
      </div>
    `);

    return el;
  }

  setupEl() {
    // this.el.addEventListener('animationend', () => {
    // const createdAt = ?;
    // const remainingAnimTime = Date.now() - createdAt;
    const remainingAnimTime = 10 * 1000;
    setTimeout(() => {
      // "new" animation has finished -> remove class
      this.el.classList.remove('new');
    }, remainingAnimTime);
  }
  
  update() {
    const { applicationId, runId } = this.state;
    // this.els.title.textContent = `Run #${runId} (Application #${applicationId})`;
  }
}

export default RunNode;