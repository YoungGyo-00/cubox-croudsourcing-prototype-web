export const isEmptyObj = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const isNotEmptyArr = <T>(array: T[]) => {
  return array.length !== 0;
};
