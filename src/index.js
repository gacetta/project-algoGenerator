import { getAlgos, Algo, getAlgo } from './algo'

const algos = getAlgos();
console.log(algos);
let currentAlgo;

setCurrentAlgo('add5');
console.log(currentAlgo.args)

generateDropdownEl(algos);

// setCurrentAlgo - side-effects: modifies currentAlgo
function setCurrentAlgo(algoName) {
  currentAlgo = getAlgo(algoName);
  renderDescription(currentAlgo);
  renderAlgoRuntime(currentAlgo);
}

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
function generateOptionEl(optionName) {
  const algoEl = document.createElement('option');
  algoEl.textContent = optionName;
  algoEl.setAttribute('value', optionName);
  return algoEl
}

// renderDescription - side-effects: Modifies DOM
function renderDescription(currentAlgo) {
  const algoDescriptionContainerEl = document.createElement('div');
  const algoNameEl = document.createElement('h2');
  const algoArgumentsEl = document.createElement('div');
  const algoDescriptionEl = document.createElement('p');

  // setup algoName
  algoNameEl.textContent = currentAlgo.name;

  // setup algoDescription
  algoDescriptionEl.textContent = currentAlgo.description;

  // setup algoArguments
  const argumentsLabelEl = document.createElement('h3');
  const argumentsValueEl = document.createElement('span');
  argumentsLabelEl.textContent = 'Argument(s): ';
  argumentsValueEl.textContent = currentAlgo.args;
  argumentsLabelEl.append(argumentsValueEl)
  algoArgumentsEl.append(argumentsLabelEl);

  // add all to DOM
  algoDescriptionContainerEl.append(algoNameEl, algoArgumentsEl, algoDescriptionEl)

  const descriptionSection = document.querySelector('#algo__description');
  descriptionSection.innerHTML = '';
  descriptionSection.append(algoDescriptionContainerEl);
}


// renderAlgoRuntime - side-effects: modifies DOM
function renderAlgoRuntime(currentAlgo) {
  const algoRuntimeContainerEl = document.createElement('div');
  const algoRuntimeLabelEl = document.createElement('label');
  const algoRuntimeInputEl = document.createElement('input');
  const algoRuntimeResultEl = document.createElement('p');
  const algoRuntimeButtonEl = document.createElement('input');
  
  // setup label
  algoRuntimeLabelEl.textContent = 'Enter arguments here:';
  algoRuntimeLabelEl.setAttribute('for', 'arguments');
  algoRuntimeInputEl.setAttribute('id', 'algoLabel');

  // create text input
  algoRuntimeInputEl.setAttribute('type', 'text');
  algoRuntimeInputEl.setAttribute('id', 'arguments');
  algoRuntimeInputEl.setAttribute('name', 'arguments');
  algoRuntimeInputEl.setAttribute('placeholder', currentAlgo.args)

  // create result element
  algoRuntimeResultEl.setAttribute('id', 'result');

  // create submit button
  algoRuntimeButtonEl.setAttribute('type', 'submit');
  algoRuntimeButtonEl.setAttribute('value', 'Run Algorithm');
  algoRuntimeButtonEl.setAttribute('id', 'submit-button')
  
  algoRuntimeContainerEl.append(
    algoRuntimeLabelEl,
    algoRuntimeInputEl,
    algoRuntimeResultEl,
    algoRuntimeButtonEl);

  const algoRuntimeSection = document.querySelector('#algo__runtime');
  algoRuntimeSection.innerHTML = '';
  algoRuntimeSection.append(algoRuntimeContainerEl);

  // submit button event listener
  document.querySelector('#submit-button').addEventListener('click', (e) => {
    const argStr = document.querySelector('#arguments').value;
    const argArr = generateArgArrFromStr(argStr);
    console.log(argArr)

    const result = currentAlgo.funcBody(...argArr);

    // render result to #result
    const resultEl = document.querySelector('#result');
    resultEl.textContent = result;
  })
}

// // function to get argument array from argument string (as Numbers)
function generateArgArrFromStr(argStr) {
  const argArr = argStr.split(',');
  return argArr.map((argument) => Number(argument.trim()));
}




