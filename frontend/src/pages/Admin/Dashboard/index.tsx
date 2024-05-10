import { Container, Typography } from "@mui/material";
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

const Dashboard: React.FC = () => {
  const [registrationData, setRegistrationData] = useState<any>([]);

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

  useEffect(() => {
    getStaticRegister();
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
    </Container>
  );
};

export default Dashboard;
