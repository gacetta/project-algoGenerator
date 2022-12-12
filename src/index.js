import { getAlgos, Algo, getAlgo } from './algo'

const algos = getAlgos();
console.log(algos);
let currentAlgo;

setCurrentAlgo('add5');
console.log(currentAlgo)

generateDropdownEl(algos);

// setCurrentAlgo
// input: value from the dropdown change
// output: none, side-effects to currentAlgo
function setCurrentAlgo(algoName) {
  currentAlgo = getAlgo(algoName);
  renderDescription(currentAlgo);
  renderAlgoRun(currentAlgo);
}

// generateDropdownElement
// input: arr of Algos
// return: dropdown element with algo choices
function generateDropdownEl(algoArr) {
  const dropdownEl = document.createElement('div');
  const labelEl = document.createElement('label');
  const dropdownMenuEl = document.createElement('select');

  // setup label
  labelEl.classList.add('dropdown__label')
  labelEl.textContent = 'Choose an algorithm to display:';
  dropdownEl.append(labelEl);

  // setup dropdown menu with default option
  dropdownMenuEl.setAttribute('name', 'algo-names');
  dropdownMenuEl.setAttribute('id', 'set-algo');
  dropdownMenuEl.required = true;
  
  const defaultOption = generateOptionEl('Select an algo');
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdownMenuEl.append(defaultOption);
  dropdownEl.append(dropdownMenuEl);
  
  // iterate over algos and add each as an option
  algoArr.forEach((algo) => {
    const algoName = algo.name.toString().split('.')[0];
    const optionEl = generateOptionEl(algoName);
    dropdownMenuEl.append(optionEl);
  })

  // add dropdownEl to DOM
  const algoSelectEl = document.querySelector('#algo__select');
  algoSelectEl.append(dropdownEl);

  //add eventlistener to dropdownMenuEl
  dropdownMenuEl.addEventListener('change', (e) => {
    console.log('event listen: ', e.target.value);
    setCurrentAlgo(e.target.value);
  })
}

// generateOptionEl
// input: filename for name/value
// output: DOM option element
function generateOptionEl(optionName) {
  const algoEl = document.createElement('option');
  algoEl.textContent = optionName;
  algoEl.setAttribute('value', optionName);
  return algoEl
}

// renderDescription
// input: currentAlgo
// output: none -   Modifies DOM
function renderDescription(currentAlgo) {
  console.log('generating description')
  const algoDescriptionContainerEl = document.createElement('div');
  const algoNameEl = document.createElement('h2');
  const algoDescriptionEl = document.createElement('p');

  // setup algoName
  console.log(currentAlgo.name)
  algoNameEl.textContent = currentAlgo.name;
  algoDescriptionContainerEl.append(algoNameEl);

  // setup algoDescription
  algoDescriptionEl.textContent = currentAlgo.description;
  algoDescriptionContainerEl.append(algoDescriptionEl);

  console.log('rendering Description');
  const descriptionSection = document.querySelector('#algo__description');
  descriptionSection.innerHTML = '';
  descriptionSection.append(algoDescriptionContainerEl);
}


// renderAlgoRun
// input: currentAlgo
// output: none - modifies DOM
function renderAlgoRun(currentAlgo) {
  console.log('generating algo run section');

  const algoRunContainerEl = document.createElement('div');
  const algoRunLabelEl = document.createElement('label');
  const algoRunInputEl = document.createElement('input');
  const algoRunResultEl = document.createElement('p');
  const algoRunButtonEl = document.createElement('input');
  
  // setup label
  algoRunLabelEl.textContent = 'Enter arguments here:'
  algoRunLabelEl.setAttribute('for', 'argArr')
  algoRunInputEl.setAttribute('id', 'algoLabel');
  algoRunContainerEl.append(algoRunLabelEl);

  // create text input
  algoRunInputEl.setAttribute('type', 'text');
  algoRunInputEl.setAttribute('id', 'arguments');
  algoRunInputEl.setAttribute('name', 'arguments');
  algoRunInputEl.setAttribute('placeholder', 'enter args as comma-separated-list')
  algoRunContainerEl.append(algoRunInputEl);

  // create result element
  algoRunResultEl.setAttribute('id', 'result');
  algoRunContainerEl.append(algoRunResultEl);

  // create submit button
  algoRunButtonEl.setAttribute('type', 'submit');
  algoRunButtonEl.setAttribute('value', 'Run Algorithm');
  algoRunButtonEl.setAttribute('id', 'submit-button')
  algoRunContainerEl.append(algoRunButtonEl);

  console.log('rendering algoRun');

  const algoRunSection = document.querySelector('#algo__run');
  algoRunSection.innerHTML = '';
  algoRunSection.append(algoRunContainerEl);

  // submit button event listener
  document.querySelector('#submit-button').addEventListener('click', (e) => {
    const argStr = document.querySelector('#arguments').value;
    const argArr = generateArgArrFromStr(argStr);
    console.log(typeof argArr[0]);

    const result = currentAlgo.run(...argArr);

    // render result to #result
    const resultEl = document.querySelector('#result');
    resultEl.textContent = result;
  })
}



// // function to get argument array from argument string
// // trim
function generateArgArrFromStr(argStr) {
  const argArr = argStr.split(',');
  return argArr.map((argument) => Number(argument.trim()));
}




