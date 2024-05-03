import { routes } from "../config/routes";
import HomeRentLayout from "../layouts/HomeRentLayout";
import OnlyHeader from "../layouts/OnlyHeader";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Rent from "../pages/Rent";
import SearchPage from "../pages/SearchPage";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import CreatePost from "../pages/CreatePost";

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
  {
    path: routes.search,
    component: SearchPage,
    navigate: routes.login,
  },
  {
    path: routes.profile,
    component: Profile,
    navigate: routes.login,
    layout: OnlyHeader,
  },
  {
    path: routes.editProfile,
    component: EditProfile,
    navigate: routes.login,
    layout: OnlyHeader,
  },
  {
    path: routes.createPost,
    component: CreatePost,
    navigate: routes.login,
    layout: OnlyHeader,
  },
];
