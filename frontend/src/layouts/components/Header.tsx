import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NoImage from "../../assets/images/noImage.jpg";
import Logo from "../../assets/images/logo.png";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout as logoutFunction } from "../../utils/auth";
import { showSnackbar } from "../../redux/snackbarRedux";
import { routes } from "../../config/routes";
import SearchInput from "../../components/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import { getCategory } from "../../redux/callApi";
import slugify from "slugify";
import { ICategory } from "../../type";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const SETTINGS = [
    {
      id: 1,
      icon: <AddIcon fontSize="small" />,
      title: t("newPost"),
      navigate: routes.createPost,
    },
    {
      id: 2,
      icon: <WidgetsIcon fontSize="small" />,
      title: t("managePost"),
      navigate: routes.managePost,
    },
    {
      id: 3,
      icon: <FavoriteIcon fontSize="small" />,
      title: t("savePost"),
      navigate: "/stor3",
    },
    {
      id: 4,
      icon: <PersonIcon fontSize="small" />,
      title: t("personalInformation"),
      navigate: routes.profile,
    },
    {
      id: 5,
      icon: <LogoutIcon fontSize="small" />,
      title: t("logout"),
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const { categories } = useSelector((state: RootState) => state.api);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpenMenu(null);
  };

  const handleLogout = () => {
    try {
      logoutFunction(dispatch);
      localStorage.removeItem("access_token");
      dispatch(
        showSnackbar({ message: "Đăng xuất thành công", type: "success" })
      );
      window.location.href = routes.login;
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã xảy ra lỗi", type: "error" }));
    }
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ height: "64px", backgroundColor: "#FFF", boxShadow: "none" }}
      >
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Toolbar sx={{ height: "100%" }}>
            <Link to={routes.home} style={{ marginRight: "100px" }}>
              <div style={{ width: "100px", height: "64px" }}>
                <Avatar
                  alt="Logo"
                  src={Logo}
                  sx={{ width: "100%", height: "100%" }}
                />
              </div>
            </Link>
            <IconButton onClick={handleOpenMenu} size="large" sx={{ m: 0.5 }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {categories.map((category: ICategory) => (
                <MenuItem>
                  <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={`/${slugify(category.value, {
                      lower: true,
                      strict: true,
                    })}`}
                    state={category.id}
                  >
                    {category.value}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            <Box>
              <SearchInput />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: {
                  md: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  xs: "none",
                },
              }}
            >
              <LanguageSwitcher />
              <IconButton size="large" sx={{ m: 0.5 }}>
                <Badge badgeContent={6} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" sx={{ m: 0.5 }}>
                <Badge badgeContent={9} color="error">
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ m: 0.5 }}>
                  <Avatar alt="Avatar" src={user?.avatar ?? NoImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={openMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(openMenu)}
                onClose={handleCloseUserMenu}
              >
                {SETTINGS.map((setting) =>
                  setting.navigate ? (
                    <Link
                      to={setting.navigate}
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      <MenuItem key={setting.id}>
                        {setting.icon}
                        <Typography
                          textAlign="center"
                          fontSize={14}
                          marginLeft={"10px"}
                        >
                          {setting.title}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ) : (
                    <MenuItem
                      key={setting.id}
                      onClick={() => {
                        handleCloseUserMenu();
                        setting.id === 5 && handleLogout();
                      }}
                    >
                      {setting.icon}
                      <Typography
                        textAlign="center"
                        fontSize={14}
                        marginLeft={"10px"}
                      >
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
              <Tooltip title="New Post">
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    width: "144px",
                    height: "36px",
                    fontSize: "14px",
                    marginLeft: "20px",
                    backgroundColor: "#fa6819",
                    "&:hover": {
                      backgroundColor: "#ed570e",
                    },
                  }}
                  onClick={() => navigate("/create-post")}
                >
                  <DriveFileRenameOutlineIcon />
                  {t("newPost")}
                </Button>
              </Tooltip>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                // onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
