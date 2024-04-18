import { Box, Card, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface ICardCustom {
  title: string;
  content: any[];
}

const CardCustom: React.FC<ICardCustom> = ({ title, content }: ICardCustom) => {
  return (
    <Card
      sx={{
        width: "100%",
        padding: "12px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
        {title}
      </Typography>
      {content?.length > 0 &&
        content.map((item) => (
          <Box
            key={item?.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "4px",
              cursor: "pointer",
              "&:hover": {
                color: "#fa6819",
              },
            }}
          >
            <NavigateNextIcon />
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
    </Card>
  );
};

export default CardCustom;
