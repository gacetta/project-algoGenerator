function sumNums(...nums) {
  return nums.reduce((acc, curr) => acc + curr)
}

export { sumNums as default }