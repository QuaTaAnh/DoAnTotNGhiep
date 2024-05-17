import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPost } from "../../../type";
import PostItem from "../../../components/PostItem";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import request from "../../../utils/request";
import ConfirmDialog from "../../../components/ShowConfirm";
import { showSnackbar } from "../../../redux/snackbarRedux";
import { expirationDate, formatDate } from "../../../common/formatDate";
import { useTranslation } from "react-i18next";

const PostActive: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [postUser, setPostUser] = useState<IPost[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [idHidden, setIdHidden] = useState<number>(0);

  const getPostByStatusActive = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/post/${user?.id}`, {
        params: {
          status: "active",
        },
      });
      if (data.status) {
        setPostUser(data?.posts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (user?.id) {
      getPostByStatusActive();
    }
  }, [user?.id]);

  const handleOpenDiaLog = (postId: number) => {
    setOpen(true);
    setIdHidden(postId);
  };

  const handleHiddenPost = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.post(`/api/v1/post/hidden/${idHidden}`);
      if (data.status) {
        dispatch(showSnackbar({ message: data.message, type: "success" }));
        getPostByStatusActive();
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

  return (
    <>
      <Grid container spacing={2}>
        {postUser.map((post: IPost) => (
          <>
            <Grid item md={8}>
              <PostItem
                key={post.id}
                data={post}
                hiddenIcon
                onClickHide={() => handleOpenDiaLog(post.id)}
              />
            </Grid>
            <Grid item md={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{ fontSize: "14px", color: "#000", padding: "10px 0" }}
                >
                  {t("startDate")}: {formatDate(post?.createdAt)}
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", color: "#000", padding: "10px 0" }}
                >
                  {t("endDate")}: {formatDate(expirationDate(post?.createdAt))}
                </Typography>
              </Box>
            </Grid>
          </>
        ))}
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
