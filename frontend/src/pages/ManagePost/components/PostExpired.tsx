import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPost } from "../../../type";
import PostItem from "../../../components/PostItem";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import request from "../../../utils/request";
import { expirationDate, formatDate } from "../../../common/formatDate";
import { useTranslation } from "react-i18next";

const PostExpired: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [postUser, setPostUser] = useState<IPost[]>([]);
  const { user } = useSelector((state: RootState) => state.user);

  const getPostByStatusExpired = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/post/${user?.id}`, {
        params: {
          status: "expired",
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
      getPostByStatusExpired();
    }
  }, [user?.id]);

  return (
    <>
      <Grid container spacing={2}>
        {postUser.map((post: IPost) => (
          <>
            <Grid item md={8}>
              <PostItem key={post.id} data={post} />
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
    </>
  );
};

export default PostExpired;
