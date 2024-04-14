import { routes } from "../config/routes";
import OnlyHeader from "../layouts/OnlyHeader";
import Home from "../pages/Home";
import Test from "../pages/Test";

export const publicRoutes = [
  { path: routes.test, component: Test, layout: null },
  { path: routes.test, component: Test, layout: OnlyHeader },
  { path: routes.home, component: Home, navigate: routes.login },
];
