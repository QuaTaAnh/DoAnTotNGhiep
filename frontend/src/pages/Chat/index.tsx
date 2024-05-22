import { Box, Card, Grid, Typography } from "@mui/material";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Conversation from "../../components/Conversation";
import request from "../../utils/request";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ChatBox from "../../components/ChatBox";
import { ChatProps } from "../../type";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const Chat: React.FC = () => {
  const { state } = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatProps | null>(null);
  const [defaultCurrentChat, setDefaultCurrentChat] =
    useState<ChatProps | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  
  const socket: MutableRefObject<any> = useRef();

  useEffect(() => {
    const getChat = async () => {
      try {
        const { data } = await request.get(`/api/v1/chat/${user?.id}`);
        if (data?.status) {
          setChats(data?.data);

          if (state && state.id) {
            const defaultChat = data.data.find(
              (chat: ChatProps) => chat.id === state.id
            );
            setDefaultCurrentChat(defaultChat || data.data[0]);
          } else {
            setDefaultCurrentChat(data?.data[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChat();
  }, [user?.id]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user?.id);
    socket.current.on("get-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data: any) => {
      setReceivedMessage(data);
    }
    );
  }, []);

  const checkOnlineStatus = (chat: ChatProps) => {
    const parseDataMember = JSON.parse(chat?.members);
    const chatMember = parseDataMember.find(
      (member: number) => member !== user?.id
    );
    const online = onlineUsers.find((user: any) => user?.userId === chatMember);
    return online ? true : false;
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", flex: 1, height: "100%" }}
    >
      {chats.length > 0 ? (
        <>
          <Grid item md={4} xs={2} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%", overflowY: "auto" }}>
              <Box
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: 700,
                  }}
                >
                  Chats
                </Typography>
                {chats.map((item) => (
                  <div onClick={() => setCurrentChat(item)}>
                    <Conversation
                      data={item}
                      currentChatId={currentChat?.id || null}
                      online={checkOnlineStatus(item)}
                    />
                  </div>
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid item md={8} xs={10} sx={{ height: "100%" }}>
            <Card sx={{ height: "100%" }}>
              <ChatBox
                data={currentChat || defaultCurrentChat}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
              />
            </Card>
          </Grid>
        </>
      ) : (
        <Grid container justifyContent="center">
          <Typography sx={{ fontSize: "40px", paddingTop: "20px" }}>
            Bạn chưa có cuộc trò chuyện nào!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Chat;
