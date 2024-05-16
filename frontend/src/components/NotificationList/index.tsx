import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const NotificationList: React.FC = () => {
  const notifications = [
    {
      id: 1,
      avatarSrc: "URL_ảnh",
      title: "Người dùng A",
      subtitle: "bắt đầu theo dõi bạn",
    },
    {
      id: 2,
      avatarSrc: "URL_ảnh",
      title: "Người dùng B",
      subtitle: "đã thích bài viết của bạn",
    },
  ];

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {notifications.map((notification) => (
        <React.Fragment key={notification.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={notification.title} src={notification.avatarSrc} />
            </ListItemAvatar>
            <ListItemText
              primary={notification.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {notification.subtitle}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotificationList;
