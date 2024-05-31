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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import request from "../../../utils/request";
import { IPost } from "../../../type";
import CardPostItem from "../../../components/CardPostItem";

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface PostCategory {
  count: number;
  category: string;
}

interface TypeStatitic {
  year: number;
  month: number;
  count: number;
  registrations?: number;
}

const Dashboard: React.FC = () => {
  const [registrationData, setRegistrationData] = useState<TypeStatitic[]>([]);
  const [monthlyPosts, setMonthlyPosts] = useState<TypeStatitic[]>([]);
  const [postCategory, setPostCategory] = useState<PostCategory[]>([]);
  const [topView, setTopView] = useState<IPost[]>([]);

  const getStaticRegister = async () => {
    try {
      const { data } = await request.get("/api/v1/user/statitic/user-register");
      const count = data.counts.map((item: TypeStatitic) => ({
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
      const { data } = await request.get("/api/v1/post/statitic/monthly-posts");
      const count = data.result.map((item: TypeStatitic) => ({
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
      const { data } = await request.get("/api/v1/post/statitic/top-view");
      setTopView(data?.result);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  const getCategoryPostCount = async () => {
    try {
      const { data } = await request.get("/api/v1/post/statitic/post-category");
      setPostCategory(data?.result);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  useEffect(() => {
    getStaticRegister();
    getMonthlyPosts();
    getTopViewPost();
    getCategoryPostCount();
  }, []);

  const colors: string[] = [];
  postCategory.forEach(() => {
    colors.push(getRandomColor());
  });

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
            <CardPostItem data={post} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" align="center" marginY={4}>
        Số bài đăng theo danh mục
      </Typography>
      <PieChart width={800} height={400}>
        <Pie
          data={postCategory}
          dataKey="count"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {postCategory.map((entry: PostCategory, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [
            value,
            postCategory[name as number].category,
          ]}
        />
        <Legend />
      </PieChart>
    </Container>
  );
};

export default Dashboard;
