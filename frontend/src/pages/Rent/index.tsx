import { Box, Grid } from "@mui/material";
import ListItem from "../../components/ListItem";
import Sidebar from "../../components/Sidebar";
import RelatedPost from "../../components/RelatedPost";

import { useLocation } from "react-router-dom";

const Rent: React.FC = () => {
  const location = useLocation();

  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%" }}>
        <Grid container sx={{ marginTop: "40px" }}>
          <Grid item md={8}>
            <ListItem category={location.state} />
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

export default Rent;
