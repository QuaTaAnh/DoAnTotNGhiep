import { routes } from "../config/routes";
import OnlyHeader from "../layouts/OnlyHeader";
import Home from "../views/Home/Home";

export const publicRoutes = [
  {
    path: routes.home,
    component: Home,
  },
  {
    path: routes.about,
    component: Home,
  },
  {
    path: "testLayout",
    component: Home,
    layout: OnlyHeader,
  },
];
