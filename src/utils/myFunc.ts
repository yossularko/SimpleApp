export const mySum = (arr: number[]) => {
  if (arr.length === 0) {
    return 0;
  }

  const reduce = arr.reduce((acc, curr) => acc + curr, 0);
  return reduce;
};
