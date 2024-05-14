import React, { useEffect, useState } from "react";
import { IUser } from "../../../type";
import UserCard from "../../../components/UserCard";
import { Grid } from "@mui/material";
import request from "../../../utils/request";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { useDispatch } from "react-redux";

const Following: React.FC<{ data: IUser }> = ({ data }) => {
  const dispatch = useDispatch();
  const [followings, setFollowings] = useState<IUser[]>([]);
  const { following } = data;

  useEffect(() => {
    const getUserFollowing = async () => {
      try {
        dispatch(startLoading());
        const followingData = following ?? [];
        const fetchedFollowings = await Promise.all(
          followingData.map(async (item) => {
            const res = await request.get(
              `/api/v1/user/follow/${item.followingId}`
            );
            return res.data.user;
          })
        );
        setFollowings(fetchedFollowings);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(stopLoading());
      }
    };
    getUserFollowing();
  }, [dispatch, following]);

  return (
    <Grid container spacing={2}>
      {followings.map((item) => (
        <Grid item md={12} key={item.id}>
          <UserCard id={item.id} avatar={item.avatar} name={item.name} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Following;
