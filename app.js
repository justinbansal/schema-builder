import { nanoid } from 'nanoid';

import { SettingPicker } from './settingPicker';
import { Block } from './block';

//watchify app.js -p esmify -o bundle.js

let reviewFormElementsForm = document.querySelector('[data-review-form-elements]');
reviewFormElementsForm.addEventListener('submit', reviewFormElementsFormSubmission);

const addSettingBtn = document.querySelector('[data-add-setting]');
const addBlockBtn = document.querySelector('[data-add-block]');
const blockDisplay = document.querySelector('[data-block-display]');
const choiceForm = document.querySelector('[data-choose-form-elements]');
const sectionSettingsContainer = choiceForm.querySelector('.section-settings-row');

addSettingBtn.addEventListener('click', e => {
  e.preventDefault();

  const settingPicker = new SettingPicker(sectionSettingsContainer);
  settingPicker.create();
})

addBlockBtn.addEventListener('click', e => {
  e.preventDefault();

  const block = new Block(blockDisplay);
  block.createBlock();
})

choiceForm.addEventListener('submit', e => {
  e.preventDefault();

  //document.body.classList.add('review-settings-state', 'adding-data-to-components');

  reviewFormElementsForm.innerHTML = '';

  let components = {
    section: {},
    sectionSettings: [],
    blocks: [],
    presets: [],
  };

  // Wraps checkboxes for section headers (name, class, input)
  const sectionHeaderWrap = document.querySelector('.header-settings-wrap');

  const sectionHeaderCheckboxes = [...sectionHeaderWrap.querySelectorAll('input[type="checkbox"]')];

  sectionHeaderCheckboxes.forEach(element => {
    if (!element.checked) return;
    if (element.name === 'name') {
      components.section.name = true;
    }

    if (element.name === 'class') {
      components.section.class = true;
    }

    if (element.name === 'limit') {
      components.section.limit = true;
    }

    if (element.name === 'maxBlocks') {
      components.section.maxBlocks = true;
    }
  });

  const sectionSettings = [...sectionSettingsContainer.querySelectorAll('ul.select-dropdown .selected')];

  sectionSettings.forEach(select => {
    if (select.innerText === 'Choose your option') return;

    components.sectionSettings.push(select.innerText);
  });

  // section settings

  // blocks

  const blocks = blockDisplay.querySelectorAll('.block-wrapper');

  blocks.forEach(block => {
    let blockDetails = {
      name: null,
      type: null,
      settings: []
    }

    const blockSettingsContainer = block.querySelector('.block-setting-wrapper');

    const blockSettings = [...blockSettingsContainer.querySelectorAll('ul.select-dropdown .selected')];

    blockSettings.forEach(select => {
      if (select.innerText === 'Choose your option') return;

      blockDetails.settings.push(select.innerText);
    })

    if (blockSettings.length > 0) {
      components.blocks.push(blockDetails);
    }
  })

  console.log(components);

  // buildFormElements(state.chosenFormElements);
})

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

