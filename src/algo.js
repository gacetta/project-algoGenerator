import isEven from "./fake_backend/isEven";
import isPrime from "./fake_backend/isPrime";
import add5 from "./fake_backend/add5"
import square from "./fake_backend/square";
import sumAll from './fake_backend/sumAll';

class Algo {
  constructor(name, description, args, funcBody) {
    this.name = name,
    this.description = description,
    this.args = args,
    this.funcBody = funcBody
  }
}

const algos = [add5, isEven, isPrime, square, sumAll];

// const add5 = new Algo(
//   'add5', 
//   'Takes one argument of type number.  add5 returns the sum of the provided number and 5', 
//   ['number'],
//   ((num) => (num + 5))
// );
// const isEven = new Algo(
//   'isEven',
//   'Takes one argument of type number.  isEven returns a boolean: true if provided number is even, false if odd',
//   ['number'],
//   (num) => num % 2 === 0
// )

// const sumAll = new Algo(
//   'sumAll',
//   'Takes any number of arguments of type number.  sumAll returns the sum of all provided numbers',
//   ['any amount of numbers'],
//   function(...num) {
//     if (num.length < 1) return 0;
//     return num.reduce((acc, curr) => acc + curr, 0)
//   }
// )

// algos.push(add5)
// algos.push(isEven)
// algos.push(sumAll)

function getAlgo(algoName) {
  return algos.find((algo) => algo.name === algoName);
}

const getAlgos = () => algos;

export { getAlgos, getAlgo}