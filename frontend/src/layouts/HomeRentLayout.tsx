import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ILayout } from "./type";
import { Box, Container, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { LOCATION, TEXT_INFO, TEXT_TITLE } from "../constants";
import LocationButton from "../components/LocationButton";
import { AppDispatch, RootState } from "../redux/store";
import { getAcreage, getPrice } from "../redux/callApi";
import Sidebar from "../components/Sidebar";
import RelatedPost from "../components/RelatedPost";

// eslint-disable-next-line no-empty-pattern
const MainStyle = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
}));

// eslint-disable-next-line no-empty-pattern
const ContentStyle = styled("div")(({}) => ({
  flexGrow: 1,
  padding: "20px",
}));

// eslint-disable-next-line no-empty-pattern
const FooterStyle = styled("div")(({}) => ({
  textAlign: "center",
}));

const HomeRentLayout: React.FC<ILayout> = ({ children }: ILayout) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    dispatch(getPrice());
    dispatch(getAcreage());
  }, [dispatch]);

  return (
    <MainStyle>
      <Header />
      <ContentStyle>
        <Grid container spacing={2}>
          <Grid container sx={{ marginTop: "64px" }}>
            <Grid item md={12}>
              <Typography
                width={"100%"}
                sx={{
                  textAlign: "center",
                  margin: "40px 0",
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {TEXT_TITLE}
              </Typography>
            </Grid>

            <Container maxWidth="lg">
              <Grid container spacing={12}>
                {LOCATION.map((item: any) => (
                  <Grid key={item?.id} item xs={12} md={4}>
                    <LocationButton name={item?.name} image={item?.image} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "64px" }}>
            <Container maxWidth="lg">
              <Grid container>
                <Grid item md={8}>
                  {children}
                </Grid>
                <Grid item md={4}>
                  <Sidebar />
                  <RelatedPost />
                </Grid>
              </Grid>
            </Container>
            <Grid
              container
              sx={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item md={9.4}>
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "4px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    padding: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    {TEXT_INFO.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textTransform: "none",
                      margin: "5px 0",
                    }}
                  >
                    {TEXT_INFO.preface}
                  </Typography>
                  {TEXT_INFO.statistic.map((item: any) => (
                    <>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          textTransform: "none",
                          margin: "5px 0",
                          fontWeight: "700",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          textTransform: "none",
                          margin: "5px 0",
                        }}
                      >
                        {item.content}
                      </Typography>
                    </>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContentStyle>
      <FooterStyle>
        <Footer />
      </FooterStyle>
      {loading ? <Loading /> : null}
    </MainStyle>
  );
};

export default HomeRentLayout;
