import {
  Avatar,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NoImage from "../../assets/images/noImage.jpg";
import { CustomTabPanel, a11yProps } from "../../components/CustomTabPanel";
import PostActive from "./components/PostActive";

const ManagePost: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        Quản lý tin đăng
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box display={"flex"} alignItems={"center"}>
            <Avatar
              alt="Avatar"
              sx={{ marginRight: "10px" }}
              src={user?.avatar ?? NoImage}
            />
            <Typography
              sx={{ fontSize: "16px", fontWeight: 700, color: "#000" }}
            >
              {user?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs value={value} onChange={handleChange} textColor="inherit">
              <Tab
                label="Đang hiển thị"
                {...a11yProps(0)}
                sx={{
                  textTransform: "none",
                }}
              />
              <Tab
                label="Hết hạn"
                {...a11yProps(1)}
                sx={{
                  textTransform: "none",
                }}
              />
              <Tab
                label="Bị từ chối"
                {...a11yProps(2)}
                sx={{
                  textTransform: "none",
                }}
              />
              <Tab
                label="Chờ duyệt"
                {...a11yProps(3)}
                sx={{
                  textTransform: "none",
                }}
              />
              <Tab
                label="Đã ẩn"
                {...a11yProps(4)}
                sx={{
                  textTransform: "none",
                }}
              />
            </Tabs>
          </Box>
        </Grid>
        <CustomTabPanel value={value} index={0}>
          <PostActive />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Hết hạn
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Bị từ chối
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Chờ duyệt
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Đã ẩn
        </CustomTabPanel>
      </Grid>
    </Container>
  );
};

export default ManagePost;
