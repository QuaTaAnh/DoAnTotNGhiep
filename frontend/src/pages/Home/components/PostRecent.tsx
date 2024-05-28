import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardPostItem from "../../../components/CardPostItem";
import { IPost } from "../../../type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import request from "../../../utils/request";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { useTranslation } from "react-i18next";

const PostRecent: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { locationUser } = useSelector((state: RootState) => state.user);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (locationUser !== null) {
      const getPostRecent = async () => {
        try {
          dispatch(startLoading());
          const { data } = await request.get("/api/v1/post/recent", {
            params: locationUser,
          });
          if (data.status) {
            setPosts(data.posts);
          }
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(stopLoading());
        }
      };
      getPostRecent();
    }
  }, [locationUser]);

  return (
    <Container maxWidth="lg">
      {posts.length > 0 ? (
        <Grid container spacing={2}>
          {posts.map((post: IPost) => (
            <Grid item key={post.id} md={3}>
              <CardPostItem data={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <Typography sx={{ fontSize: "30px", paddingTop: "20px" }}>
            {t("messagePostRecent")}
          </Typography>
        </Grid>
      )}
    </Container>
  );
};

export default PostRecent;
