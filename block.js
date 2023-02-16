import { nanoid } from "nanoid";

class Block {
  constructor(container) {
    this.container = container;
  }

  createBlock() {
    const blockWrapper = document.createElement('div');

    blockWrapper.classList.add('block-wrapper', 'col', 's12');
    blockWrapper.id = nanoid();

    this.createBlockSetting({
      buttonRequired: true,
    });
  }

  createBlockSetting(options) {
    const { buttonRequired } = options || {};

    const blockSettingWrapper = document.createElement('div');

    blockSettingWrapper.classList.add('block-setting-wrapper', 'col', 's12');

    blockSettingWrapper.innerHTML = this.getMarkup();

    if (buttonRequired) {
      blockSettingWrapper.append(this.createAddBlockSettingButton());
    }

    this.container.append(blockSettingWrapper);

    this.initializePicker(blockSettingWrapper.querySelector('select'));
  }

  createAddBlockSettingButton() {
    const buttonWrapper = document.createElement('div');

    buttonWrapper.classList.add('col', 's3');

    buttonWrapper.innerHTML = `<button class="btn-floating waves-effect waves-light btn-small red" data-add-block-setting><i class="material-icons">add</i></button>`;

    this.addButtonEvents(buttonWrapper);

    return buttonWrapper;
  }

  getMarkup() {
    return `
      <select multiple>
        <option value="" disabled selected>Choose your option</option>
        <option value="checkbox">Checkbox</option>
        <option value="number">Number</option>
        <option value="radio">Radio</option>
        <option value="range">Range</option>
        <option value="select">Select</option>
        <option value="text">Text</option>
        <option value="textarea">Textarea</option>
      </select>
      <label>Setting picker</label>
    `
  }

  initializePicker(select) {
    M.FormSelect.init(select);
  }

  addButtonEvents(button) {
    button.addEventListener('click', e => {
      e.preventDefault();

      this.createBlockSetting();
    });
  }
}

export { Block };
