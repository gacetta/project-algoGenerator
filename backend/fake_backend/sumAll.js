const sumAll = {
  id: `5`,
  name: "sumAll",
  description:
    "Takes any amount of numbers.  sumAll returns the sum of all provided numbers",
  args: ["array-of-numbers"],
  funcBody: function sumAll(...nums) {
    return nums.reduce((acc, curr) => acc + curr);
  },
};

module.exports = sumAll;
