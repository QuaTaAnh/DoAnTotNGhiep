import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { CustomTabPanel, a11yProps } from "../../components/CustomTabPanel";
import PostAll from "./components/PostAll";
import PostNew from "./components/PostNew";
import PostFollow from "./components/PostFollow";

const Home: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        Danh sách tin đăng
      </Typography>
      <Grid item md={12} display={"flex"}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs value={value} onChange={handleChange} textColor="inherit">
            <Tab
              label="Tất cả"
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
              }}
            />
            <Tab
              label="Mới nhất"
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
              }}
            />
            <Tab
              label="Đang theo dõi"
              {...a11yProps(2)}
              sx={{
                textTransform: "none",
              }}
            />
          </Tabs>
        </Box>
      </Grid>
      <CustomTabPanel value={value} index={0}>
        <PostAll />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PostNew />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PostFollow />
      </CustomTabPanel>
    </Container>
  );
};

export default Home;
