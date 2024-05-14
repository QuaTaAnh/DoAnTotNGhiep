import React from "react";
import { Card, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface UserCardProps {
  id: number;
  avatar: string;
  name: string;
}

const UserCard: React.FC<UserCardProps> = ({ id, avatar, name }) => {
  return (
    <Link
      to={`/user/${id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Card
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
        <Typography sx={{ fontSize: "14px", marginLeft: "10px" }}>
          {name}
        </Typography>
      </Card>
    </Link>
  );
};

export default UserCard;
