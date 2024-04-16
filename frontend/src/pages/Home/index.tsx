import { Box, Grid, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import { LOCATION, TEXT_TITLE } from "../../constants";
import LocationButton from "../../components/LocationButton";

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
              margin: "40px 0",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            {TEXT_TITLE}
          </Typography>
        </Grid>

        <Grid container spacing={12}>
          {LOCATION.map((item: any) => (
            <Grid key={item?.id} item xs={12} sm={6} md={4}>
              <LocationButton name={item?.name} image={item?.image} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Home;
