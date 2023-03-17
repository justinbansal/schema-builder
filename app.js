// OPTIONS
const optionButtons = document.querySelectorAll('.options button');

optionButtons.forEach(button => {
  button.addEventListener('click', handleOptionClick);
})

// DATA
const dataColumn = document.querySelector('.data');
const formLabel = document.querySelector('.data label');
const textInput = document.querySelector('.data input');
const attributeTemplate = document.querySelector('#attribute-template');
const settingTemplate = document.querySelector('#setting-template');
let key;
let settingObj;
let type = 'attribute';
let schemaObj = {
  settings: []
};

// if type is attribute use attribute template, otherwise setting template
if (type === 'attribute') {
  const clonedMarkup = attributeTemplate.content.cloneNode(true);
  dataColumn.append(clonedMarkup);
} else {
  const clonedMarkup = settingTemplate.content.cloneNode(true);
  dataColumn.append(clonedMarkup);
}

function handleOptionClick() {
  key = this.dataset.name;
  type = this.dataset.type;
  dataColumn.innerHTML = '';
  // if type is attribute use attribute template, otherwise setting template
  if (type === 'attribute') {
    const clonedMarkup = attributeTemplate.content.cloneNode(true);
    dataColumn.append(clonedMarkup);
  } else {
    const clonedMarkup = settingTemplate.content.cloneNode(true);
    dataColumn.append(clonedMarkup);
  }

  const idInput = document.querySelector('input[name="setting-id"]');
  const labelInput = document.querySelector('input[name="setting-label"]');
  const infoInput = document.querySelector('input[name="setting-info"]');
  const defaultInput = document.querySelector('input[name="setting-default"]');
  const optionsInput = document.querySelector('input[name="setting-options"]');
  const submitBtn = document.querySelector('.data button');
  submitBtn.addEventListener('click', handleSubmit);

  if (type === 'setting') {
    settingObj = {};
    idInput.value = '';
    labelInput.value = '';
    defaultInput.value = '';
    infoInput.value = '';
    settingObj.settings = [];
  }

  console.log(key);
  console.log(type);
  console.log(settingObj);
}

function handleSubmit(e) {
  e.preventDefault();

  if (type === 'setting') {
    settingObj = {
      type: key,
      id: idInput.value,
      label: labelInput.value,
      default: defaultInput.value,
      info: infoInput.value,
    }

    if (key === 'radio') {
      settingObj.options = [];
      const optionValues = optionsInput.value.toLowerCase().split(',').map(value => value.trim());
      for (const option of optionValues) {
        settingObj.options.push(
          {
            value: option,
            label: option,
          }
        )
      }
    }

    schemaObj.settings.push(settingObj);
    updatePreviewer();
  } else {
    const data = textInput.value;

    updateSchemaObj(key, data);
  }
}

// PREVIEW
const previewer = document.querySelector('.preview pre');

function updateSchemaObj(key, data) {
  schemaObj[key] = data;
  updatePreviewer();
}

function updatePreviewer() {
  console.log(schemaObj);
  previewer.innerHTML = JSON.stringify(schemaObj, null, " ");
}
