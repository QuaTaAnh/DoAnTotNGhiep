import {
  Badge,
  Box,
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomTabPanel, a11yProps } from "../../components/CustomTabPanel";
import PostAll from "./components/PostAll";
import PostNew from "./components/PostNew";
import PostFollow from "./components/PostFollow";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filter from "./components/Filter";
import Banner from "../../components/Banner";
import { useTranslation } from "react-i18next";
import ImageDetail from "../../components/ImageDetail";
import { SLIDERIMAGES } from "../../constants";
import PostRecent from "./components/PostRecent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const { locationUser } = useSelector((state: RootState) => state.user);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <ImageDetail images={SLIDERIMAGES} height="360px" hidden />
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          marginTop: "40px",
        }}
      >
        {t("listPosts")}
      </Typography>
      <Grid container>
        <Grid item md={12} display={"flex"}>
          <Box display={"flex"} alignItems={"center"}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs value={value} onChange={handleChange} textColor="inherit">
                <Tab
                  label={t("tab.all")}
                  {...a11yProps(0)}
                  sx={{
                    textTransform: "none",
                  }}
                />
                <Tab
                  label={t("tab.new")}
                  {...a11yProps(1)}
                  sx={{
                    textTransform: "none",
                  }}
                />
                <Tab
                  label={t("tab.following")}
                  {...a11yProps(2)}
                  sx={{
                    textTransform: "none",
                  }}
                />
              </Tabs>
            </Box>
            <Tooltip title="Lọc">
              <Box>
                <IconButton size="large" onClick={() => setIsOpen(true)}>
                  <Badge color="error" variant="dot" invisible={!isFiltered}>
                    <FilterAltIcon />
                  </Badge>
                </IconButton>
              </Box>
            </Tooltip>
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
        <Filter
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsFiltered={setIsFiltered}
        />
      </Grid>
      {locationUser !== null && (
        <>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              margin: "30px 0",
            }}
          >
            {t("recentPost")}
          </Typography>
          <PostRecent />
        </>
      )}
      <Banner />
    </Container>
  );
};

export default Home;
