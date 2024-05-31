import React, { useEffect, useState } from "react";
import { IPost } from "../../type";
import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Room from "../../assets/images/anhtro.jpg";
import NoImage from "../../assets/images/noImage.jpg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import request from "../../utils/request";
import { showSnackbar } from "../../redux/snackbarRedux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { formatDateComment } from "../../common/formatDate";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTranslation } from "react-i18next";
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { RootState } from "../../redux/store";

const CardPostItem: React.FC<{
  data: IPost;
  hiddenIcon?: boolean;
  onClickHide?: () => void;
}> = ({ data, hiddenIcon, onClickHide }) => {
  const {t}= useTranslation()
  const {
    id,
    images,
    title,
    address,
    priceNumber,
    areaNumber,
    createdAt,
  } = data;
  const dispatch = useDispatch();
  const parts = address?.split(",");
  const province = parts?.[parts.length - 1]?.trim();
  const [favorite, setFavorite] = useState<boolean>(false);
  const {user} = useSelector((state: RootState) => state.user)

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
  }, [id]);

  const handleFavorite = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation(); 
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
          display: "flex",
          flexDirection: "column",
          marginBottom: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={images[0].imageUrl || Room}
        />
        <IconButton 
          sx={{
            position: "absolute",
            color: "#fa6819",
          }} 
          size="large">
          <Badge badgeContent={images.length} color="warning">
            <CameraAltIcon />
          </Badge>
        </IconButton>
        <CardContent sx={{ flex: 1, padding: "10px" }}>
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
              {title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  overflow: "hidden",
                  margin: "10px 10px 0 0",
                }}
              >
                {areaNumber} m2
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  overflow: "hidden",
                  color: "#fa6819",
                  margin: "10px 10px 0 0",
                }}
              >
                {priceNumber} {t('unitPrice')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
              }}
            >
              <Tooltip title={t('personalPage')}>
                <Link
                  to={
                    user?.id !== data.user.id
                      ? `/user/${data.user.id}`
                      : "/profile"
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "26px",
                    height: "26px",
                    marginRight: "6px",
                    textDecoration: "none",
                  }}
                >
                  <Avatar
                    alt="Logo"
                    src={data.user.avatar || NoImage}
                    sx={{ width: "100%", height: "100%" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      color: "#000",
                      marginLeft: "8px",
                    }}
                  >
                    {user?.id === data.user.id ? t('you') : data.user.name}
                  </Typography>
                </Link>
              </Tooltip>
              <Tooltip title={t('viewsCount')}>
                <Box display={"flex"} alignItems={"center"}>
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
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              {formatDateComment(createdAt)}
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
        </CardContent>
        <Tooltip title="Yêu thích">
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
        </Tooltip>
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
              e.stopPropagation(); 
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
