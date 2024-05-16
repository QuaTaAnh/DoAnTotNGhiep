import { Container, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostItem from "../../components/PostItem";
import { IPost } from "../../type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import request from "../../utils/request";

const SavePost: React.FC = () => {
  const dispatch = useDispatch();
  const [postSave, setPostSave] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.user);

  const getPostSave = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/save/${user?.id}`, {
        params: {
          page: page,
        },
      });
      if (data.status) {
        setPostSave(data?.savePosts);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (user?.id) {
      getPostSave();
    }
  }, [page, user?.id]);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        Tin đã lưu
      </Typography>
      <Grid container spacing={2}>
        {postSave?.map((save: any) => (
          <Grid item md={12}>
            <PostItem key={save.id} data={save.post} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
        {totalPages > 1 && (
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
    </Container>
  );
};

export default SavePost;
