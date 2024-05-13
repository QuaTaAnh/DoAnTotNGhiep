import { Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPost } from "../../../../type";
import { startLoading, stopLoading } from "../../../../redux/loadingRedux";
import { useDispatch } from "react-redux";
import request from "../../../../utils/request";
import CardPostItem from "../../../../components/CardPostItem";

const PostHidden: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPostByStatusExpired = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/post/get-all`, {
        params: {
          page: page,
          status: "hidden",
        },
      });
      if (data.status) {
        setPosts(data?.posts);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    getPostByStatusExpired();
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
        {posts.map((post: IPost) => (
          <Grid key={post.id} md={4} xs={12}>
            <CardPostItem data={post} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
        {totalPages > 1 && posts?.length > 0 && (
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

export default PostHidden;
