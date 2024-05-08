import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoImage from "../../assets/images/noImage.jpg";
import { useParams } from "react-router-dom";
import request from "../../utils/request";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import { UserPersonal } from "../../type";
import { showSnackbar } from "../../redux/snackbarRedux";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { formatDate } from "../../common/formatDate";

const PersonalUser: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userPersonal, setUserPersonal] = useState<UserPersonal>();
  const [checkFollow, setCheckFollow] = useState<boolean>(false);

  const getUserById = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/user/${id}`);
      if (data.status) {
        setUserPersonal(data?.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const getCheckFollow = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.get(`/api/v1/follow/${id}/is-check`);
      if (data.status) {
        setCheckFollow(data.status);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (id) {
      getUserById();
      getCheckFollow();
    }
  }, [id]);

  const handleFollow = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.post(`/api/v1/follow/${userPersonal?.id}`);
      if (data.status) {
        dispatch(showSnackbar({ message: data.message, type: "success" }));
        setCheckFollow(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleUnFollow = async () => {
    dispatch(startLoading());
    try {
      const { data } = await request.delete(
        `/api/v1/follow/${userPersonal?.id}`
      );
      if (data.status) {
        dispatch(showSnackbar({ message: data.message, type: "success" }));
        setCheckFollow(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <>
      {userPersonal && (
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Card
              sx={{ padding: "20px", marginLeft: "20px", borderRadius: "0" }}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Avatar
                  alt="Avatar"
                  sx={{ marginRight: "10px" }}
                  src={userPersonal?.avatar ?? NoImage}
                />
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 700, color: "#000" }}
                >
                  {userPersonal?.name}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                marginTop={"10px"}
              >
                <Typography sx={{ fontSize: "14px", color: "#000" }}>
                  Người theo dõi: {userPersonal?.followersCount}
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#000" }}>
                  Đang theo dõi: {userPersonal?.followingCount}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                marginTop={"10px"}
              >
                <Typography sx={{ fontSize: "14px", color: "#000" }}>
                  Đã tham gia: {formatDate(userPersonal?.createdAt)}
                </Typography>
              </Box>
              <Button
                fullWidth
                sx={{
                  color: "#fa6819",
                  marginTop: "20px",
                  border: "1px solid #ccc",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                {userPersonal?.phone}
              </Button>
              {checkFollow ? (
                <Button
                  fullWidth
                  sx={{
                    color: "#fa6819",
                    marginTop: "20px",
                    border: "1px solid #ccc",
                  }}
                  onClick={handleUnFollow}
                >
                  <DoneIcon />
                  Đã theo dõi
                </Button>
              ) : (
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#fa6819",
                    marginTop: "20px",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#ed570e",
                    },
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleFollow}
                >
                  <AddIcon />
                  Theo dõi
                </Button>
              )}
            </Card>
          </Grid>
          <Grid item md={8}></Grid>
        </Grid>
      )}
    </>
  );
};

export default PersonalUser;
