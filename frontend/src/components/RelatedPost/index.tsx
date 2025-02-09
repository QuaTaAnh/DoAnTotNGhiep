import React, { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import PostSidebar from "../PostSidebar";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import request from "../../utils/request";
import { showSnackbar } from "../../redux/snackbarRedux";
import { IPost } from "../../type";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const RelatedPost: React.FC = () => {
  const { id } = useParams();
  const {t} =useTranslation()
  const dispatch = useDispatch();
  const [newPosts, setNewPosts] = useState<IPost[]>([]);

  const getNewPost = async () => {
    try {
      dispatch(startLoading());
      const { data } = await request.get("/api/v1/post/get-new");      
      const currentPostId = Number(id);
      const filteredPosts = data?.posts?.filter((post: IPost) => post.id !== currentPostId);
      setNewPosts(filteredPosts);
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã xảy ra lỗi", type: "error" }));
    }
  };

  useEffect(() => {
    getNewPost();
  }, []);

  return (
    <Grid container>
      <Grid
        item
        sx={{
          width: "100%",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
        md={12}
      >
        <Card
          sx={{
            width: "100%",
            padding: "12px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: 600, marginBottom: "28px" }}
          >
            {t('postNew')}
          </Typography>
          {newPosts.map((post: IPost) => (
            <PostSidebar
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.images}
              price={post.priceNumber}
              createAt={post.createdAt}
            />
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default RelatedPost;
