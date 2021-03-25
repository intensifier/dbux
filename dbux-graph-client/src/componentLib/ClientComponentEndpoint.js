import ComponentEndpoint from '@dbux/graph-common/src/componentLib/ComponentEndpoint';
import DOMWrapper from '../dom/DOMWrapper';
import ClientComponentList from './ClientComponentList';

/**
 * The Client endpoint is controlled by the Host endpoint.
 */
class ClientComponentEndpoint extends ComponentEndpoint {
  /**
   * The DOM element visually representing this component instance.
   */
  el;
  isInitialized;
  children = new ClientComponentList(this);
  controllers = new ClientComponentList(this);

  constructor() {
    super();
  }

  get els() {
    return this.dom?.els;
  }

  get isEnabled() {
    return this._enabled;
  }

  /**
   * Use this to create the HTML node to represent this component.
   * 
   * @virtual
   */
  createEl() {
    this.logger.warn(this.debugTag, 'ClientComponentEndpoint did not implement `createEl`');
  }

  /**
   * Use this to process your HTML node, at the end of the initialization phase.
   * 
   * @virtual
   */
  setupEl() {
  }

  init() {
    this.el = this.createEl();

    if (!this.el) {
      throw new Error(`${this.debugTag} \`createEl\` must return a DOM element. If this component has no DOM, make sure to override \`init()\` instead.`);
    }

    // process DOM
    this.dom = new DOMWrapper(this);
    this.dom.init();

    // call event
    this.setupEl();
  }

  forceUpdate() {
    // tell host to update without a state change
    this._remoteInternal.forceUpdate();
  }

  setState(...args) {
    // tell host to setState
    this._remoteInternal.setState(...args);
  }

  // ###########################################################################
  // private methods
  // ###########################################################################

  /**
   * init + update
   */
  _performEnable() {
    this._enabled = true;
    this._performClientInit();
    this._performUpdate();
  }

  _performClientInit(role) {
    this.init();
    this.isInitialized = true;
  }

  _performUpdate() {
    try {
      this.update();
    }
    catch (err) {
      this.logger.warn('Component update failed', err);
      throw err;
    }
  }

  // ###########################################################################
  // render utilities
  // ###########################################################################

  /**
   */
  _repaint = () => {
    this.dom.repaint();
  }

  dispose() {
    super.dispose();

    this.dom?.remove();

    if (this.owner) {
      const list = this.owner._getComponentListByRoleName(this._internalRoleName);
      list._removeComponent(this);
    }
  }

  // ###########################################################################
  // internally used remote commands
  // ###########################################################################

  /**
   * Functions that are called by Host internally.
   */
  _publicInternal = {
    updateClient(state) {
      this.state = state;
      this._performUpdate();
    },
    setEnbaled() {
      if (!this.isEnabled) {
        this._performEnable();
      }
      else {
        this.logger.warn(`Component already enbaled`);
      }
    },

    dispose: this.dispose.bind(this)
  };

  toString() {
    return this.componentName;
  }
}

export default ClientComponentEndpoint;