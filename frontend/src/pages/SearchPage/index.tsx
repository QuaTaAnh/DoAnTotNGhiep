import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import request from "../../utils/request";
import { IPost } from "../../type";
import PostItem from "../../components/PostItem";

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const { params } = useParams();
  const [dataSearch, setDataSearch] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  console.log(dataSearch, "123");

  const getSearchPosts = useCallback(async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(
        `/api/v1/post/search/${params}?page=${page}&pageSize=${10}`
      );
      if (data.status) {
        setDataSearch(data.posts);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }, [dispatch, page, params]);

  useEffect(() => {
    getSearchPosts();
  }, [getSearchPosts]);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            color: "#373F41",
            fontSize: "26px",
            fontWeight: 500,
            lineHeight: "56px",
            padding: "10px 0",
          }}
        >
          Kết quả tìm kiếm <span style={{ color: "#fa6819" }}>{params}</span>
        </Typography>
        <Grid container spacing={4}>
          {dataSearch?.length > 0 ? (
            dataSearch?.map((item: IPost) => (
              <Grid item xs={12} md={12}>
                <PostItem key={item?.id} data={item} />
              </Grid>
            ))
          ) : (
            <Grid container justifyContent="center">
              <Typography sx={{ fontSize: "40px", paddingTop: "20px" }}>
                Không có kết quả
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            color="primary"
            onChange={onChangePage}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default SearchPage;
