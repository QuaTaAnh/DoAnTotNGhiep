import { Box, Grid, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import { LOCATION, TEXT_TITLE } from "../../constants";
import LocationButton from "../../components/LocationButton";
import ListItem from "../../components/List";

const Home: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%" }}>
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
            <Grid key={item?.id} item xs={12} md={4}>
              <LocationButton name={item?.name} image={item?.image} />
            </Grid>
          ))}
        </Grid>

        <Grid container sx={{ marginTop: "40px" }}>
          <Grid item xs={12} md={8}>
            <ListItem />
          </Grid>
          <Grid item xs={0} md={4}>
            Nav
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Home;
