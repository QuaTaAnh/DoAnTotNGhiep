import { Box, Grid } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Box sx={{ width: "100%" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            Test
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Home;
