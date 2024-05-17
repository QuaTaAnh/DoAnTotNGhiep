import React from "react";
import { Box, Card, Typography } from "@mui/material";
import Banner1 from "../../assets/images/banner1.png";
import Banner2 from "../../assets/images/banner2.png";
import Banner3 from "../../assets/images/banner3.png";
import { useTranslation } from "react-i18next";

const Banner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Card sx={{ margin: "10px 24px 20px", padding: "20px", borderRadius: 0 }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"}>
          <img
            src={Banner1}
            alt=""
            style={{ width: "80px", height: "80px", marginRight: "10px" }}
          />
          <Box>
            <Typography sx={{ color: "#fa6819", fontSize: "18px" }}>
              {t("banner.label1")}
            </Typography>
            <Typography sx={{ color: "#000", fontSize: "14px" }}>
              {t("banner.content1")}
            </Typography>
          </Box>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <img
            src={Banner2}
            alt=""
            style={{ width: "80px", height: "80px", marginRight: "10px" }}
          />
          <Box>
            <Typography sx={{ color: "#fa6819", fontSize: "18px" }}>
              {t("banner.label2")}
            </Typography>
            <Typography sx={{ color: "#000", fontSize: "14px" }}>
              {t("banner.content2")}
            </Typography>
          </Box>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <img
            src={Banner3}
            alt=""
            style={{ width: "80px", height: "80px", marginRight: "10px" }}
          />
          <Box>
            <Typography sx={{ color: "#fa6819", fontSize: "18px" }}>
              {t("banner.label3")}
            </Typography>
            <Typography sx={{ color: "#000", fontSize: "14px" }}>
              {t("banner.content3")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Banner;
