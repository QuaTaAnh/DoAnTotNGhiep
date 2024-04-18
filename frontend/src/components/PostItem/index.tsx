import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IPost } from "../../type";
import Room from "../../assets/images/anhtro.jpg";

const PostItem: React.FC<{ data: IPost }> = ({ data }) => {
  const { images, title, user, address, attributes } = data;
  const parts = address?.split(",");
  const province = parts?.[parts.length - 1]?.trim();
  const imageUrl = JSON.parse(images.image);

  const [favorite, setFavorite] = useState<boolean>(false);
  const handleFavorite = (event: React.MouseEvent) => {
    event.preventDefault();
    setFavorite(true);
  };
  return (
    <Link to={`test`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          position: "relative",
          height: 128,
          display: "flex",
          flexDirection: "row",
          marginBottom: 2,
          padding: "10px",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: 128,
            height: 128,
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={imageUrl[0] || Room}
        />
        <Typography
          sx={{
            position: "absolute",
            fontSize: "14px",
            color: "#fa6819",
            backgroundColor: "#ccc",
          }}
        >
          {imageUrl.length} ảnh
        </Typography>
        <CardContent sx={{ padding: "0 12px", flex: 1 }}>
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                whiteSpace: "nowrap",
              }}
            >
              {attributes?.acreage}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                whiteSpace: "nowrap",
                color: "#fa6819",
                margin: "10px 0",
              }}
            >
              {attributes?.price}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "26px", height: "26px", marginRight: "6px" }}>
                <Avatar
                  alt="Logo"
                  src={user?.avatar}
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
                {user?.name}
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
        <Box
          sx={{
            position: "absolute",
            bottom: 4,
            right: 10,
            padding: "2px",
            color: "#fa6819",
            "&:hover": {
              color: "#ed570e",
            },
          }}
          onClick={handleFavorite}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Box>
      </Card>
    </Link>
  );
};

export default PostItem;
