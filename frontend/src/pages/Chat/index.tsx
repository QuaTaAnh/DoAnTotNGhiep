import { Card, Grid, Typography } from '@mui/material'
import React from 'react'

const Chat:React.FC = () => {
  return (
        <Grid container spacing={2} sx={{display: 'flex', flex: 1}}>
            <Grid item md={4}>
                <Card sx={{padding: '20px', height: '100%'}}>
                    <Typography>Chats</Typography>
                </Card>
            </Grid>
            <Grid item md={8}>Right</Grid>
        </Grid>
  )
}

export default Chat