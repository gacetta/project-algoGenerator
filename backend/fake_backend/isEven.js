const isEven = {
  id: `2`,
  name: "isEven",
  description:
    "Takes one argument of type number.  \nisEven returns a boolean: true if provided number is even, false if odd",
  args: ["number"],
  funcBody: (num) => num % 2 === 0,
};

module.exports = isEven;
