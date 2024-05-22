import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ILayout } from "./type";
import { Container, Grid } from "@mui/material";
import styled from "@emotion/styled";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SidebarCustom from "./components/SidebarCustom";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs";

// eslint-disable-next-line no-empty-pattern
const MainStyle = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
}));

// eslint-disable-next-line no-empty-pattern
const ContentStyle = styled("div")(({}) => ({
  flexGrow: 1,
  backgroundColor: "#f4f4f4",
}));

// eslint-disable-next-line no-empty-pattern
const FooterStyle = styled("div")(({}) => ({
  textAlign: "center",
}));

const MainLayout: React.FC<ILayout> = ({ children }: ILayout) => {
  const loading = useSelector((state: RootState) => state.loading);
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const homeBreadcrumb = {
    label: "Home",
    href: "/",
  };

  const breadcrumbs = [
    homeBreadcrumb,
    ...pathnames.map((pathname, index) => {
      const url = `/${pathnames.slice(0, index + 1).join("/")}`;
      const label = pathname.replace(/-/g, " ");
      return {
        label: label.charAt(0).toUpperCase() + label.slice(1),
        href: url,
      };
    }),
  ];

  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <MainStyle>
      <Header />
      <ContentStyle>
        <Grid container sx={{ marginTop: "64px" }}>
          {user?.isAdmin ? (
            <Grid item md={3}>
              <Container
                disableGutters
                sx={{
                  width: "100%",
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <SidebarCustom />
              </Container>
            </Grid>
          ) : (
            <></>
          )}
          <Grid item md={user?.isAdmin ? 9 : 12}>
            <Grid margin={2}>
              {user?.isAdmin ? <Breadcrumb items={breadcrumbs} /> : <></>}
            </Grid>
            <Container>{children}</Container>
          </Grid>
        </Grid>
      </ContentStyle>
      {!user?.isAdmin ? (
        <FooterStyle>
          <Footer />
        </FooterStyle>
      ) : (
        <></>
      )}
      {loading ? <Loading /> : null}
    </MainStyle>
  );
};

export default MainLayout;
