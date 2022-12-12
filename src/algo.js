class Algo {
  constructor(name, description, args, run) {
    this.name = name,
    this.description = description,
    this.args = args,
    this.run = run
  }
}

const algos = [];

const getAlgos = () => algos;

const add5 = new Algo('add5', 'add 5 to the provided number',[100], ((num) => (num + 5)));
const filter = new Algo('square', 'square the provided number', [3], (num) => num*num);
const reduce = new Algo('addNums', 'return the sum of the provided numbers', [1, 10], (num1, num2) => num1 + num2);

algos.push(add5)
algos.push(filter)
algos.push(reduce)

function getAlgo(algoName) {
  return algos.find((algo) => algo.name === algoName);
}

export { getAlgos, Algo, getAlgo}