function buildFormElements(array) {
  // takes in array of form elements
  // builds html for it

  array.forEach(element => {
    if (element === 'name') {
      const nameInput = createTextInput('Name', 'name');

      reviewFormElementsForm.append(nameInput.labelInput, nameInput.textInput);
    }

    if (element === 'class') {
      const limitInput = createTextInput('Class', 'class');

      reviewFormElementsForm.append(limitInput.labelInput, limitInput.textInput);
    }

    if (element === 'limit') {
      const limitInput = createNumberInput('Limit', 'limit');

      reviewFormElementsForm.append(limitInput.labelInput, limitInput.numberInput);
    }

    if (element === 'text') {
      const container = document.createElement('p');
      container.id = nanoid();
      container.classList.add('setting-container');
      container.dataset.type = 'text';

      const textIdInput = createTextInput('Text ID', 'text-id');
      const textLabelInput = createTextInput('Text Label', 'text-label');
      const textInput = createTextInput('Text Default', 'text-default');

      container.append(textIdInput.labelInput, textIdInput.textInput);
      container.append(textLabelInput.labelInput, textLabelInput.textInput);
      container.append(textInput.labelInput, textInput.textInput);

      reviewFormElementsForm.append(container);
    }

    if (element === 'number') {
      const container = document.createElement('p');
      container.id = nanoid();
      container.classList.add('setting-container');
      container.dataset.type = 'number';

      const numberIdInput = createTextInput('Number ID', 'number-id');
      const numberLabelInput = createTextInput('Number Label', 'number-label');
      const numberDefaultInput = createNumberInput('Default Value', 'number-default');

      container.append(numberIdInput.labelInput, numberIdInput.textInput);
      container.append(numberLabelInput.labelInput, numberLabelInput.textInput);
      container.append(numberDefaultInput.labelInput, numberDefaultInput.numberInput);

      reviewFormElementsForm.append(container);
    }

    if (element === 'textarea') {
      const container = document.createElement('p');
      container.id = nanoid();
      container.classList.add('setting-container');
      container.dataset.type = 'textarea';

      const textareaIdInput = createTextInput('Textarea ID', 'textarea-id');
      const textareaLabelInput = createTextInput('Textarea Label', 'textarea-label');
      const textareaInput = createTextInput('Textarea Default', 'textarea-default');

      container.append(textareaIdInput.labelInput, textareaIdInput.textInput);
      container.append(textareaLabelInput.labelInput, textareaLabelInput.textInput);
      container.append(textareaInput.labelInput, textareaInput.textInput);

      reviewFormElementsForm.append(container);
    }

    if (element === 'checkbox') {
      const container = document.createElement('p');
      container.id = nanoid();
      container.classList.add('setting-container');
      container.dataset.type = 'checkbox';

      const checkboxIdInput = createTextInput('Checkbox ID', 'checkbox-id');
      const checkboxLabelInput = createTextInput('Checkbox Label', 'checkbox-label');
      const checkboxCheckboxInput = createCheckboxInput();

      container.append(checkboxIdInput.labelInput, checkboxIdInput.textInput);
      container.append(checkboxLabelInput.labelInput, checkboxLabelInput.textInput);
      container.append(checkboxCheckboxInput);

      reviewFormElementsForm.append(container);
    }

    if (element === 'radio') {
      const container = document.createElement('p');
      container.id = nanoid();
      container.classList.add('setting-container');
      container.dataset.type = 'radio';

      const radioIdInput = createTextInput('Radio ID', 'radio-id');
      const radioLabelInput = createTextInput('Radio Label', 'radio-label');
      const radioTextInput = createTextInput('Radio Options', 'radio-options');
      radioTextInput.textInput.setAttribute('placeholder', 'Separate options with commas, first option becomes default');

      container.append(radioIdInput.labelInput, radioIdInput.textInput);
      container.append(radioLabelInput.labelInput, radioLabelInput.textInput);
      container.append(radioTextInput.labelInput, radioTextInput.textInput);

      reviewFormElementsForm.append(container);
    }

    if (element === 'range') {
      const container = document.createElement('p');
      container.id = nanoid();
      container.classList.add('setting-container');
      container.dataset.type = 'range';

      const rangeIdInput = createTextInput('Range ID', 'range-id');
      const rangeLabelInput = createTextInput('Range Label', 'range-label');
      const rangeMinInput = createNumberInput('Range Min', 'range-min');
      const rangeMaxInput = createNumberInput('Range Max', 'range-max');
      const rangeStepInput = createNumberInput('Range Step', 'range-step');
      const rangeDefaultInput = createNumberInput('Range Default', 'range-default');
      const rangeUnitInput = createTextInput('Range Unit', 'range-unit');

      container.append(rangeIdInput.labelInput, rangeIdInput.textInput);
      container.append(rangeLabelInput.labelInput, rangeLabelInput.textInput);
      container.append(rangeMinInput.labelInput, rangeMinInput.numberInput);
      container.append(rangeMaxInput.labelInput, rangeMaxInput.numberInput);
      container.append(rangeStepInput.labelInput, rangeStepInput.numberInput);
      container.append(rangeDefaultInput.labelInput, rangeDefaultInput.numberInput);
      container.append(rangeUnitInput.labelInput, rangeUnitInput.textInput);

      reviewFormElementsForm.append(container);
    }

    if (element === 'select') {
      const container = document.createElement('p');
      container.id = nanoid();
      container.classList.add('setting-container');
      container.dataset.type = 'select';

      const selectIdInput = createTextInput('Select ID', 'select-id');
      const selectLabelInput = createTextInput('Select Label', 'select-label');
      const selectTextInput = createTextInput('Select Options', 'select-options');
      selectTextInput.textInput.setAttribute('placeholder', 'Separate options with commas, first option becomes default');

      container.append(selectIdInput.labelInput, selectIdInput.textInput);
      container.append(selectLabelInput.labelInput, selectLabelInput.textInput);
      container.append(selectTextInput.labelInput, selectTextInput.textInput);

      reviewFormElementsForm.append(container);

    }
  })

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('waves-effect', 'waves-light', 'btn-small');
  submitBtn.innerText = 'Submit';

  reviewFormElementsForm.append(submitBtn);
}

