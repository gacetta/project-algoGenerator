const square = {
  name: 'square',
  description: 'Takes one argument of type number.  \nsquare returns the result of squaring the provided number',
  args: ['number'],
  funcBody: (num) => num ** 2
}

export { square as default }