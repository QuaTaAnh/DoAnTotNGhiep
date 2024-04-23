import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Room from "../../assets/images/anhtro.jpg";
import moment from "moment";

const PostSidebar: React.FC<any> = ({ title, price, image, createAt }: any) => {
  const formatDate = (date: string) => {
    moment.locale("vn");
    return moment(date).fromNow();
  };
  return (
    <Link to="" style={{ textDecoration: "none" }}>
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
              image={image[0] || Room}
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
                  Price: {price}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {formatDate(createAt)}
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
