import moment from "moment";
import HCM from "../assets/images/hcm.jpg";
import HN from "../assets/images/hn.jpg";
import DN from "../assets/images/dn.jpg";

const currentMonthYear = moment().format("MM/YYYY");

export const TEXT_TITLE = `Cho Thuê Nhà Trọ, Phòng Trọ Đầy Đủ Tiện Ích Tháng ${currentMonthYear}`;

export const LOCATION = [
  {
    id: 1,
    name: "Phòng trọ Tp Hồ Chí Minh",
    image: HCM,
  },
  {
    id: 2,
    name: "Phòng trọ Hà Nội",
    image: HN,
  },
  {
    id: 3,
    name: "Phòng trọ Đà Nẵng",
    image: DN,
  },
];
