import { getAlgos, getAlgo } from './algo'


const algos = getAlgos();
let currentAlgo;

// setCurrentAlgo('add5');
renderAlgoSelect(algos);

// setCurrentAlgo - side-effects: modifies currentAlgo
function setCurrentAlgo(algoName) {
  currentAlgo = getAlgo(algoName);
  renderDescription(currentAlgo);
  renderAlgoRuntime(currentAlgo);
}

// renderAlgoSelect
function renderAlgoSelect(algoArr) {
  const algoSelect = document.querySelector('#algo__select');
  const labelEl = document.createElement('label');
  const dropdownMenuEl = document.createElement('select');

  // setup label
  labelEl.setAttribute('id', 'algo__select--label')
  labelEl.classList.add('header-medium')
  labelEl.setAttribute('for', 'algo-names')
  labelEl.textContent = 'Choose an algorithm:';

  // setup dropdown menu
  dropdownMenuEl.setAttribute('name', 'algo-names');
  dropdownMenuEl.setAttribute('id', 'algo__select--dropdown');
  dropdownMenuEl.classList.add('input-handler')
  dropdownMenuEl.required = true;

  // setup default option
  const defaultOption = generateOptionEl('Select an algo');
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdownMenuEl.append(defaultOption);
  
  // iterate over algos and add each as an option
  algoArr.forEach((algo) => {
    const optionEl = generateOptionEl(algo.name);
    dropdownMenuEl.append(optionEl);
  })

  // add dropdownEl to DOM
  algoSelect.append(labelEl, dropdownMenuEl);

  //add eventlistener to dropdownMenuEl
  dropdownMenuEl.addEventListener('change', (e) => {
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
  const descriptionSection = document.querySelector('#algo__description');
  const algoContainerEl = document.createElement('div');
  const algoNameEl = document.createElement('h2');
  const algoArgumentsEl = document.createElement('h3');
  const algoDescriptionEl = document.createElement('p');

  // setup container
  algoContainerEl.setAttribute('id', 'algo__description--container')

  // setup algo name
  algoNameEl.textContent = currentAlgo.name;
  algoNameEl.setAttribute('id', 'algo__description--name');
  algoNameEl.classList.add('header-large');

  // setup algoArguments
  const plural = currentAlgo.args.length > 1 ? 's' : '';
  algoArgumentsEl.textContent = `Argument${plural}: ${currentAlgo.args}`;
  algoArgumentsEl.setAttribute('id', 'algo__description--args');
  algoArgumentsEl.classList.add('header-small');

  // setup algoDescription
  algoDescriptionEl.textContent = currentAlgo.description;
  algoDescriptionEl.setAttribute('id', 'algo__description--body')

  // // add all to DOM
  descriptionSection.innerHTML = '';
  algoContainerEl.append(algoNameEl, algoArgumentsEl, algoDescriptionEl)
  descriptionSection.append(algoContainerEl);
}

// renderAlgoRuntime - side-effects: modifies DOM
function renderAlgoRuntime(currentAlgo) {
  // const algoRuntimeContainerEl = document.createElement('div');
  const algoRuntimeSection = document.querySelector('#algo__runtime');
  const algoRuntimeHeaderEl = document.createElement('p');
  const algoRuntimeArgumentEl = document.createElement('div');
  const algoRuntimeResultEl = document.createElement('div');
  const algoRuntimeButtonEl = document.createElement('input');

  algoRuntimeSection.innerHTML = '';
  algoRuntimeSection.append(
    algoRuntimeHeaderEl,
    algoRuntimeArgumentEl,
    algoRuntimeResultEl,
    algoRuntimeButtonEl);

  // setup header algo__runtime--header
  algoRuntimeHeaderEl.textContent = 'Enter arguments here:';
  algoRuntimeHeaderEl.setAttribute('id', 'algo__runtime--header');
  algoRuntimeHeaderEl.classList.add('header-medium');
  
  // setup label and text input for each argument
  const argArr = currentAlgo.args
  argArr.forEach((arg, index) => {
    const argContainerEl = document.createElement('div');
    const argLabelEl = document.createElement('label');
    const argInputEl = document.createElement('input');
    const argType = arg;

    // setup container
    argContainerEl.classList.add('argContainer');

    // setup arg label
    argLabelEl.classList.add('argLabel');
    argLabelEl.setAttribute('for', `arg${index}`);
    argInputEl.classList.add('header-small');
    argLabelEl.textContent = argType;

    // setup arg input
    argInputEl.classList.add('argInput', 'input-handler');
    argInputEl.setAttribute('type', 'text');
    argInputEl.setAttribute('id', `arg${index}`);
    argInputEl.setAttribute('name', `arg${index}`);
    argInputEl.setAttribute('placeholder', `enter a ${arg}`)

    // append to DOM
    argContainerEl.append(argLabelEl, argInputEl)
    algoRuntimeArgumentEl.append(argContainerEl);
  })

  // create result element
  algoRuntimeResultEl.setAttribute('id', 'result');

  // create submit button
  algoRuntimeButtonEl.setAttribute('type', 'submit');
  algoRuntimeButtonEl.setAttribute('value', 'Run Algorithm');
  algoRuntimeButtonEl.classList.add('input-handler')
  algoRuntimeButtonEl.setAttribute('id', 'submit-button')

  // submit button event listener
  document.querySelector('#submit-button').addEventListener('click', (e) => {
    // args to be passed to our selected algo
    const argArr = [];

    // data sanitization (for now - make every argument a number and push to argArr)
    currentAlgo.args.forEach((arg, index) => {
      const dataType = arg;
      const inputValueAsStr = document.querySelector(`#arg${index}`).value
      // const inputValueTyped = processData(dataType, inputValueAsStr)
      const inputValueTyped = Number(inputValueAsStr)
      argArr.push(inputValueTyped)
    })

    // invoke currentAlgo
    const result = currentAlgo.funcBody(...argArr);

    // render result to #result
    const resultEl = document.querySelector('#result');
    const resultContainerEl = document.createElement('div');
    const resultSummaryEl = document.createElement('p');
    const resultValueEl = document.createElement('p');
  
    // setup result container
    resultContainerEl.setAttribute('id', 'result-container');
    
    // setup summary el
    resultSummaryEl.textContent = `Result of ${currentAlgo.name} (${argArr})`;
    resultSummaryEl.setAttribute('id', 'result-summary');
    resultSummaryEl.classList.add('header-medium')

    // setup result value
    resultValueEl.textContent = result;
    resultValueEl.classList.add('result-value')

    resultEl.innerHTML = '';
    resultContainerEl.append(resultSummaryEl, resultValueEl)
    resultEl.append(resultContainerEl)

    // update button text to "run again"
    algoRuntimeButtonEl.setAttribute('value', 'Run Again')

    // clear input fields
    const argFields = document.querySelectorAll('.argInput');
    argFields.forEach((element) => element.value='');
  })
}



