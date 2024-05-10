import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import request from "../../../utils/request";

const Dashboard: React.FC = () => {
  const [registrationData, setRegistrationData] = useState([]);

  const getStaticRegister = async () => {
    try {
      const res = await request.get("/api/v1/user/static-user-register");
      const count = res.data.count;
      const today = new Date();
      const data: any = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - i
        );
        data.push({
          name: date.toLocaleDateString(),
          registrations: i === 6 ? count : 0,
        });
      }

      setRegistrationData(data);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  useEffect(() => {
    getStaticRegister();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" marginBottom={4}>
        Số người đăng kí theo ngày
      </Typography>
      <LineChart width={800} height={400} data={registrationData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="registrations" stroke="#8884d8" />
      </LineChart>
    </Container>
  );
};

export default Dashboard;
