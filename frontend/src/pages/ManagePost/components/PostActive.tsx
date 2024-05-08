import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPost } from "../../../type";
import PostItem from "../../../components/PostItem";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import request from "../../../utils/request";
import ConfirmDialog from "../../../components/ShowConfirm";

const PostActive: React.FC = () => {
  const dispatch = useDispatch();
  const [postUser, setPostUser] = useState<IPost[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [idHidden, setIdHidden] = useState<number>(0);

  const getPostByUserId = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/post/${user?.id}`);
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
      getPostByUserId();
    }
  }, [user?.id]);

  const handleOpenDiaLog = (postId: number) => {
    setOpen(true);
    setIdHidden(postId);
  };

  const handleHiddenPost = () => {
    console.log(idHidden);
  };

  return (
    <>
      <Grid container>
        {postUser.map((post: IPost) => (
          <Grid item md={12} position={"relative"}>
            <PostItem
              key={post.id}
              data={post}
              hiddenIcon
              onClickHide={() => handleOpenDiaLog(post.id)}
            />
          </Grid>
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
