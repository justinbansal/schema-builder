import { nanoid } from "nanoid";

class SettingPicker {
  constructor(container) {
    this.container = container;
    this.select = null;
  }

  create() {
    let divWrapper = document.createElement('div');

    divWrapper.classList.add('input-field', 'col', 's12');
    divWrapper.id = nanoid();
    divWrapper.innerHTML = this.getMarkup();

    this.container.append(divWrapper);

    this.select = divWrapper.querySelector('select');

    this.initializePicker();
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

  initializePicker() {
    M.FormSelect.init(this.select);
  }
}

export { SettingPicker };
