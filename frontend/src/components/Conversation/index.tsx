import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IUser } from '../../type';
import request from '../../utils/request';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const Conversation:React.FC<{data: any}> = ({data}) => {
  const {user} = useSelector((state: RootState) => state.user)
  const [userData, setUserData] = useState<IUser>()

  useEffect(() =>{
    const parseDataMember = JSON.parse(data?.members)
    const dataId = parseDataMember.find((id: number) => id !== user?.id)

    const getUserData = async () =>{
      try {
        const { data } = await request.get(`/api/v1/user/${dataId}`);
        if (data.status) {
          setUserData(data?.user);
        }
      } catch (error) {
        console.log(error);
      }
     }
    getUserData()
  }, [data?.members, user?.id])
  
  return (
    <Box display={"flex"} alignItems={"center"} 
      sx={{
        cursor:'pointer', 
        borderRadius: '14px',
        backgroundColor: "#ccc",
        padding: '10px 20px',
        margin: '2px 0',
        "&:hover": {
          backgroundColor: "#fa6819",
        },
      }} paddingY={1} paddingX={1}>
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
  )
}

export default Conversation