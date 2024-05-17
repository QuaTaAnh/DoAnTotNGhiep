import React from "react";
import { Box, Card, Typography } from "@mui/material";
import Banner1 from "../../assets/images/banner1.png";
import Banner2 from "../../assets/images/banner2.png";
import Banner3 from "../../assets/images/banner3.png";

const Banner: React.FC = () => {
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
              Nhãn Đối Tác
            </Typography>
            <Typography sx={{ color: "#000", fontSize: "14px" }}>
              Tăng 40% hiệu quả tin đăng
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
              Tin đăng tiếp cận
            </Typography>
            <Typography sx={{ color: "#000", fontSize: "14px" }}>
              Hơn 40 triệu người mua tiềm năng
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
              Tài Khoản Doanh Nghiệp
            </Typography>
            <Typography sx={{ color: "#000", fontSize: "14px" }}>
              Giúp tăng hiệu quả quản lý
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Banner;
