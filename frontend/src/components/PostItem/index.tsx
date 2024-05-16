import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IPost } from "../../type";
import Room from "../../assets/images/anhtro.jpg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { showSnackbar } from "../../redux/snackbarRedux";
import { useDispatch } from "react-redux";
import request from "../../utils/request";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const PostItem: React.FC<{
  data: IPost;
  hiddenIcon?: boolean;
  onClickHide?: () => void;
}> = ({ data, hiddenIcon, onClickHide }) => {
  const dispatch = useDispatch();
  const { id, images, title, user, address, priceNumber, areaNumber } = data;
  const parts = address?.split(",");
  const province = parts?.[parts.length - 1]?.trim();
  const [favorite, setFavorite] = useState<boolean>(false);

  const getCheckFavorite = async () => {
    try {
      const { data } = await request.get(`/api/v1/save/${id}/is-check`);
      if (data.status) {
        setFavorite(data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getCheckFavorite();
    }
  }, [id, hiddenIcon, onClickHide]);

  const handleFavorite = async (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(startLoading());
    try {
      let newData;
      if (!favorite) {
        newData = await request.post(`/api/v1/save/${id}`);
      } else {
        newData = await request.delete(`/api/v1/save/${id}`);
      }
      const { data } = newData;
      if (data.status) {
        dispatch(showSnackbar({ message: data.message, type: "success" }));
        setFavorite(!favorite);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleIncrementPostView = async () => {
    try {
      await request.post(`/api/v1/post/increment-view/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/post-detail/${id}`}
      style={{ textDecoration: "none" }}
      onClick={handleIncrementPostView}
    >
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
          src={images[0]?.imageUrl || Room}
        />
        <Typography
          sx={{
            position: "absolute",
            fontSize: "14px",
            color: "#fa6819",
            backgroundColor: "#ccc",
          }}
        >
          {images.length} ảnh
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
              {areaNumber} m2
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                whiteSpace: "nowrap",
                color: "#fa6819",
                margin: "10px 0",
              }}
            >
              {priceNumber} triệu/tháng
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "26px", height: "26px", marginRight: "6px" }}>
                <Avatar
                  alt="Logo"
                  src={user.avatar}
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
                {user.name}
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
              <Tooltip title="Lượt truy cập">
                <Box display={"flex"} alignItems={"center"} marginLeft={"10px"}>
                  <TrendingUpIcon />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      color: "#000",
                    }}
                  >
                    {data.viewsCount}
                  </Typography>
                </Box>
              </Tooltip>
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
        {hiddenIcon && (
          <Box
            sx={{
              position: "absolute",
              top: 40,
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

export default PostItem;
