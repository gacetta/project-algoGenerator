const add5 = {
  name: 'add5',
  description: 'Takes one argument of type number.  \nadd5 returns the sum of the provided number and 5',
  args: ['number'],
  funcBody: (num) => num + 5
}

export { add5 as default }