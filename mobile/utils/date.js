const convertToDateOnly = (time) => {
  const date = new Date(Number(Date.parse(time)));
  return date.toLocaleDateString();
};

const convertToDate = (time) => {
  const date = new Date(Number(Date.parse(time)));
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

const convertToNgayThang = (time) => {
  const date = new Date(Number(Date.parse(time)));
  return date.getDate() + "/" + (date.getMonth() + 1);
};

export { convertToDateOnly, convertToDate, convertToNgayThang };


