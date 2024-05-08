import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Pagination,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import RelatedPost from "../../components/RelatedPost";
import PostItem from "../../components/PostItem";
import { RootState } from "../../redux/store";
import WcIcon from "@mui/icons-material/Wc";
import { CustomTabPanel, a11yProps } from "../../components/CustomTabPanel";
import CommentCustom from "../../components/Comment";

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState<IPost>();
  const [suggestPost, setSuggestPost] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { user } = useSelector((state: RootState) => state.user);
  const parts = detail?.address?.split(",") || "";
  const city = parts[parts.length - 1];
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const getPostSuggestDetail = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/post/get-suggest`, {
        params: {
          page: page,
          priceId: detail?.priceId,
          areaId: detail?.areaId,
          address: city,
        },
      });
      if (data.status) {
        setSuggestPost(data.posts);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (detail) {
      getPostSuggestDetail();
    }
  }, [detail]);

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail]);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber);
  };

  return (
    <>
      {detail && (
        <Grid container spacing={2}>
          <Grid item md={8}>
            <ImageDetail images={detail?.images} />
            <Card
              sx={{ padding: "20px", borderRadius: "0", marginTop: "20px" }}
            >
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
            <Card
              sx={{ padding: "20px", borderRadius: "0", marginTop: "20px" }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                Đặc điểm bất động sản
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                paddingTop={"10px"}
              >
                <Grid container>
                  <Grid md={6}>
                    <Box display={"flex"}>
                      <DescriptionIcon />
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#000",
                          marginLeft: "6px",
                        }}
                      >
                        {detail?.shortDescription}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={6}>
                    <Box display={"flex"}>
                      <CropIcon />
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#000",
                          marginLeft: "6px",
                        }}
                      >
                        {detail?.areaNumber} m2
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                paddingTop={"10px"}
              >
                <Box display={"flex"}>
                  <WcIcon />
                  <Typography
                    sx={{ fontSize: "15px", color: "#000", marginLeft: "6px" }}
                  >
                    Dành cho: {detail?.target}
                  </Typography>
                </Box>
              </Box>
            </Card>
            <Card
              sx={{ padding: "20px", borderRadius: "0", marginTop: "20px" }}
            >
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
            <Card
              sx={{ padding: "20px", marginLeft: "20px", borderRadius: "0" }}
            >
              <Link
                to={
                  user?.id !== detail?.user.id
                    ? `/user/${detail?.user.id}`
                    : "/manage-post"
                }
                style={{
                  textDecoration: "none",
                }}
              >
                <Tooltip title="Trang cá nhân">
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
                </Tooltip>
              </Link>
              <Button
                fullWidth
                sx={{
                  color: "#fff",
                  marginTop: "40px",
                  backgroundColor: "#fa6819",
                  "&:hover": {
                    backgroundColor: "#ed570e",
                  },
                }}
              >
                Số điện thoại: {detail?.user?.phone}
              </Button>
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
                Zalo: {detail?.user?.zalo}
              </Button>
              {user?.id !== detail?.user?.id && (
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
              )}
            </Card>
            <RelatedPost />
          </Grid>
          <Grid item md={12}>
            <Card
              sx={{ padding: "20px", borderRadius: "0", marginTop: "20px" }}
            >
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs value={value} onChange={handleChange} textColor="inherit">
                  <Tab
                    label="Bài đăng gợi ý"
                    {...a11yProps(0)}
                    sx={{
                      textTransform: "none",
                    }}
                  />
                  <Tab
                    label="Bình luận"
                    {...a11yProps(1)}
                    sx={{
                      textTransform: "none",
                    }}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {suggestPost.length > 0 &&
                  suggestPost.map(
                    (post: IPost) =>
                      post.id !== detail.id && (
                        <PostItem key={post?.id} data={post} />
                      )
                  )}
                <Grid
                  container
                  justifyContent="center"
                  sx={{ margin: "20px 0" }}
                >
                  {suggestPost?.filter((post) => post.id !== detail.id).length >
                  0 ? (
                    <Pagination
                      count={totalPages}
                      onChange={onChangePage}
                      sx={{
                        "& .Mui-selected": {
                          backgroundColor: "#fa6819",
                          color: "#000",
                        },
                        "& .MuiPaginationItem-root": {
                          color: "#000",
                          "&:hover": {
                            backgroundColor: "#ed570e",
                          },
                        },
                      }}
                    />
                  ) : (
                    <Typography sx={{ fontSize: "18px" }}>
                      Không có bài đăng gợi ý
                    </Typography>
                  )}
                </Grid>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <CommentCustom postId={detail?.id} />
              </CustomTabPanel>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PostDetail;
