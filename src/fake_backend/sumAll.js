const sumAll = {
  name: 'sumAll',
  description: 'Takes any amount of numbers.  sumAll returns the sum of all provided numbers',
  args: ['array-of-numbers', 'string', 'boolen'],
  funcBody: function sumAll(...nums) {
              return nums.reduce((acc, curr) => acc + curr)
            }
}

export { sumAll as default }