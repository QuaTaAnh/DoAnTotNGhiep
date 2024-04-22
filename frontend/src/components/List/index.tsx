import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PostItem from "../PostItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getNewPostByPage, getPostByPage } from "../../redux/callApi";
import { IPost } from "../../type";
import { pageSuccess } from "../../redux/apiRedux";

const ListItem: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, totalPages, page } = useSelector((state: any) => state.api);

  useEffect(() => {
    dispatch(getPostByPage({ page: page }));
  }, [dispatch, page]);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    dispatch(pageSuccess(pageNumber));
  };

  const handleNewPost = () => {
    dispatch(getNewPostByPage({ page: page }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        padding: "12px",
      }}
    >
      <Grid container>
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
            onClick={handleNewPost}
          >
            Mới nhất
          </Button>
        </Grid>

        <Grid item md={12} sx={{ marginTop: "12px" }}>
          {posts?.length > 0 &&
            posts?.map((post: IPost) => (
              <PostItem key={post?.id} data={post} />
            ))}
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
