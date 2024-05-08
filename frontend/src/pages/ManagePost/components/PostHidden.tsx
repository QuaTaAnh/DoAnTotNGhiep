import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPost } from "../../../type";
import PostItem from "../../../components/PostItem";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import request from "../../../utils/request";

const PostHidden: React.FC = () => {
  const dispatch = useDispatch();
  const [postUser, setPostUser] = useState<IPost[]>([]);
  const { user } = useSelector((state: RootState) => state.user);

  const getPostByStatusHidden = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/post/${user?.id}`, {
        params: {
          status: "hidden",
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
      getPostByStatusHidden();
    }
  }, [user?.id]);

  return (
    <>
      <Grid container spacing={2}>
        {postUser.map((post: IPost) => (
          <>
            <Grid item md={12}>
              <PostItem key={post.id} data={post} />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default PostHidden;
