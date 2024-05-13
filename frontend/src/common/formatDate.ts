import moment from "moment";

export const formatDateToDayMonthYear = (dateString: string): string => {
  const date = moment(dateString, "YYYY-MM-DD");
  return date.format("DD/MM/YYYY");
};

export const formatDate = (dateString: string | any): string => {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  return `${date < 10 ? "0" + date : date}-${
    month < 10 ? "0" + month : month
  }-${year} ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const formatDateComment = (date: string) => {
  moment.locale("vn");
  return moment(date).fromNow();
};

export const expirationDate = (date: string) => {
  const start = new Date(date);
  start.setDate(start.getDate() + 5);
  start.setHours(0, 0, 0, 0);
  return start;
};
