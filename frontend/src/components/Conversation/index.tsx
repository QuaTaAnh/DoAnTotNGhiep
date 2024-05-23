import { Avatar, Badge, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IUser } from "../../type";
import request from "../../utils/request";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Conversation: React.FC<{
  data: any;
  currentChatId: number | null;
  online: number;
}> = ({ data, currentChatId, online }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const parseDataMember = JSON.parse(data?.members);
    const dataId = parseDataMember.find((id: number) => id !== user?.id);

    const getUserData = async () => {
      try {
        const { data } = await request.get(`/api/v1/user/${dataId}`);
        if (data.status) {
          setUserData(data?.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [data?.members, user?.id]);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{
        cursor: "pointer",
        borderRadius: "5px",
        backgroundColor: currentChatId === data.id ? "#f4f4f4" : "#fff",
        padding: "10px 20px",
        margin: "2px 0",
        "&:hover": {
          backgroundColor: "#f4f4f4",
        },
      }}
      paddingY={1}
      paddingX={1}
    >
      <Badge
        color="default"
        sx={{
          "& .MuiBadge-dot": {
            backgroundColor: online === 1 ? "green" : "gray",
          },
        }}
        overlap="circular"
        variant="dot"
      >
        <Avatar alt="Avatar" src={userData?.avatar} />
      </Badge>
      <Box sx={{ marginLeft: "10px" }}>
        <Typography sx={{ fontSize: "16px", color: "#000" }}>
          {userData?.name}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#000" }}>
          {online === 1 ? "Online" : "Offline"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Conversation;
