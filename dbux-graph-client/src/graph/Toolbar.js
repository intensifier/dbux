import ThemeMode from '@dbux/graph-common/src/shared/ThemeMode';
import GraphType, { getGraphTypeDisplayName } from '@dbux/graph-common/src/shared/GraphType';
import { compileHtmlElement, decorateClasses, decorateAttr } from '../util/domUtil';
import ClientComponentEndpoint from '../componentLib/ClientComponentEndpoint';

let documentClickHandler;

class Toolbar extends ClientComponentEndpoint {
  createEl() {
    return compileHtmlElement(/*html*/`
      <nav class="navbar sticky-top navbar-expand-lg no-padding" id="toolbar">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <button title="Stop recording: Do not add new runs/traces" data-el="hideNewRunBtn" class="btn btn-info" href="#"></button>
          <button title="Clear: Hide all existing runs/traces" data-el="hideOldRunBtn" class="btn btn-info" href="#">x</button>
          <button title="Sync and always lock onto selected trace" data-el="followModeBtn" class="btn btn-info" href="#">follow</button>
          <button title="Show location of context (function declaration or start of file)" data-el="locModeBtn" class="btn btn-info" href="#">loc</button>
          <button title="Show caller (call trace) of function call" data-el="callModeBtn" class="btn btn-info" href="#">call</button>
          <button title="Show arguments and return value of function call in the form of: (args) -> returnValue" data-el="valueModeBtn" class="btn btn-info" href="#">val</button>
          <button title="Thin mode" data-el="thinModeBtn" class="no-horizontal-padding btn btn-info" href="#"></button>
          <button title="Search for contexts by name" data-el="searchContextsBtn" class="btn btn-info" href="#">🔍</button>
          <button title="Search for traces by name" data-el="searchTracesBtn" class="btn btn-info" href="#">🔍+</button>
          <button title="Toggle Async Graph Mode" data-el="graphModeBtn" class="btn btn-info" href="#">async</button>
          <button title="Toggle Async Stack" data-el="asyncStackBtn" class="btn btn-info" href="#">stack</button>
          <button title="Toggle Async Detail" data-el="asyncDetailModeBtn" class="btn btn-info" href="#">detail</button>
          <button title="Clear Thread Selection" data-el="clearThreadSelectionBtn" class="btn btn-info" href="#">
            <img width="12px" src="${this.state.theradSelectionIconUri}" />
          </button>
        </div>
        <div data-el="moreMenu" class="dropdown">
          <button data-el="moreMenuBtn" class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ☰
          </button>
          <div data-el="moreMenuBody" class="dropdown-menu" 
          style="left: inherit; right: 0; min-width: 0;"
          aria-labelledby="dropdownMenuButton">
            <!--button data-el="showIdsBtn" class="btn btn-info full-width" href="#">ids</button-->
            <div class="dropdown-divider"></div>
            <button title="Restart the Webview (can eliviate some bugs)" data-el="restartBtn" class="btn btn-danger full-width" href="#">Restart</button>
          </div>
        </div>
      </nav>
    `);
  }

  setupEl() {
    this.dropDownOpen = false;
    if (documentClickHandler) {
      document.removeEventListener('click', documentClickHandler);
    }
    document.addEventListener('click', documentClickHandler = this._onDocumentClick);
  }

  _onDocumentClick = (evt) => {
    const btn = this.els.moreMenuBtn;
    if (evt.target !== btn && this.dropDownOpen) {
      this.toggleMenu();
    }
  };

  toggleMenu() {
    this.dropDownOpen = !this.dropDownOpen;
    if (this.dropDownOpen) {
      this.els.moreMenuBody.style.display = 'inherit';
    }
    else {
      this.els.moreMenuBody.style.display = 'none';
    }
  }

  // ###########################################################################
  // update
  // ###########################################################################

  update = () => {
    this.decorateButtons();
    this.renderModes();
  }

  decorateButtons() {
    const {
      followMode,
      locMode,
      callMode,
      valueMode,
      thinMode,
      hideBefore,
      hideAfter,
      searchTermContexts,
      searchTermTraces,
      graphMode,
      stackEnabled,
      asyncDetailMode,
    } = this.parent.state;

    const {
      isThreadSelectionActive
    } = this.state;

    const themeModeName = ThemeMode.getName(this.context.themeMode).toLowerCase();

    decorateClasses(this.els.followModeBtn, {
      active: followMode
    });
    decorateClasses(this.els.locModeBtn, {
      active: locMode
    });
    decorateClasses(this.els.callModeBtn, {
      active: callMode
    });
    decorateClasses(this.els.valueModeBtn, {
      active: valueMode
    });
    decorateClasses(this.els.thinModeBtn, {
      active: thinMode
    });
    decorateClasses(this.els.hideOldRunBtn, {
      active: !!hideBefore
    });
    decorateClasses(this.els.hideNewRunBtn, {
      active: !hideAfter
    });
    decorateClasses(this.els.graphModeBtn, {
      active: graphMode !== GraphType.None
    });
    decorateClasses(this.els.asyncStackBtn, {
      active: !!stackEnabled
    });
    decorateClasses(this.els.asyncDetailModeBtn, {
      active: !!asyncDetailMode
    });
    decorateClasses(this.els.searchContextsBtn, {
      active: !!searchTermContexts
    });
    decorateClasses(this.els.searchTracesBtn, {
      active: !!searchTermTraces
    });
    decorateClasses(this.els.clearThreadSelectionBtn, {
      hidden: !isThreadSelectionActive
    });
    [`navbar-${themeModeName}`, `bg-${themeModeName}`].forEach(mode => this.el.classList.add(mode));
    this.els.thinModeBtn.innerHTML = `${!!thinMode && '||&nbsp;' || '|&nbsp;|'}`;
    this.els.hideNewRunBtn.innerHTML = `${hideAfter ? '⚪' : '🔴'}`;

    this.els.graphModeBtn.innerHTML = getGraphTypeDisplayName(graphMode);
  }

