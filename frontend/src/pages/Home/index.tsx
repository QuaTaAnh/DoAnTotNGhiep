import { Box, Grid, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import { LOCATION, TEXT_INFO, TEXT_TITLE } from "../../constants";
import LocationButton from "../../components/LocationButton";
import ListItem from "../../components/List";
import Sidebar from "../../components/Sidebar";
import RelatedPost from "../../components/RelatedPost";

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
            <Sidebar />
            <RelatedPost />
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: "40px" }}>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                padding: "15px",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {TEXT_INFO.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  textTransform: "none",
                  margin: "5px 0",
                }}
              >
                {TEXT_INFO.preface}
              </Typography>
              {TEXT_INFO.statistic.map((item: any) => (
                <>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textTransform: "none",
                      margin: "5px 0",
                      fontWeight: "700",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textTransform: "none",
                      margin: "5px 0",
                    }}
                  >
                    {item.content}
                  </Typography>
                </>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Home;
