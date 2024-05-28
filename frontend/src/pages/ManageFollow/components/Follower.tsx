import React, { useEffect, useState } from "react";
import { IUser } from "../../../type";
import UserCard from "../../../components/UserCard";
import { Grid } from "@mui/material";
import request from "../../../utils/request";

const Follower: React.FC<{ data: IUser }> = ({ data }) => {
  const [followers, setFollowers] = useState<IUser[]>([]);
  const { follower } = data;

  useEffect(() => {
    const getUserFollower = async () => {
      try {
        const followerData = follower ?? [];
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
      }
    };
    getUserFollower();
  }, [follower]);

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