function createTextInput(label, name) {
  const textInput = document.createElement('input');
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('name', name);

  const labelInput = document.createElement('label');
  labelInput.setAttribute('for', name);
  labelInput.innerText = label;

  return {
    textInput: textInput,
    labelInput: labelInput,
  }
}

function createNumberInput(label, name) {
  const numberInput = document.createElement('input');
  numberInput.setAttribute('type', 'number');
  numberInput.setAttribute('name', name);

  const labelInput = document.createElement('label');
  labelInput.setAttribute('for', name);
  labelInput.innerText = label;

  return {
    numberInput,
    labelInput
  }
}

function createCheckboxInput(label = 'Enabled by Default') {
  const container = document.createElement('p');

  const checkboxInput = document.createElement('input');
  checkboxInput.setAttribute('type', 'checkbox');
  checkboxInput.setAttribute('class', 'filled-in');
  checkboxInput.setAttribute('name', 'checkbox-default');

  const checkboxSpan = document.createElement('span');
  checkboxSpan.innerText = label;

  const checkboxLabel = document.createElement('label');
  checkboxLabel.append(checkboxInput, checkboxSpan);
  container.append(checkboxLabel);

  return container;
}

function buildSettingObject(settingObject, array) {
  array.forEach(element => {
    // build property using element name
    let property;
    let stringItems;
    if (element.name.includes('-')) {
      stringItems = element.name.split('-');
      property = stringItems[stringItems.length - 1];
    } else {
      property = element.name;
    }

    if (property === 'options') {
      let optionValues = element.value.toLowerCase().split(',').map(value => value.trim());

      settingObject.options = []

      // assumes value & label to be the same
      // TODO: add method to capitalize first letter of option for label

      for (const option of optionValues) {
        settingObject.options.push(
          {
            value: option,
            label: option,
          }
        )
      }

      settingObject.default = optionValues[0];

    } else {
      if (property === 'default' && element.type === 'checkbox') {
        settingObject[property] = element.checked;
      } else if (property === 'default' && element.type === 'number') {
        settingObject[property] = parseInt(element.value, 10);
      } else {
        settingObject[property] = element.value.toLowerCase();
      }

      // TODO: if number input value should be converted to an integer
    }
  });

  return settingObject;
}

function reviewFormElementsFormSubmission(e) {
  e.preventDefault();

  let array = [];
  let headers = {};

  const nameInput = reviewFormElementsForm.querySelector('input[name="name"]');
  const classInput = reviewFormElementsForm.querySelector('input[name="class"]');
  const limitInput = reviewFormElementsForm.querySelector('input[name="limit"]');

  let headerElsArray = [nameInput, classInput, limitInput];
  let headerSettingObject;

  if (!headerElsArray.includes(null)) {
    headerSettingObject = buildSettingObject(headers, headerElsArray);
  }

  array.push({
    type: 'headers',
    value: headerSettingObject
  })

  const settingContainers = reviewFormElementsForm.querySelectorAll('.setting-container');

  settingContainers.forEach(container => {
    const type = container.dataset.type;

    const inputs = Array.from(container.querySelectorAll('input'));

    const elsArray = inputs.filter(element => element.name.includes(type));

    let settingObject = {
      type,
    }

    buildSettingObject(settingObject, elsArray);

    array.push({ type: 'setting', value: settingObject });
  })

  buildSchema(array);
}

function buildSchema(array) {
  let schema = {};

  let headersSetting = array.find(setting => setting.type === 'headers');

  Object.assign(schema, headersSetting.value);

  schema.settings = [];

  array.forEach(setting => {
    if (setting.type === 'setting' ) {
      schema.settings.push(setting.value);
    }
  })

  let schemaDisplay = document.querySelector('#schema');

  schemaDisplay.innerHTML = JSON.stringify(schema, null, " ");
}

/* TODO
 * Add support for blocks, max_blocks, and presets
 * Add support for info, placeholder, header paragraph
 * required vs optional
 * preset name
*/
