import { nanoid } from 'nanoid';

//watchify app.js -p esmify -o bundle.js

const state = {
  choosingFormElements: true,
  reviewingForm: false,
  chosenFormElements: [],
}

let reviewFormElementsForm = document.querySelector('[data-review-form-elements]');

reviewFormElementsForm.addEventListener('submit', reviewFormElementsFormSubmission);


const addSettingBtn = document.querySelector('[data-add-setting]');
const choiceForm = document.querySelector('[data-choose-form-elements]');

const newSettingMarkup = `
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
  <label>Setting select</label>
`;

addSettingBtn.addEventListener('click', e => {
  e.preventDefault();

  const newDiv = document.createElement('div');
  newDiv.classList.add('input-field', 'col', 's12');
  newDiv.id = nanoid();
  newDiv.innerHTML = newSettingMarkup;

  choiceForm.append(newDiv);

  var elems = choiceForm.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
})

choiceForm.addEventListener('submit', e => {
  e.preventDefault();

  // empty array
  // and remove anything appended to review form
  state.chosenFormElements = [];
  reviewFormElementsForm.innerHTML = '';

  [...choiceForm.elements].forEach(element => {

    if (element.type === 'checkbox') {
      if (element.checked) {
        const value = element.nextElementSibling.innerText.toLowerCase();
        state.chosenFormElements.push(value);
      }
    }

    if (element.type === 'button') {
      return;
    }
  })

  // update state
  state.choosingFormElements = false;
  state.reviewingForm = true;

  let updatedChosenEls = state.chosenFormElements.filter(elements => elements !== 'Choose your option');
  state.chosenFormElements = updatedChosenEls;

  // save to session storage
  sessionStorage.setItem('chosenFormElements', JSON.stringify(state.chosenFormElements));

  buildFormElements(state.chosenFormElements);
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
      const textIdInput = createTextInput('Text ID', 'text-id');
      const textLabelInput = createTextInput('Text Label', 'text-label');
      const textCheckboxInput = createCheckboxInput();

      reviewFormElementsForm.append(textIdInput.labelInput, textIdInput.textInput);
      reviewFormElementsForm.append(textLabelInput.labelInput, textLabelInput.textInput);
      reviewFormElementsForm.append(textCheckboxInput);

      // TODO: default needs to be text input instead of checkbox
    }

    if (element === 'number') {
      const numberIdInput = createTextInput('Number ID', 'number-id');
      const numberLabelInput = createTextInput('Number Label', 'number-label');
      const numberDefaultInput = createNumberInput('Default Value', 'number-default');

      reviewFormElementsForm.append(numberIdInput.labelInput, numberIdInput.textInput);
      reviewFormElementsForm.append(numberLabelInput.labelInput, numberLabelInput.textInput);
      reviewFormElementsForm.append(numberDefaultInput.labelInput, numberDefaultInput.numberInput);
    }

    if (element === 'textarea') {
      const textareaIdInput = createTextInput('Textarea ID', 'textarea-id');
      const textareaLabelInput = createTextInput('Textarea Label', 'textarea-label');
      const textareaCheckboxInput = createCheckboxInput();

      reviewFormElementsForm.append(textareaIdInput.labelInput, textareaIdInput.textInput);
      reviewFormElementsForm.append(textareaLabelInput.labelInput, textareaLabelInput.textInput);
      reviewFormElementsForm.append(textareaCheckboxInput);

      // TODO: default needs to be text input instead of checkbox
    }

    if (element === 'checkbox') {

      const checkboxIdInput = createTextInput('Checkbox ID', 'checkbox-id');
      const checkboxLabelInput = createTextInput('Checkbox Label', 'checkbox-label');
      const checkboxCheckboxInput = createCheckboxInput();

      reviewFormElementsForm.append(checkboxIdInput.labelInput, checkboxIdInput.textInput);
      reviewFormElementsForm.append(checkboxLabelInput.labelInput, checkboxLabelInput.textInput);
      reviewFormElementsForm.append(checkboxCheckboxInput);
    }

    if (element === 'radio') {

      const radioIdInput = createTextInput('Radio ID', 'radio-id');
      const radioLabelInput = createTextInput('Radio Label', 'radio-label');
      const radioTextInput = createTextInput('Radio Options', 'radio-options');
      radioTextInput.textInput.setAttribute('placeholder', 'Separate options with commas, first option becomes default');

      reviewFormElementsForm.append(radioIdInput.labelInput, radioIdInput.textInput);
      reviewFormElementsForm.append(radioLabelInput.labelInput, radioLabelInput.textInput);
      reviewFormElementsForm.append(radioTextInput.labelInput, radioTextInput.textInput);
    }

    if (element === 'range') {
      const rangeIdInput = createTextInput('Range ID', 'range-id');
      const rangeLabelInput = createTextInput('Range Label', 'range-label');
      const rangeMinInput = createNumberInput('Range Min', 'range-min');
      const rangeMaxInput = createNumberInput('Range Max', 'range-max');
      const rangeStepInput = createNumberInput('Range Step', 'range-step');
      const rangeDefaultInput = createNumberInput('Range Default', 'range-default');
      const rangeUnitInput = createTextInput('Range Unit', 'range-unit');

      reviewFormElementsForm.append(rangeIdInput.labelInput, rangeIdInput.textInput);
      reviewFormElementsForm.append(rangeLabelInput.labelInput, rangeLabelInput.textInput);
      reviewFormElementsForm.append(rangeMinInput.labelInput, rangeMinInput.numberInput);
      reviewFormElementsForm.append(rangeMaxInput.labelInput, rangeMaxInput.numberInput);
      reviewFormElementsForm.append(rangeStepInput.labelInput, rangeStepInput.numberInput);
      reviewFormElementsForm.append(rangeDefaultInput.labelInput, rangeDefaultInput.numberInput);
      reviewFormElementsForm.append(rangeUnitInput.labelInput, rangeUnitInput.textInput);
    }

    if (element === 'select') {
      const selectIdInput = createTextInput('Select ID', 'select-id');
      const selectLabelInput = createTextInput('Select Label', 'select-label');
      const selectTextInput = createTextInput('Select Options', 'select-options');
      selectTextInput.textInput.setAttribute('placeholder', 'Separate options with commas, first option becomes default');

      reviewFormElementsForm.append(selectIdInput.labelInput, selectIdInput.textInput);
      reviewFormElementsForm.append(selectLabelInput.labelInput, selectLabelInput.textInput);
      reviewFormElementsForm.append(selectTextInput.labelInput, selectTextInput.textInput);
    }
  })

  const submitBtn = document.createElement('button');
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

