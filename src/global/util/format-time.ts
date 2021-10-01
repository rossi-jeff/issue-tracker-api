export const zeroPad = (num: number, len: number = 2) => {
  let str: string = num.toString();
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
};

export const formatTime = (date: Date = null) => {
  if (!date) date = new Date();
  let hours = zeroPad(date.getHours());
  let minutes = zeroPad(date.getMinutes());
  let seconds = zeroPad(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};

export const formatDate = (date: Date = null) => {
  if (!date) date = new Date();
  let year = date.getFullYear();
  let month = zeroPad(date.getMonth() + 1);
  let day = zeroPad(date.getDate());
  return `${year}-${month}-${day}`;
};
