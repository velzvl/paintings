export default (created: string): string => {
  const result = {
    str: created,
  };
  while (result.str.length < 4) {
    result.str = `0${result.str}`;
  }
  return result.str;
};