function createRadioInputs(name, options) {
  for (const option in options) {
    const container = document.createElement('p');

    const optionInput = document.createElement('input');
    optionInput.setAttribute('type', 'radio');
    optionInput.setAttribute('name', name);

    const optionSpan = document.createElement('span');
    optionSpan.innerText = option;

    const optionLabel = document.createElement('label');
    optionLabel.append();
    container.append(optionLabel);

    return container;
  }
}

function reviewFormElementsFormSubmission(e) {
  e.preventDefault();

  const formElements = [...reviewFormElementsForm.elements];
  console.log(formElements);
  const inputElements = formElements.filter(element => element.type !== 'submit');

  let array = [];
  let headers = {};
  let checkboxSetting = {
    type: 'checkbox'
  };
  let numberSetting = {
    type: 'number'
  };
  let radioSetting = {
    type: 'radio'
  };
  let rangeSetting = {
    type: 'range'
  };
  let selectSetting = {
    type: 'select'
  };
  let textSetting = {
    type: 'text'
  };
  let textareaSetting = {
    type: 'textarea'
  };

  function buildSettingObject(settingObject, array) {
    console.log(array);
    console.log(settingObject);

    array.forEach(element => {
      // build property using element name
      let property;
      let stringItems;
      if (element.name.includes('-')) {
        stringItems = element.name.split('-');
        console.log(stringItems);
        property = stringItems[stringItems.length - 1];
      } else {
        property = element.name;
      }
      console.log(property);

      if (property === 'options') {
        let optionValues = element.value.toLowerCase().split(',').map(value => value.trim());

        console.log(optionValues);

        settingObject.options = []

        // assumes value & label to be the same
        // need to add method to capitalize first letter of option for label

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
        settingObject[property] = property === 'default' ? element.checked ? element.checked : parseInt(element.value, 10) : element.value.toLowerCase();

        // TODO: if number input value should be converted to an integer

        // TODO: update order of properties in setting object
      }
    });
  }

  let headerElsArray = inputElements.filter(element => element.name === 'name' || element.name === 'class' || element.name === 'limit');

  buildSettingObject(headers, headerElsArray);

  let checkboxElsArray = inputElements.filter(element => element.name.includes('checkbox'));

  buildSettingObject(checkboxSetting, checkboxElsArray);

  let numberElsArray = inputElements.filter(element => element.name.includes('number'));

  buildSettingObject(numberSetting, numberElsArray);

  let radioElsArray = inputElements.filter(element => element.name.includes('radio'));

  buildSettingObject(radioSetting, radioElsArray);

  let rangeElsArray = inputElements.filter(element => element.name.includes('range'));

  buildSettingObject(rangeSetting, rangeElsArray);

  let selectElsArray = inputElements.filter(element => element.name.includes('select'));

  buildSettingObject(selectSetting, selectElsArray);

  let textElsArray = inputElements.filter(element => element.name.includes('text'));

  buildSettingObject(textSetting, textElsArray);

  let textareaElsArray = inputElements.filter(element => element.name.includes('textarea'));

  buildSettingObject(textareaSetting, textareaElsArray);

  array.push(headers, checkboxSetting, numberSetting, radioSetting, rangeSetting, selectSetting, textSetting, textareaSetting);

  console.log(array);

  // array.push(JSON.stringify(headers));

  // calls schema build function
  // buildSchema(array);
}

function buildSchema(array) {
  console.log(array[0]) // ['name', 'class', 'text', 'textarea']

  // build headers

  let headers = {};

  // build setting objects

  // put together
}
