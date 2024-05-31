import { Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPost } from "../../../../type";
import { startLoading, stopLoading } from "../../../../redux/loadingRedux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import request from "../../../../utils/request";
import ConfirmDialog from "../../../../components/ShowConfirm";
import { showSnackbar } from "../../../../redux/snackbarRedux";
import { getPostByPage } from "../../../../redux/callApi";
import CardPostItem from "../../../../components/CardPostItem";
import { pageSuccess } from "../../../../redux/apiRedux";

const PostActive: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, posts, totalPages } = useSelector(
    (state: RootState) => state.api
  );
  const [open, setOpen] = useState<boolean>(false);
  const [idHidden, setIdHidden] = useState<number>(0);

  useEffect(() => {
    dispatch(getPostByPage({ page, status: "active" }));
  }, [dispatch, page]);

  const handleOpenDiaLog = (postId: number) => {
    setOpen(true);
    setIdHidden(postId);
  };

  const handleHiddenPost = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.post(`/api/v1/post/admin/hidden/${idHidden}`);
      if (data.status) {
        dispatch(showSnackbar({ message: data.message, type: "success" }));
        dispatch(getPostByPage({ page, status: "active" }));
      } else {
        dispatch(showSnackbar({ message: data.message, type: "error" }));
      }
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã có lỗi xảy ra!", type: "error" }));
    } finally {
      setOpen(false);
      dispatch(stopLoading());
    }
  };

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    dispatch(pageSuccess(pageNumber));
  };

  return (
    <>
      <Grid container spacing={2}>
        {posts.map((post: IPost) => (
          <Grid item key={post.id} md={4}>
            <CardPostItem
              data={post}
              hiddenIcon
              onClickHide={() => handleOpenDiaLog(post.id)}
            />
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
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleHiddenPost}
        title="Xác nhận"
        message="Bạn có chắc là bạn muốn ẩn tin này không?"
      />
    </>
  );
};

export default PostActive;
