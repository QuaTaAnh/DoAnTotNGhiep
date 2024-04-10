import React from "react";
import Header from "./components/Header";
import { ILayout } from "./type";
import { Container } from "@mui/material";

const OnlyHeader: React.FC<ILayout> = ({ children }: ILayout) => {
  return (
    <main>
      <Header />
      <Container maxWidth="md" sx={{ marginTop: "88px" }}>
        {children}
      </Container>
    </main>
  );
};

export default OnlyHeader;
