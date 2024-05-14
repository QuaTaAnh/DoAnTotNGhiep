import React, { useEffect, useState } from "react";
import { IUser } from "../../../type";
import UserCard from "../../../components/UserCard";
import { Grid } from "@mui/material";
import request from "../../../utils/request";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import { useDispatch } from "react-redux";

const Follower: React.FC<{ data: IUser }> = ({ data }) => {
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState<IUser[]>([]);
  const { follower } = data;

  useEffect(() => {
    const getUserFollower = async () => {
      try {
        dispatch(startLoading());
        const followerData = data.follower ?? [];
        const fetchedFollowers = await Promise.all(
          followerData.map(async (item) => {
            const res = await request.get(
              `/api/v1/user/follow/${item.followerId}`
            );
            return res.data.user;
          })
        );
        setFollowers(fetchedFollowers);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(stopLoading());
      }
    };
    getUserFollower();
  }, [data.follower, dispatch, follower]);

  return (
    <Grid container spacing={2}>
      {followers.map((item) => (
        <Grid item md={12} key={item.id}>
          <UserCard id={item.id} avatar={item.avatar} name={item.name} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Follower;
