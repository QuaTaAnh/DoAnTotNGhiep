import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItem from "../../components/List";
import Sidebar from "../../components/Sidebar";
import RelatedPost from "../../components/RelatedPost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLocation } from "react-router-dom";
import { formatToString } from "../../common";

const SharedRent: React.FC = () => {
  const { prices, areas, categories } = useSelector(
    (state: RootState) => state.api
  );
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const [categoryCode, setCategoryCode] = useState("none");
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const category = categories?.find(
      (item: any) => `/${formatToString(item.value)}` === location.pathname
    );
    console.log(category);
    setCategoryCurrent(category);
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location]);

  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%" }}>
        <Grid container sx={{ marginTop: "40px" }}>
          <Grid item md={8}>
            <ListItem categoryCode={categoryCode} />
          </Grid>
          <Grid item md={4}>
            <Sidebar />
            <RelatedPost />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SharedRent;
