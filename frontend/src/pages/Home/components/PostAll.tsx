import { Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardPostItem from "../../../components/CardPostItem";
import { IPost } from "../../../type";
import { getPostByPage } from "../../../redux/callApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

const PostAll: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, totalPages } = useSelector((state: RootState) => state.api);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getPostByPage({ page: page, status: "active" }));
  }, [dispatch, page]);

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
          <Grid item key={post.id} md={3}>
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

export default PostAll;
