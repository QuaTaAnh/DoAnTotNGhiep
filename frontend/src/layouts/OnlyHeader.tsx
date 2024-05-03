import React from "react";
import Header from "./components/Header";
import { ILayout } from "./type";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Loading from "../components/Loading";

const OnlyHeader: React.FC<ILayout> = ({ children }: ILayout) => {
  const loading = useSelector((state: RootState) => state.loading);
  return (
    <main>
      <Header />
      <Container maxWidth="md" sx={{ marginTop: "88px" }}>
        {children}
      </Container>
      {loading ? <Loading /> : null}
    </main>
  );
};

export default OnlyHeader;
