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
        console.log(state.chosenFormElements);
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

  console.log(array);

  array.forEach(element => {
    // build out form inputs

    // name, class, limit

    if (element === 'name') {
      const nameInput = document.createElement('input');
      const nameLabel = document.createElement('label');
      nameInput.setAttribute('type', 'text');
      nameInput.setAttribute('name', 'name');
      nameLabel.setAttribute('for', 'name');
      nameLabel.innerText = 'Name';
      reviewFormElementsForm.append(nameLabel, nameInput);
    }

    if (element === 'class') {
      const classInput = document.createElement('input');
      const classLabel = document.createElement('label');
      classInput.setAttribute('type', 'text');
      classInput.setAttribute('name', 'class');
      classLabel.setAttribute('for', 'class');
      classLabel.innerText = 'Class';
      reviewFormElementsForm.append(classLabel, classInput);
    }

    if (element === 'limit') {
      const limitInput = document.createElement('input');
      const limitLabel = document.createElement('label');
      limitInput.setAttribute('type', 'number');
      limitInput.setAttribute('name', 'limit');
      limitLabel.setAttribute('for', 'limit');
      limitLabel.innerText = 'Limit';
      reviewFormElementsForm.append(limitLabel, limitInput);
    }

    if (element === 'text') {
      const textIdInput = createTextInput('Text ID', 'text-id');
      const textLabelInput = createTextInput('Text Label', 'text-label');
      const textCheckboxInput = createCheckboxInput();

      reviewFormElementsForm.append(textIdInput.labelInput, textIdInput.textInput);
      reviewFormElementsForm.append(textLabelInput.labelInput, textLabelInput.textInput);
      reviewFormElementsForm.append(textCheckboxInput);
    }

    if (element === 'number') {
      const numberIdInput = createTextInput('Number ID', 'number-id');
      const numberLabelInput = createTextInput('Number Label', 'number-label');
      const numberDefaultInput = createNumberInput('Default Value', 'number-default'); // needs to be a number input actually

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
    }

    if (element === 'checkbox') {

      const checkboxIdInput = createTextInput('Checkbox ID', 'checkbox-id');
      const checkboxLabelInput = createTextInput('Checkbox Label', 'checkbox-label');
      const checkboxCheckboxInput = createCheckboxInput();

      reviewFormElementsForm.append(checkboxIdInput.labelInput, checkboxIdInput.textInput);
      reviewFormElementsForm.append(checkboxLabelInput.labelInput, checkboxLabelInput.textInput);
      reviewFormElementsForm.append(checkboxCheckboxInput);

      const checkboxInput = document.createElement('input');
      const checkboxSpan = document.createElement('span');
      const checkboxLabel = document.createElement('label');

      checkboxInput.setAttribute('type', 'checkbox');
      checkboxInput.setAttribute('class', 'filled-in');
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

function createCheckboxInput(name = 'Enabled by Default') {
  const container = document.createElement('p');

  const checkboxInput = document.createElement('input');
  checkboxInput.setAttribute('type', 'checkbox');
  checkboxInput.setAttribute('class', 'filled-in');

  const checkboxSpan = document.createElement('span');
  checkboxSpan.innerText = name;

  const checkboxLabel = document.createElement('label');
  checkboxLabel.append(checkboxInput, checkboxSpan);
  container.append(checkboxLabel);

  return container;
}

function reviewFormElementsFormSubmission(e) {
  e.preventDefault();

  const formElements = [...reviewFormElementsForm.elements];

  let array = [];
  let headers = {};
  let numberSetting;

  console.log(formElements);

  if (formElements.find(element => element.name.includes('number'))) {
    numberSetting = {
      type: 'number'
    };
  }

  formElements.forEach(element => {
    const name = element.name;

    // create an object w/ data and push into an array
    if (name === 'name') {
      headers.name = name;
    }

    if (name === 'class') {
      headers.class = name;
    }

    if (name === 'limit') {
      headers.limit = name;
    }

    if (name.includes('number')) {

      if (name.includes('id')) {
        numberSetting.id = element.value;
      }

      if (name.includes('label')) {
        numberSetting.label = element.value;
      }

      if (name.includes('default')) {
        numberSetting.default = element.value;
      }

      console.log(numberSetting);
    }
  })

  array.push(JSON.stringify(headers));


  // calls schema build function
  buildSchema(array);
}

function buildSchema(array) { // need form values now
  console.log(array[0]) // ['name', 'class', 'text', 'textarea']

  // build headers

  let headers = {};

  // build setting objects

  // put together
}