  renderModes() {
    const {
      locMode,
      callMode,
      valueMode,
      thinMode,
      asyncDetailMode,
    } = this.parent.state;

    const docEl = this.parent.el;
    decorateClasses(docEl, {
      'hide-locs': !locMode,
      'hide-values': !valueMode,
      'thin-mode': thinMode
    });

    decorateAttr(docEl, {
      'data-call-mode': callMode && 1 || 0,
      'data-async-detail-mode': asyncDetailMode && 1 || 0,
    });
  }

  // ###########################################################################
  // event listeners
  // ###########################################################################

  on = {
    restartBtn: {
      async click(evt) {
        evt.preventDefault();

        if (await this.app.confirm('Do you really want to restart?')) {
          this.componentManager.restart();
        }
      },

      focus(evt) { evt.target.blur(); }
    },

    followModeBtn: {
      click(evt) {
        evt.preventDefault();
        this.remote.toggleFollowMode();
      },

      focus(evt) { evt.target.blur(); }
    },

    locModeBtn: {
      click(evt) {
        evt.preventDefault();
        this.parent.setState({
          locMode: !this.parent.state.locMode
        });
      },
      focus(evt) { evt.target.blur(); }
    },

    callModeBtn: {
      click(evt) {
        evt.preventDefault();
        evt.target.blur();

        this.parent.setState({
          callMode: !this.parent.state.callMode
        });
      },
      // focus(evt) { evt.target.blur(); }
    },

    valueModeBtn: {
      click(evt) {
        evt.preventDefault();
        this.parent.setState({
          valueMode: !this.parent.state.valueMode
        });
      },
      focus(evt) { evt.target.blur(); }
    },

    thinModeBtn: {
      click(evt) {
        evt.preventDefault();
        this.parent.setState({
          thinMode: !this.parent.state.thinMode
        });
      },
      focus(evt) { evt.target.blur(); }
    },

    hideOldRunBtn: {
      click(evt) {
        evt.preventDefault();
        const mode = !this.parent.state.hideBefore;
        this.remote.hideOldRun(mode && Date.now());
      },
      focus(evt) { evt.target.blur(); }
    },

    hideNewRunBtn: {
      click(evt) {
        evt.preventDefault();
        const mode = !this.parent.state.hideAfter;
        this.remote.hideNewRun(mode && Date.now());
      },
      focus(evt) { evt.target.blur(); }
    },

    graphModeBtn: {
      click(evt) {
        evt.preventDefault();
        this.remote.nextGraphMode();
      },
      focus(evt) { evt.target.blur(); }
    },
    asyncStackBtn: {
      click(evt) {
        evt.preventDefault();
        this.remote.toggleStackEnabled();
      },
      focus(evt) { evt.target.blur(); }
    },
    asyncDetailModeBtn: {
      click(evt) {
        evt.preventDefault();
        this.parent.setState({
          asyncDetailMode: !this.parent.state.asyncDetailMode
        });
      },
      focus(evt) { evt.target.blur(); }
    },
    clearThreadSelectionBtn: {
      click(evt) {
        evt.preventDefault();
        this.remote.clearThreadSelection();
      },
      focus(evt) { evt.target.blur(); }
    },

    searchContextsBtn: {
      async click(evt) {
        evt.preventDefault();
        if (this.parent.state.searchTermContexts) {
          // stop searching
          await this.remote.searchContexts(null);
        }
        else {
          // start searching
          const searchTermContexts = await this.app.prompt('Enter CONTEXT search term');
          if (searchTermContexts) {
            await this.remote.searchContexts(searchTermContexts);
          }
        }
      },
      focus(evt) { evt.target.blur(); }
    },

    searchTracesBtn: {
      async click(evt) {
        evt.preventDefault();
        if (this.parent.state.searchTermTraces) {
          // stop searching
          await this.remote.searchTraces(null);
        }
        else {
          // start searching
          const searchTermTraces = await this.app.prompt('Enter TRACE search term');
          if (searchTermTraces) {
            await this.remote.searchTraces(searchTermTraces);
          }
        }
      },
      focus(evt) { evt.target.blur(); }
    },

    moreMenuBtn: {
      click(/* evt */) {
        this.toggleMenu();
      },
      focus(evt) { evt.target.blur(); }
    }
  }
}

export default Toolbar;