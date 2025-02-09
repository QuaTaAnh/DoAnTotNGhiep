import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Room from "../../assets/images/anhtro.jpg";
import { formatDateComment } from "../../common/formatDate";
import request from "../../utils/request";

const PostSidebar: React.FC<any> = ({
  id,
  title,
  price,
  image,
  createdAt,
}: any) => {
  const handleIncrementPostView = async () => {
    try {
      await request.post(`/api/v1/post/increment-view/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/post-detail/${id}`}
      style={{ textDecoration: "none" }}
      onClick={handleIncrementPostView}
    >
      <Card
        sx={{
          height: "66px",
          marginBottom: "15px",
          cursor: "pointer",
          boxShadow: "none",
        }}
      >
        <Grid container>
          <Grid item xs={3}>
            <CardMedia
              component="img"
              sx={{ height: "66px" }}
              image={image[0]?.imageUrl || Room}
              alt="Anh"
            />
          </Grid>
          <Grid item xs={9}>
            <CardContent sx={{ padding: "6px 10px" }}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    height: "38px",
                    fontSize: "14px",
                    lineHeight: "16px",
                    paddingBottom: "6px",
                    textTransform: "capitalize",
                  }}
                >
                  {title?.length > 38 ? title?.slice(0, 38) + "..." : title}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography sx={{ fontSize: "12px" }}>
                  Price: {price} triệu/tháng
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {formatDateComment(createdAt)}
                </Typography>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export default PostSidebar;
