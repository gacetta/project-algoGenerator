const fibonacciNumber = {
  id: `6`,
  name: "fibonacciNumber",
  description:
    "Takes one argument of type number.  \nfibonacciNumber returns that number from the Fibonacci sequence.",
  args: ["number"],
  // funcBody: (num) => {
  //   if (num === 0) return 0;
  //   if (num === 1) return 1;

  //   let a = 0;
  //   let b = 1;

  //   while (num > 0) {
  //     [a, b] = [b, a + b];
  //     num--;
  //   }

  //   return a;
  // },
  funcBody: function (num) {
    if (num <= 1) return num;
    return this.funcBody(num - 1) + this.funcBody(num - 2);
  },
};

module.exports = fibonacciNumber;
