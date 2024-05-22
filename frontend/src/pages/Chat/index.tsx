import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Conversation from "../../components/Conversation";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ChatBox from "../../components/ChatBox";
import { ChatProps } from "../../type";

const Chat: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatProps | null>(null);
  const [defaultCurrentChat, setDefaultCurrentChat] =
    useState<ChatProps | null>(null);

  useEffect(() => {
    const getChat = async () => {
      try {
        const { data } = await request.get(`/api/v1/chat/${user?.id}`);
        if (data?.status) {
          setChats(data?.data);
          setDefaultCurrentChat(data?.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChat();
  }, [user?.id]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", flex: 1, height: "100%" }}
    >
      <Grid item md={4}>
        <Card sx={{ height: "100%" }}>
          <Box
            sx={{
              padding: "20px",
              display: "flex",

              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
              Chats
            </Typography>
            {chats.map((item) => (
              <div onClick={() => setCurrentChat(item)}>
                <Conversation data={item} />
              </div>
            ))}
          </Box>
        </Card>
      </Grid>
      <Grid item md={8} sx={{ height: "100%" }}>
        <Card sx={{ height: "100%" }}>
          <ChatBox data={currentChat || defaultCurrentChat} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Chat;
