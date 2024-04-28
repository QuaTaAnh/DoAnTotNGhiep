import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import CardCustom from "../CardCustom";
import { useDispatch, useSelector } from "react-redux";
import { getAcreage, getPrice } from "../../redux/callApi";
import { AppDispatch } from "../../redux/store";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prices, acreages } = useSelector((state: any) => state.api);

  useEffect(() => {
    dispatch(getPrice());
    dispatch(getAcreage());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid
        item
        sx={{
          width: "100%",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        md={12}
      >
        <CardCustom
          title="Lọc theo khoảng giá"
          content={prices}
          type="priceCode"
        />
        <CardCustom
          title="Lọc theo diện tích"
          content={acreages}
          type="areaCode"
        />
      </Grid>
    </Grid>
  );
};

export default Sidebar;
