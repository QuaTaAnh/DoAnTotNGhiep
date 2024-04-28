import { routes } from "../config/routes";
import HomeRentLayout from "../layouts/HomeRentLayout";
import OnlyHeader from "../layouts/OnlyHeader";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Rent from "../pages/Rent";

export const publicRoutes = [
  { path: routes.test, component: Test, layout: null },
  { path: routes.test, component: Test, layout: OnlyHeader },
  {
    path: routes.home,
    component: Home,
    navigate: routes.login,
    layout: HomeRentLayout,
  },
  {
    path: routes.apartmentRent,
    component: Rent,
    navigate: routes.login,
    layout: HomeRentLayout,
  },
  {
    path: routes.groundRent,
    component: Rent,
    navigate: routes.login,
    layout: HomeRentLayout,
  },
  {
    path: routes.motelRoomRent,
    component: Rent,
    navigate: routes.login,
    layout: HomeRentLayout,
  },
  {
    path: routes.houseRent,
    component: Rent,
    navigate: routes.login,
    layout: HomeRentLayout,
  },
];
