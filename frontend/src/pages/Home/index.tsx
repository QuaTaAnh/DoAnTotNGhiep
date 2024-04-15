import { Box, Grid, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import { TEXT_TITLE } from "../../constants";

const Home: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%", height: "52px" }}>
        <Grid item md={12}>
          <Filter />
        </Grid>
        <Grid item md={12}>
          <Typography
            width={"100%"}
            sx={{
              textAlign: "center",
              marginTop: "40px",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            {TEXT_TITLE}
          </Typography>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Home;
