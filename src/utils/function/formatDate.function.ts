export const FormatDateStrToDDMMYYYY = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const FormatDateStrToMMHHDDMMYYYY = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};
