const algo = require("../../fake_backend/isEven");
const { algos: allAlgos } = require("../../controllers/algoController");

test("Should have a name", () => {
  const algoName = algo.name;
  expect(algoName).not.toBeNull();
});

test("Should have a description", () => {
  const algoDescription = algo.description;
  expect(algoDescription).not.toBeNull();
});

test("Should know required number of expected arguments", () => {
  const numberOfArguments = algo.args.length;
  expect(numberOfArguments).toBe(1);
});

test("Should know required type of expected arguments", () => {
  const typeOfArguments = algo.args;
  expect(typeOfArguments).toEqual(["number"]);
});

test("Should have a unique id:", () => {
  // check that the algo has an id
  const id = algo.id;
  expect(id).not.toBeNull();

  // check for self uniqueness amongst all algorithm ids
  const cache = {};
  allAlgos.forEach((algo) => {
    cache[algo.id] ? cache[algo.id]++ : (cache[algo.id] = 1);
  });
  expect(cache[id]).toBe(1);
});

test("Should return correct result with valid arguments", () => {
  const result = algo.funcBody(10);
  expect(result).toBe(true);
});
