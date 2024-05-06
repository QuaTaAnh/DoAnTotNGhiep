import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const PostDetail: React.FC = () => {
  const { id } = useParams();
  return (
    <Grid container>
      <Grid item md={8}>
        detail
      </Grid>
      <Grid item md={4}>
        user
      </Grid>
    </Grid>
  );
};

export default PostDetail;
