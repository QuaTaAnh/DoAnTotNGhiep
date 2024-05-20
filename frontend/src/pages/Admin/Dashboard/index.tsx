import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import request from "../../../utils/request";
import { IPost } from "../../../type";
import CardPostItem from "../../../components/CardPostItem";

const Dashboard: React.FC = () => {
  const [registrationData, setRegistrationData] = useState<any>([]);
  const [monthlyPosts, setMonthlyPosts] = useState<any>([]);
  const [topView, setTopView] = useState<IPost[]>([]);

  const getStaticRegister = async () => {
    try {
      const { data } = await request.get("/api/v1/user/static-user-register");
      const count = data.counts.map((item: any) => ({
        month: `Tháng ${item.month}/${item.year}`,
        registrations: item.count,
      }));
      setRegistrationData(count);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  const getMonthlyPosts = async () => {
    try {
      const { data } = await request.get("/api/v1/post/monthly-posts");
      const count = data.result.map((item: any) => ({
        month: `Tháng ${item.month}/${item.year}`,
        registrations: item.count,
      }));
      setMonthlyPosts(count);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  const getTopViewPost = async () => {
    try {
      const { data } = await request.get("/api/v1/post/top-view");
      setTopView(data?.result)
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  useEffect(() => {
    getStaticRegister();
    getMonthlyPosts()
    getTopViewPost()
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" marginBottom={4}>
        Số người đăng kí trong tháng
      </Typography>
      <BarChart
        width={800}
        height={400}
        data={registrationData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="registrations" fill="#8884d8" />
      </BarChart>

      <Typography variant="h5" align="center" marginY={4}>
        Số bài đăng trong tháng
      </Typography>
      <BarChart
        width={800}
        height={400}
        data={monthlyPosts}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="registrations" fill="#8884d8" />
      </BarChart>

      <Typography variant="h5" align="center" marginY={4}>
        Top 3 bài đăng có lượt truy cập nhiều nhất
      </Typography>
      <Grid container spacing={2}>
        {topView.map((post: IPost) => (
          <Grid item md={4} key={post.id}>
            <CardPostItem data={post}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
