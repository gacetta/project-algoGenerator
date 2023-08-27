const fibonacciNumber = {
  id: `6`,
  name: "fibonacciNumber",
  description:
    "Takes one argument of type number.  \nfibonacciNumber returns that number from the Fibonacci sequence.",
  args: ["number"],
  funcBody: (num) => {
    if (num === 0) return 0;
    if (num === 1) return 1;

    let a = 0;
    let b = 1;

    while (num > 0) {
      [a, b] = [b, a + b];
      num--;
    }

    return a;
  },
};

module.exports = fibonacciNumber;

// slowfunc: (num) => {
//   if(num<=1){
//       return num;
//   }
//   return fib(num-1) + fib(num-2)
// };
