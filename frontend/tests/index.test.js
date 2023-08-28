const { getAlgo, getAllAlgosASYNC } = require("../src/index");
const { algos } = require("../../backend/controllers/algoController");

test("Should get an array of algos", async () => {
  const algoArr = await getAllAlgosASYNC();
  expect(algoArr.length).toBe(algos.length);
});

xtest("Should retrieve a specific algo by id", () => {
  const requestedAlgo = getAlgo("1");
  expect(requestedAlgo.name).toBe("sum5");
});

xtest("Should invoke an algo and return correct result", () => {
  const result = invokeAlgo("1", "100");
  expect(result).toBe(105);
});

// test("Should not hit cache on first invocation", () => {});

// test("Should hit cache after being previously invoked", () => {});

// test("Should create an indexedDB database", () => {});

// test("Should properly add a value to the cache", () => {});
