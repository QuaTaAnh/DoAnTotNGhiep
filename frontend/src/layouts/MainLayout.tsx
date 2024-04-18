import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ILayout } from "./type";
import { Container, Grid } from "@mui/material";
import styled from "@emotion/styled";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

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

const MainLayout: React.FC<ILayout> = ({ children }: ILayout) => {
  const loading = useSelector((state: boolean | any) => state.loading);

  return (
    <MainStyle>
      <Header />
      <ContentStyle>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ marginTop: "64px" }}>
            <Container maxWidth="lg">{children}</Container>
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

export default MainLayout;
