import moment from "moment";

export const formatDateToDayMonthYear = (dateString: string): string => {
  const date = moment(dateString, "YYYY-MM-DD");
  return date.format("DD/MM/YYYY");
};

export const formatDate = (dateString: string): string => {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  return `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  } ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const formatDateComment = (date: string) => {
  moment.locale("vn");
  return moment(date).fromNow();
};
