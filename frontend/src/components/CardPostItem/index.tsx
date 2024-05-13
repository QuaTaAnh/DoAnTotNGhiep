import React from "react";
import { IPost } from "../../type";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Room from "../../assets/images/anhtro.jpg";
import NoImage from "../../assets/images/noImage.jpg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CardPostItem: React.FC<{
  data: IPost;
  hiddenIcon?: boolean;
  onClickHide?: () => void;
}> = ({ data, hiddenIcon, onClickHide }) => {
  const parts = data?.address?.split(",");
  const province = parts?.[parts.length - 1]?.trim();
  return (
    <Link to={`/post-detail/${data.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          marginBottom: 2,
          width: "320px",
          padding: "10px",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={data.images[0].imageUrl || Room}
        />
        <Typography
          sx={{
            position: "absolute",
            fontSize: "14px",
            color: "#fa6819",
            backgroundColor: "#ccc",
          }}
        >
          {data.images.length} ảnh
        </Typography>
        <CardContent sx={{ padding: "0", flex: 1 }}>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                height: "60px",
                paddingTop: "10px",
                overflow: "hidden",
              }}
            >
              {data.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                overflow: "hidden",
                margin: "10px 0",
              }}
            >
              {data.areaNumber} m2
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                overflow: "hidden",
                color: "#fa6819",
                margin: "10px 0",
              }}
            >
              {data.priceNumber} triệu/tháng
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "26px", height: "26px", marginRight: "6px" }}>
                <Avatar
                  alt="Logo"
                  src={data.user.avatar || NoImage}
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  color: "#000",
                  marginRight: "24px",
                }}
              >
                {data.user.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  whiteSpace: "nowrap",
                  color: "#000",
                }}
              >
                {province}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        {hiddenIcon && (
          <Box
            sx={{
              position: "absolute",
              bottom: 26,
              right: 10,
              padding: "2px",
              color: "#000",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (onClickHide) {
                onClickHide();
              }
            }}
          >
            <VisibilityOffIcon sx={{ fontSize: "24px" }} />
          </Box>
        )}
      </Card>
    </Link>
  );
};

export default CardPostItem;
