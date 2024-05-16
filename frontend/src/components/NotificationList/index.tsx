import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import { IUser } from "../../type";
import request from "../../utils/request";
import { formatDateComment } from "../../common/formatDate";

const NotificationList: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [startFollow, setStartFollow] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserFollower = async () => {
      try {
        dispatch(startLoading());
        const followerData = user?.follower ?? [];
        const fetchedFollowers = await Promise.all(
          followerData.map(async (item) => {
            const res = await request.get(
              `/api/v1/user/follow/${item.followerId}`
            );
            return res.data.user;
          })
        );
        setFollowers(fetchedFollowers);
        const matchingFollower = followerData.find((follower) =>
          fetchedFollowers.some((user) => user.id === follower.followerId)
        );
        if (matchingFollower) {
          setStartFollow(matchingFollower.createdAt);
        }
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(stopLoading());
      }
    };
    getUserFollower();
  }, [dispatch, user?.follower]);

  return (
    <>
      {followers.length > 0 ? (
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {followers.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="tb" src={user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        đã bắt đầu theo dõi bạn
                      </Typography>
                      <Typography
                        sx={{ display: "inline", marginLeft: 1 }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {formatDateComment(startFollow)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography sx={{ padding: "30px" }}>Không có thông báo</Typography>
      )}
    </>
  );
};

export default NotificationList;
