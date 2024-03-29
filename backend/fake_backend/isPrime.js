const isPrime = {
  id: `3`,
  name: "isPrime",
  description:
    "Takes one argument of type number. \n isPrime returns boolean: true if provided number is prime number, false if not",
  args: ["number"],
  funcBody: function isPrime(num) {
    if (num < 2) return false;

    const maxCheck = Math.floor(Math.sqrt(num));

    for (let i = 2; i <= maxCheck; i++) {
      if (num % i === 0) return false;
    }
    return true;
  },
};

module.exports = isPrime;
