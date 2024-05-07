import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import request from "../../utils/request";
import { IPost } from "../../type";
import ImageDetail from "../../components/ImageDetail";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import GppGoodIcon from "@mui/icons-material/GppGood";
import DescriptionIcon from "@mui/icons-material/Description";
import CropIcon from "@mui/icons-material/Crop";
import NoImage from "../../assets/images/noImage.jpg";
import { formatDate } from "../../common/formatDate";

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState<IPost>();

  const getPostDetail = useCallback(async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/post/${id}/detail`);
      setDetail(data.post);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }, [dispatch, id]);

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail]);

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <ImageDetail images={detail?.images} />
        <Card sx={{ padding: "20px", borderRadius: "0", marginTop: "20px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
            {detail?.title}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            paddingTop={"10px"}
          >
            <Box display={"flex"}>
              <Typography sx={{ fontSize: "16px", color: "#fa6819" }}>
                {detail?.priceNumber} triệu/tháng -{" "}
                <span style={{ fontSize: "14px", color: "#000" }}>
                  {detail?.areaNumber} m2
                </span>
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} alignItems={"center"} paddingTop={"10px"}>
            <PlaceIcon />
            <Typography sx={{ fontSize: "14px", marginLeft: "6px" }}>
              {detail?.address}
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} paddingTop={"10px"}>
            <AccessTimeFilledIcon />
            <Typography sx={{ fontSize: "14px", marginLeft: "6px" }}>
              {formatDate(detail?.createdAt)}
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} paddingTop={"10px"}>
            <GppGoodIcon />
            <Typography sx={{ fontSize: "14px", marginLeft: "6px" }}>
              Tin đã được kiểm duyệt
            </Typography>
          </Box>
        </Card>
        <Card sx={{ padding: "20px", borderRadius: "0", marginTop: "20px" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
            Đặc điểm bất động sản
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            paddingTop={"10px"}
          >
            <Box display={"flex"}>
              <DescriptionIcon />
              <Typography
                sx={{ fontSize: "15px", color: "#000", marginLeft: "6px" }}
              >
                {detail?.shortDescription}
              </Typography>
            </Box>
            <Box display={"flex"}>
              <CropIcon />
              <Typography
                sx={{ fontSize: "15px", color: "#000", marginLeft: "6px" }}
              >
                {detail?.areaNumber} m2
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card sx={{ padding: "20px", borderRadius: "0", marginTop: "20px" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
            Mô tả chi tiết
          </Typography>
          <Box display={"flex"} paddingTop={"10px"}>
            <div
              style={{
                width: "100%",
                paddingLeft: "16px",
                whiteSpace: "pre-wrap",
              }}
              dangerouslySetInnerHTML={{ __html: detail?.detail || "" }}
            />
          </Box>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card sx={{ padding: "20px", borderRadius: "0" }}>
          <Link
            to=""
            style={{
              textDecoration: "none",
            }}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Avatar
                alt="Avatar"
                sx={{ marginRight: "10px" }}
                src={detail?.user?.avatar ?? NoImage}
              />
              <Typography
                sx={{ fontSize: "16px", fontWeight: 700, color: "#000" }}
              >
                {detail?.user?.name}
              </Typography>
            </Box>
          </Link>
          <Button
            fullWidth
            sx={{
              color: "#fff",
              marginTop: "20px",
              backgroundColor: "#fa6819",
              "&:hover": {
                backgroundColor: "#ed570e",
              },
            }}
          >
            {detail?.user?.phone}
          </Button>
          <Button
            fullWidth
            sx={{
              color: "#fa6819",
              marginTop: "20px",
              border: "1px solid #ccc",
            }}
          >
            Chat với người bán
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostDetail;
