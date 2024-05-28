import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomTabPanel, a11yProps } from "../../components/CustomTabPanel";
import { useLocation } from "react-router-dom";
import Follower from "./components/Follower";
import Following from "./components/Following";
import { useTranslation } from "react-i18next";

const ManageFollow: React.FC = () => {
  const {t} = useTranslation()
  const [value, setValue] = useState<number>(0);
  const location = useLocation();
  const { data } = location.state;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        {t('follow')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs value={value} onChange={handleChange} textColor="inherit">
              <Tab
                label={t('tab.follower')}
                {...a11yProps(0)}
                sx={{
                  textTransform: "none",
                }}
              />
              <Tab
                label={t('tab.following')}
                {...a11yProps(1)}
                sx={{
                  textTransform: "none",
                }}
              />
            </Tabs>
          </Box>
        </Grid>
        <CustomTabPanel value={value} index={0}>
          <Follower data={data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Following data={data} />
        </CustomTabPanel>
      </Grid>
    </Container>
  );
};

export default ManageFollow;
