(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _nanoid = require("nanoid");
//watchify app.js -p esmify -o bundle.js

const state = {
  choosingFormElements: true,
  reviewingForm: false,
  chosenFormElements: []
};
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
  newDiv.id = (0, _nanoid.nanoid)();
  newDiv.innerHTML = newSettingMarkup;
  choiceForm.append(newDiv);
  var elems = choiceForm.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});
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
  });

  // update state
  state.choosingFormElements = false;
  state.reviewingForm = true;
  let updatedChosenEls = state.chosenFormElements.filter(elements => elements !== 'Choose your option');
  state.chosenFormElements = updatedChosenEls;

  // save to session storage
  sessionStorage.setItem('chosenFormElements', JSON.stringify(state.chosenFormElements));
  buildFormElements(state.chosenFormElements);
});
document.addEventListener('DOMContentLoaded', function () {
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
      const radioTextInput = createTextInput('Radio Options', 'radio-text');
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
      const selectTextInput = createTextInput('Select Options', 'select-text');
      selectTextInput.textInput.setAttribute('placeholder', 'Separate options with commas, first option becomes default');
      reviewFormElementsForm.append(selectIdInput.labelInput, selectIdInput.textInput);
      reviewFormElementsForm.append(selectLabelInput.labelInput, selectLabelInput.textInput);
      reviewFormElementsForm.append(selectTextInput.labelInput, selectTextInput.textInput);
    }
  });
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
    labelInput: labelInput
  };
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
  };
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
  let array = [];
  let headers = {};
  let checkboxSetting;
  let numberSetting;
  let radioSetting;
  let rangeSetting;
  let selectSetting;
  let textSetting;
  let textareaSetting;
  console.log(formElements);
  if (formElements.find(element => element.name.includes('number'))) {
    numberSetting = {
      type: 'number'
    };
  }
  formElements.forEach(element => {
    const name = element.name;

    // create an object w/ data and push into an array that we'll later use to build the JSON

    // headers

    // checkbox setting

    // number setting

    // radio setting

    // range setting

    // select setting

    // text setting

    // textarea setting

    if (name === 'name') {
      headers.name = element.value;
    }
    if (name === 'class') {
      headers.class = element.value;
    }
    if (name === 'limit') {
      headers.limit = element.value;
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
  });
  array.push(headers);
  console.log(array);

  // array.push(JSON.stringify(headers));

  // calls schema build function
  // buildSchema(array);
}

function buildSchema(array) {
  console.log(array[0]); // ['name', 'class', 'text', 'textarea']

  // build headers

  let headers = {};

  // build setting objects

  // put together
}

},{"nanoid":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = exports.nanoid = exports.customRandom = exports.customAlphabet = void 0;
Object.defineProperty(exports, "urlAlphabet", {
  enumerable: true,
  get: function () {
    return _index.urlAlphabet;
  }
});
var _index = require("./url-alphabet/index.js");
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes));
exports.random = random;
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  let step = -~(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = '';
    while (true) {
      let bytes = getRandom(step);
      let j = step;
      while (j--) {
        id += alphabet[bytes[j] & mask] || '';
        if (id.length === size) return id;
      }
    }
  };
};
exports.customRandom = customRandom;
let customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);
exports.customAlphabet = customAlphabet;
let nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += '-';
  } else {
    id += '_';
  }
  return id;
}, '');
exports.nanoid = nanoid;

},{"./url-alphabet/index.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlAlphabet = void 0;
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
exports.urlAlphabet = urlAlphabet;

},{}]},{},[1]);
