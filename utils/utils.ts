// this is helpful when dealing with request queries
const strArray = (arr: string[] | string) => {
  return Array.isArray(arr) ? arr.join() : arr;
};

export { strArray };
