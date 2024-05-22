import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IUser, MessageProps } from "../../type";
import request from "../../utils/request";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { formatDateComment } from "../../common/formatDate";
import InputEmoji from "react-input-emoji";

const ChatBox: React.FC<{ data: any }> = ({ data }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<IUser>();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  console.log(messages, "123");

  useEffect(() => {
    if (data) {
      const parseDataMember = JSON.parse(data?.members);
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
    console.log(message);
  };

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
          <Typography sx={{ fontSize: "12px", color: "#000" }}>
            Online
          </Typography>
        </Box>
      </Box>
      <Box paddingTop={"20px"} sx={{ flexGrow: 1, overflowY: "auto" }}>
        {messages.map((message: MessageProps, index) => (
          <Box
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
                  message.senderId === user?.id ? "#1976d2" : "#f0f0f0",
                color: "#fff",
                borderRadius: "20px",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                maxWidth: "60%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: message.senderId === user?.id ? "#fff" : "#000",
                }}
              >
                {message.content}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: message.senderId === user?.id ? "#fff" : "#000",
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
