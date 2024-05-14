import { Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardPostItem from "../../../components/CardPostItem";
import { IPost } from "../../../type";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import request from "../../../utils/request";
import { showSnackbar } from "../../../redux/snackbarRedux";

const PostFollow: React.FC = () => {
  const dispatch = useDispatch();
  const [newPosts, setNewPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getNewPost = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.get("/api/v1/post/get-follow", {
        params: {
          page,
        },
      });
      setNewPosts(data?.posts);
      setTotalPages(data.totalPages);
      console.log(data);
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã xảy ra lỗi", type: "error" }));
    }
  };

  useEffect(() => {
    getNewPost();
  }, [page]);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Grid container spacing={2}>
        {newPosts.map((post: IPost) => (
          <Grid item key={post.id} md={3}>
            <CardPostItem data={post} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
        {totalPages > 1 && newPosts?.length > 0 && (
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
    </>
  );
};

export default PostFollow;
