import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PostItem from "../PostItem";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import request from "../../utils/request";
import { IPost } from "../../type";

const ListItem: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPostByPage = useCallback(async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get("api/v1/post/get-all", {
        params: {
          page: page,
        },
      });
      if (data?.status) {
        setPosts(data?.posts);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }, [dispatch, page]);

  useEffect(() => {
    getPostByPage();
  }, [getPostByPage]);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber);
  };

  return (
    <Box sx={{ border: "1px solid #ccc", width: "100%", borderRadius: "8px" }}>
      <Grid container sx={{ padding: "12px" }}>
        <Grid item md={12}>
          <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
            Danh sách tin đăng
          </Typography>
        </Grid>

        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "12px 0",
          }}
        >
          <Typography sx={{ fontSize: "14px", marginRight: "10px" }}>
            Sắp xếp
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "5px",
              textTransform: "none",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#ed570e",
              },
            }}
          >
            Mặc định
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "5px",
              textTransform: "none",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "#ed570e",
              },
            }}
          >
            Mới nhất
          </Button>
        </Grid>

        <Grid item md={12} sx={{ marginTop: "12px" }}>
          {posts.length > 0 &&
            posts.map((post) => <PostItem key={post?.id} data={post} />)}
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
        {totalPages > 0 && posts?.length > 0 && (
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
        )}
      </Grid>
    </Box>
  );
};

export default ListItem;
