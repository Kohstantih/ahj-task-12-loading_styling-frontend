export default class InformMessage {
  constructor(messageBox) {
    this.messageBox = messageBox;

    this.messageTextEl = this.messageBox.querySelector('.inform_text');
  }

  showInform(message) {
    this.messageBox.classList.remove('hidden');
    this.messageTextEl.textContent = message;
  }

  hideInform() {
    this.messageBox.classList.add('hidden');
    this.messageTextEl.textContent = '';
  }
}
