import React, { useEffect, useRef, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IUser, MessageProps } from "../../type";
import request from "../../utils/request";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { formatDateComment } from "../../common/formatDate";
import InputEmoji from "react-input-emoji";

const ChatBox: React.FC<{
  data: any;
  setSendMessage: any;
  receivedMessage: any;
}> = ({ data, setSendMessage, receivedMessage }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<IUser>();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [message, setMessage] = useState("");
  const parseDataMember = JSON.parse(data?.members);
  const scroll = useRef<any>();

  useEffect(() => {
    if (data) {
      const dataId = parseDataMember.find((id: number) => id !== user?.id);
      const getUserData = async () => {
        try {
          const res = await request.get(`/api/v1/user/${dataId}`);
          if (res.data.status) {
            setUserData(res.data?.user);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUserData();
    }
  }, [data, user?.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await request.get(`/api/v1/message/${data?.id}`);
        console.log(res.data.data);
        if (res.data.status) {
          setMessages(res?.data?.data);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (data !== null) getMessages();
  }, [data?.id]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSend = async (e: any) => {
    e.preventDefault();
    const newMessage = {
      senderId: user?.id,
      roomId: data?.id,
      content: message,
    };

    const receiverId = parseDataMember.find((id: number) => id !== user?.id);
    setSendMessage({ ...newMessage, receiverId });

    try {
      const { data } = await request.post("/api/v1/message/", newMessage);
      if (data.status) {
        setMessages([...messages, data?.data]);
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.roomId === data?.id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        width: "100",
        height: "100%",
        padding: "20px 10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        sx={{
          cursor: "pointer",
          borderBottom: "1px solid #ccc",
        }}
        paddingY={1}
        paddingX={1}
      >
        <Avatar
          alt="Avatar"
          sx={{ marginRight: "10px" }}
          src={userData?.avatar}
        />
        <Box>
          <Typography sx={{ fontSize: "16px", color: "#000" }}>
            {userData?.name}
          </Typography>
        </Box>
      </Box>
      <Box paddingTop={"20px"} sx={{ flexGrow: 1, overflowY: "auto" }}>
        {messages.map((message: MessageProps, index) => (
          <Box
            ref={scroll}
            key={index}
            display="flex"
            justifyContent={
              message.senderId === user?.id ? "flex-end" : "flex-start"
            }
            mb={2}
          >
            <Paper
              style={{
                margin: "0 6px",
                padding: "6px 14px",
                backgroundColor:
                  message.senderId === user?.id ? "#fff4d6" : "#f0f0f0",
                color: "#fff",
                borderRadius: "10px",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                maxWidth: "60%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#000",
                }}
              >
                {message.content}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#000",
                }}
              >
                {formatDateComment(message.createdAt)}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 0,
        }}
      >
        <InputEmoji
          value={message}
          onChange={setMessage}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          shouldReturn={false}
          shouldConvertEmojiToImage={false}
        />
        <Button
          sx={{
            backgroundColor: "#fa6819",
            color: "#fff",
            borderRadius: "5px",
            padding: "6px 16px",
            marginLeft: "10px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#ed570e",
            },
          }}
          onClick={handleSend}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
