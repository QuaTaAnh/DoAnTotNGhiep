import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { CustomTabPanel, a11yProps } from "../../../components/CustomTabPanel";
import { useState } from "react";
import PostActive from "./components/PostActive";
import PostExpired from "./components/PostExpired";
import PostHidden from "./components/PostHidden";

const ManagePosts: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        Quản lý tin đăng
      </Typography>
      <Grid item md={12} display={"flex"} justifyContent={"center"}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs value={value} onChange={handleChange} textColor="inherit">
            <Tab
              label="Hoạt động"
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
              label="Tin ẩn"
              {...a11yProps(2)}
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
        <PostExpired />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PostHidden />
      </CustomTabPanel>
    </Container>
  );
};

export default ManagePosts;
