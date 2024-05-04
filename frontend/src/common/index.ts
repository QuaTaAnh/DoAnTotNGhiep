export const formatToString = (keyword: string) => {
  return keyword
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};

export const formatPrice = (value: number): string => {
  return value.toLocaleString("vi-VN");
};
