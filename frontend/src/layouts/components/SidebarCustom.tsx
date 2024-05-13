import { Box, MenuItem, Typography } from "@mui/material";
import React from "react";
import { routes } from "../../config/routes";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

const SidebarCustom: React.FC = () => {
  const SETTINGS = [
    {
      id: 1,
      icon: <PeopleAltIcon fontSize="small" />,
      title: "Quản lý người dùng",
      navigate: routes.manageUser,
    },
    {
      id: 2,
      icon: <CategoryIcon fontSize="small" />,
      title: "Quản lý danh mục",
      navigate: routes.manageCategory,
    },
    {
      id: 3,
      icon: <CategoryIcon fontSize="small" />,
      title: "Quản lý tin đăng",
      navigate: routes.managePosts,
    },
  ];
  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#ccc",
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
              padding: "14px 10px",
              margin: "6px 0",
              backgroundColor: "#fa6819",
              color: "#fff",
              borderRadius: "5px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#ed570e",
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
