import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { routes } from "../../config/routes";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { Link, useLocation } from "react-router-dom";

const SidebarCustom: React.FC = () => {
  const location = useLocation();

  const SETTINGS = [
    {
      id: 1,
      icon: <ShowChartIcon fontSize="small" />,
      title: "Thống kê",
      navigate: routes.dashboard,
    },
    {
      id: 2,
      icon: <PeopleAltIcon fontSize="small" />,
      title: "Quản lý người dùng",
      navigate: routes.manageUser,
    },
    {
      id: 3,
      icon: <CategoryIcon fontSize="small" />,
      title: "Quản lý danh mục",
      navigate: routes.manageCategory,
    },
    {
      id: 4,
      icon: <DynamicFeedIcon fontSize="small" />,
      title: "Quản lý tin đăng",
      navigate: routes.managePosts,
    },
  ];
  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#111827",
        position: "fixed",
        overflowY: "auto",
        height: "100%",
        width: "280px",
      }}
    >
      {SETTINGS.map((setting) => (
        <Link
          key={setting.id}
          to={setting.navigate}
          style={{
            textDecoration: "none",
          }}
        >
          <MenuItem
            sx={{
              padding: "10px 16px",
              margin: "6px 0",
              backgroundColor:
                location.pathname === setting.navigate ? "#19202f" : "#111827",
              color: "#fff",
              borderRadius: "5px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#19202f",
              },
            }}
          >
            {setting.icon}
            <Typography textAlign="center" fontSize={14} marginLeft={"10px"}>
              {setting.title}
            </Typography>
          </MenuItem>
        </Link>
      ))}
    </Box>
  );
};

export default SidebarCustom;
