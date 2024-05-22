import React from "react";
import Header from "./components/Header";
import { ILayout } from "./type";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs";

const OnlyHeader: React.FC<ILayout> = ({ children }: ILayout) => {
  const loading = useSelector((state: RootState) => state.loading);
  const location = useLocation();
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

  return (
    <main>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 11,
          paddingBottom: "60px",
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 88px)'
        }}
      >
        <Breadcrumb items={breadcrumbs} />
        {children}
      </Container>
      {loading ? <Loading /> : null}
    </main>
  );
};

export default OnlyHeader;
