import { routes } from "../config/routes";
import OnlyHeader from "../layouts/OnlyHeader";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Test from "../pages/Test";

export const publicRoutes = [
  { path: routes.test, component: Test, layout: null },
  { path: routes.test, component: Test, layout: OnlyHeader },
  { path: routes.home, component: Home },
  { path: routes.login, component: Login },
];
