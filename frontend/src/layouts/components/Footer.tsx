import { Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const footerStyle = {
  padding: "30px 0",
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer style={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography>{t("footer")}</Typography>
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
