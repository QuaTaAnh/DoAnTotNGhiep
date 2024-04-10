import { Box, Typography } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box
      maxWidth="xl"
      sx={{
        height: "64px",
        display: { md: "flex" },
        justifyContent: "center",
        backgroundColor: "#373f41",
        marginTop: "60px",
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          color: "#C3CBCD",
          lineHeight: "16px",
          alignContent: "center",
          letterSpacing: ".06rem",
        }}
      >
        Z-LEARN. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
