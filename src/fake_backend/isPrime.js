function isPrime(num) {
  if (num < 2) return false;

  const maxCheck = Math.floor(Math.sqrt(num));

  for (let i = 2; i <= maxCheck; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export { isPrime as default }