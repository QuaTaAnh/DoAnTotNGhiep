import { Container, Grid, Typography } from "@mui/material";

const footerStyle = {
  padding: "30px 0",
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography>
              TÌM BẤT ĐỘNG SẢN TRÊN ỨNG DỤNG CONNECT HOUSING
            </Typography>
            <Typography>
              © {new Date().getFullYear()} CONNECT HOUSING
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
