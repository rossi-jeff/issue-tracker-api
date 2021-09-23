export const EnumToArray = (enumArg: any) => {
  const values: string[] = [];

  for (const value in enumArg) {
    if (typeof enumArg[value] === 'number') {
      values.push(value);
    }
  }

  return values;
};
