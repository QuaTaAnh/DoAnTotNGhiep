import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import request from "../../utils/request";
import { IPost } from "../../type";

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState<IPost>();

  const getPostDetail = useCallback(async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/post/${id}/detail`);
      setDetail(data.post);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }, [dispatch, id]);

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail]);
  return (
    <Grid container>
      <Grid item md={8}>
        {detail?.images[0].imageUrl}
      </Grid>
      <Grid item md={4}>
        user
      </Grid>
    </Grid>
  );
};

export default PostDetail;
