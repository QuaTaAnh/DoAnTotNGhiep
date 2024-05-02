import React from "react";
import NoImage from "../../assets/images/noImage.jpg";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { IUser } from "../../type";
import { useNavigate } from "react-router";

const CardProfile: React.FC<{ data: IUser | null }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <Grid container spacing={4} sx={{ padding: "20px" }}>
        <Grid item xs={3}>
          <CardMedia
            component="img"
            height="260"
            image={data?.avatar ?? NoImage}
          />
        </Grid>
        <Grid item xs={9}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#667080" }}>
              Thông tin cá nhân
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <Typography variant="h6" sx={{ color: "#667080" }}>
                Tên hiển thị: {data?.name}
              </Typography>
              <Typography variant="h6" sx={{ color: "#667080" }}>
                Số điện thoại: {data?.phone}
              </Typography>
              <Typography variant="h6" sx={{ color: "#667080" }}>
                Số Zalo: {data?.zalo ? data?.zalo : data?.phone}
              </Typography>
            </Box>
            <Button
              size="medium"
              sx={{
                backgroundColor: "#fa6819",
                color: "#fff",
                borderRadius: "5px",
                padding: "8px 20px",
                marginTop: "20px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ed570e",
                },
              }}
              onClick={() => navigate(`/edit-profile`)}
            >
              Cập nhật
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardProfile;
