'use babel';

import BaccaratLinkView from './baccarat-link-view';
import { CompositeDisposable } from 'atom';

export default {

  baccaratLinkView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.baccaratLinkView = new BaccaratLinkView(state.baccaratLinkViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.baccaratLinkView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'baccarat-link:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.baccaratLinkView.destroy();
  },

  serialize() {
    return {
      baccaratLinkViewState: this.baccaratLinkView.serialize()
    };
  },

  toggle() {
    console.log('BaccaratLink was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
