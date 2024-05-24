import { routes } from "../config/routes";
import OnlyHeader from "../layouts/OnlyHeader";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import CreatePost from "../pages/CreatePost";
import PostDetail from "../pages/PostDetail";
import PersonalUser from "../pages/PersonalUser";
import ManagePost from "../pages/ManagePost";
import SavePost from "../pages/SavePost";
import Dashboard from "../pages/Admin/Dashboard";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageCategories from "../pages/Admin/ManageCategories";
import ManagePosts from "../pages/Admin/ManagePosts";
import ManageFollow from "../pages/ManageFollow";
import Chat from "../pages/Chat";

export const publicRoutes = [
  { path: routes.dashboard, component: Dashboard },
  {
    path: routes.home,
    component: Home,
    navigate: routes.login,
    title: "Home - Connect Housing",
  },
  {
    path: routes.search,
    component: SearchPage,
    navigate: routes.login,
    title: "Search - Connect Housing",
  },
  {
    path: routes.profile,
    component: Profile,
    navigate: routes.login,
    layout: OnlyHeader,
    title: "Profile - Connect Housing",
  },
  {
    path: routes.editProfile,
    component: EditProfile,
    navigate: routes.login,
    layout: OnlyHeader,
    title: "Update Profile - Connect Housing",
  },
  {
    path: routes.createPost,
    component: CreatePost,
    navigate: routes.login,
    layout: OnlyHeader,
    title: "Create Post - Connect Housing",
  },
  {
    path: routes.postDetail,
    component: PostDetail,
    navigate: routes.login,
    title: "Post Detail - Connect Housing",
  },
  {
    path: routes.personalUser,
    component: PersonalUser,
    navigate: routes.login,
    title: "Personal Page - Connect Housing",
  },
  {
    path: routes.managePost,
    component: ManagePost,
    navigate: routes.login,
    layout: OnlyHeader,
    title: "Manage Post - Connect Housing",
  },
  {
    path: routes.savePost,
    component: SavePost,
    navigate: routes.login,
    layout: OnlyHeader,
    title: "Save Post - Connect Housing",
  },
  {
    path: routes.manageUser,
    component: ManageUsers,
    navigate: routes.login,
    title: "Manage User - Connect Housing",
  },
  {
    path: routes.manageCategory,
    component: ManageCategories,
    navigate: routes.login,
    title: "Manage Category - Connect Housing",
  },
  {
    path: routes.managePosts,
    component: ManagePosts,
    navigate: routes.login,
    title: "Manage Post - Connect Housing",
  },
  {
    path: routes.follow,
    component: ManageFollow,
    navigate: routes.login,
    layout: OnlyHeader,
    title: "Follow - Connect Housing",
  },
  {
    path: routes.chat,
    component: Chat,
    navigate: routes.login,
    layout: OnlyHeader,
    title: "Chat - Connect Housing",
  },
];
