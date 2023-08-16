export const dates = (start: string, end: string) => {
  const startDate = new Date(start);
  let endDate;
  if (end.length < 1) endDate = new Date();
  else endDate = new Date(end);

  if (startDate.getUTCFullYear() > endDate.getUTCFullYear()) return "";

  if (startDate.getUTCFullYear() === endDate.getUTCFullYear()) {
    return `${
      endDate.getMonth() - startDate.getMonth()
    } months (${startDate.getUTCFullYear()})`;
  } else {
    return `${
      endDate.getUTCFullYear() - startDate.getUTCFullYear()
    } years (${endDate.getUTCFullYear()}-${startDate.getUTCFullYear()})`;
  }
};
