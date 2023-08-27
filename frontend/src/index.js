let currentAlgo;
getAllAlgos();

function getAllAlgos() {
  fetch("/algos")
    .then((response) => response.json())
    .then((data) => {
      renderAlgoSelect(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

function getAlgo(id) {
  fetch(`/algos/${id}`)
    .then((response) => response.json())
    .then((currentAlgo) => {
      renderDescription(currentAlgo);
      renderAlgoRuntime(currentAlgo);
    })
    .catch((e) => {
      console.log(e);
    });
}

// render dropdown to select algorithm
function renderAlgoSelect(algoArr) {
  const algoSelect = document.querySelector("#algo__select");
  const labelEl = document.createElement("label");
  const dropdownMenuEl = document.createElement("select");

  // setup dropdown label
  labelEl.setAttribute("id", "algo__select--label");
  labelEl.classList.add("header-medium");
  labelEl.setAttribute("for", "algo-names");
  labelEl.textContent = "Choose an algorithm:";

  // setup dropdown menu
  dropdownMenuEl.setAttribute("name", "algo-names");
  dropdownMenuEl.setAttribute("id", "algo__select--dropdown");
  dropdownMenuEl.classList.add("input-handler");
  dropdownMenuEl.required = true;

  // setup default option (disabled and selected placeholder)
  const defaultOption = generateOptionEl({ name: "Select an algo", id: null });
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdownMenuEl.append(defaultOption);

  // iterate over algos and add each as an option
  algoArr.forEach((algo) => {
    const optionEl = generateOptionEl(algo);
    dropdownMenuEl.append(optionEl);
  });

  // add dropdownEl to DOM
  algoSelect.append(labelEl, dropdownMenuEl);

  //add eventlistener to dropdownMenuEl
  dropdownMenuEl.addEventListener("change", (e) => {
    getAlgo(e.target.value);
  });
}

// generate an option element for the dropdown menu
function generateOptionEl(algo) {
  const algoEl = document.createElement("option");
  algoEl.textContent = algo.name;
  algoEl.setAttribute("value", algo.id);
  return algoEl;
}

// render the description of the algorithm and the arguments
// side-effects: modifies DOM
function renderDescription(currentAlgo) {
  const descriptionSection = document.querySelector("#algo__description");
  const algoContainerEl = document.createElement("div");
  const algoNameEl = document.createElement("h2");
  const algoArgumentsEl = document.createElement("h3");
  const algoDescriptionEl = document.createElement("p");

  // setup container
  algoContainerEl.setAttribute("id", "algo__description--container");

  // setup algo name
  algoNameEl.textContent = currentAlgo.name;
  algoNameEl.setAttribute("id", "algo__description--name");
  algoNameEl.classList.add("header-large");

  // setup algo arguments
  const plural = currentAlgo.args.length > 1 ? "s" : "";
  algoArgumentsEl.textContent = `Argument${plural}: ${currentAlgo.args}`;
  algoArgumentsEl.setAttribute("id", "algo__description--args");
  algoArgumentsEl.classList.add("header-small");

  // setup algo description
  algoDescriptionEl.textContent = currentAlgo.description;
  algoDescriptionEl.setAttribute("id", "algo__description--body");

  // add all to the DOM
  descriptionSection.innerHTML = "";
  algoContainerEl.append(algoNameEl, algoArgumentsEl, algoDescriptionEl);
  descriptionSection.append(algoContainerEl);
}

// render input fields and submit button
// side-effects: modifies DOM
function renderAlgoRuntime(currentAlgo) {
  // const algoRuntimeContainerEl = document.createElement('div');
  const algoRuntimeSection = document.querySelector("#algo__runtime");
  const algoRuntimeHeaderEl = document.createElement("p");
  const algoRuntimeArgumentEl = document.createElement("div");
  const algoRuntimeResultEl = document.createElement("div");
  const algoRuntimeButtonEl = document.createElement("input");

  algoRuntimeSection.innerHTML = "";
  algoRuntimeSection.append(
    algoRuntimeHeaderEl,
    algoRuntimeArgumentEl,
    algoRuntimeResultEl,
    algoRuntimeButtonEl
  );

  // setup header algo__runtime--header
  algoRuntimeHeaderEl.textContent = "Enter arguments here:";
  algoRuntimeHeaderEl.setAttribute("id", "algo__runtime--header");
  algoRuntimeHeaderEl.classList.add("header-medium");

  // setup label and text input for each argument
  const argArr = currentAlgo.args;
  argArr.forEach((arg, index) => {
    const argContainerEl = document.createElement("div");
    const argLabelEl = document.createElement("label");
    const argInputEl = document.createElement("input");
    const argType = arg;

    // setup container
    argContainerEl.classList.add("argContainer");

    // setup arg label
    argLabelEl.classList.add("argLabel");
    argLabelEl.setAttribute("for", `arg${index}`);
    argInputEl.classList.add("header-small");
    argLabelEl.textContent = argType;

    // setup arg input
    argInputEl.classList.add("argInput", "input-handler");
    argInputEl.setAttribute("type", "text");
    argInputEl.setAttribute("id", `arg${index}`);
    argInputEl.setAttribute("name", `arg${index}`);
    argInputEl.setAttribute("placeholder", `enter a ${arg}`);

    // append to DOM
    argContainerEl.append(argLabelEl, argInputEl);
    algoRuntimeArgumentEl.append(argContainerEl);
  });

  // create result element
  algoRuntimeResultEl.setAttribute("id", "result");

  // create submit button
  algoRuntimeButtonEl.setAttribute("type", "submit");
  algoRuntimeButtonEl.setAttribute("value", "Run Algorithm");
  algoRuntimeButtonEl.classList.add("input-handler");
  algoRuntimeButtonEl.setAttribute("id", "submit-button");

  // submit button event listener
  document.querySelector("#submit-button").addEventListener("click", (e) => {
    const currentArgs = processArgs(currentAlgo);
    const cacheKey = formatKeyToJSON(currentAlgo, currentArgs);

    connectToDB("algoGenerator").then((db) => {
      // cacheResult(db, { id: cacheKey, result: JSON.stringify("test") });
      getCachedResult(db, cacheKey).then(({ result }) => {
        if (result === null) {
          console.log("not hitting cache");
          invokeAlgo(currentAlgo, currentArgs);
        } else {
          console.log(`hit the cache!  result: ${result}`);
          const resultNum = parseInt(result);
          renderResult(resultNum);
        }
      });
    });

    // getCachedResult()
    // inputs: db, (key eventually)
    // returns: Promise - resolves to result
    function getCachedResult(db, key) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction("cachedResults", "readonly");
        const cachedResults = transaction.objectStore("cachedResults");

        // const key = "2-2";
        const getRequest = cachedResults.get(key);

        getRequest.onerror = (e) => {
          reject(e.target.error);
        };

        getRequest.onsuccess = (e) => {
          if (!e.target.result) resolve({ result: null });
          else resolve(e.target.result);
        };
      });
    }

    // connects to the indexedDB database
    // input: database name ('algoGenerator')
    // returns: Promise - resolves to db
    function connectToDB(dbName) {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName);

        // error handling
        request.onerror = (e) => {
          reject(e.target.error);
        };

        request.onsuccess = (e) => {
          const db = e.target.result;
          resolve(db);
        };

        // runs when first creating database
        // creates object store for cachedResults
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          // create new object Store to hold cached results
          const objectStore = db.createObjectStore("cachedResults", {
            keyPath: "id",
          });
        };
      });
    }

    function cacheResult(db, { id, result }) {
      const transaction = db.transaction("cachedResults", "readwrite");
      const cachedResults = transaction.objectStore("cachedResults");

      const request = cachedResults.add({ id, result });

      request.onsuccess = (e) => {
        console.log("newResult added to store:", request.result);
      };

      request.onerror = (e) => {
        console.log("error adding result:", request.error);
      };
    }

    // process Args
    // input: current algo (references args property)
    // output: an array containing each argument coerced to a number
    function processArgs(algo) {
      const argArr = [];

      // data sanitization (for now - make every argument a number and push to argArr)
      algo.args.forEach((arg, index) => {
        // const dataType = arg;
        const inputValueAsStr = document.querySelector(`#arg${index}`).value;
        // const inputValueTyped = processData(dataType, inputValueAsStr)
        const inputValueTyped = Number(inputValueAsStr);
        argArr.push(inputValueTyped);
      });

      return argArr;
    }

    // formats the algo and args into a unique id for DB
    // algo.id-args, ex. '1-5' or '3-[5,6]'
    function formatKeyToJSON(algo, args) {
      return JSON.stringify(`${algo.id}-${args}`);
    }

    // invoke algo with args and render result
    function invokeAlgo(algo, args) {
      fetch(`/algos/${algo.id}/run`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          args,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          connectToDB("algoGenerator").then((db) => {
            cacheResult(db, { id: cacheKey, result });
          });
          renderResult(result);
        })
        .catch((err) => console.log(err));
    }

    // render result to #result
    function renderResult(result) {
      const resultEl = document.querySelector("#result");
      const resultContainerEl = document.createElement("div");
      const resultSummaryEl = document.createElement("p");
      const resultValueEl = document.createElement("p");

      // setup result container
      resultContainerEl.setAttribute("id", "result-container");

      // setup summary el
      resultSummaryEl.textContent = `Result of ${currentAlgo.name} (${currentArgs})`;
      resultSummaryEl.setAttribute("id", "result-summary");
      resultSummaryEl.classList.add("header-medium");

      // setup result value
      resultValueEl.textContent = result;
      resultValueEl.classList.add("result-value");

      resultEl.innerHTML = "";
      resultContainerEl.append(resultSummaryEl, resultValueEl);
      resultEl.append(resultContainerEl);

      // update button text to "run again"
      algoRuntimeButtonEl.setAttribute("value", "Run Again");

      // clear input fields
      const argFields = document.querySelectorAll(".argInput");
      argFields.forEach((element) => (element.value = ""));
    }
  });
}
