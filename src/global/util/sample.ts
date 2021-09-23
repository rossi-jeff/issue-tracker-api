export const sample = (array: any) => {
  let idx = Math.floor(Math.random() * array.length);
  return array[idx];
};
