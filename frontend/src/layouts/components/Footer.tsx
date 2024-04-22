import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const footerStyle = {
  backgroundColor: "#f5f5f5",
  padding: "50px 0",
};

const linkStyle = {
  textDecoration: "none",
  color: "#fa6819",
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography gutterBottom>
              TÌM BẤT ĐỘNG SẢN TRÊN ỨNG DỤNG CONNECT HOUSING
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom>VỀ CONNECT HOUSING</Typography>
            <Typography sx={{ margin: "8px 0", fontSize: "14px" }}>
              <Link to="#" style={linkStyle}>
                Về Connect Housing
              </Link>
            </Typography>
            <Typography sx={{ margin: "8px 0", fontSize: "14px" }}>
              <Link to="#" style={linkStyle}>
                Quy chế hoạt động sàn
              </Link>
            </Typography>
            <Typography sx={{ margin: "8px 0", fontSize: "14px" }}>
              <Link to="#" style={linkStyle}>
                Chính sách bảo mật
              </Link>
            </Typography>
            <Typography sx={{ margin: "8px 0", fontSize: "14px" }}>
              <Link to="#" style={linkStyle}>
                Giải quyết tranh chấp
              </Link>
            </Typography>
            <Typography sx={{ margin: "8px 0", fontSize: "14px" }}>
              <Link to="#" style={linkStyle}>
                Điều khoản sử dụng
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography gutterBottom>LIÊN KẾT</Typography>
            <Typography sx={{ margin: "8px 0", fontSize: "14px" }}>
              <Link to="#">
                <FacebookIcon />
              </Link>
            </Typography>
            <Typography sx={{ margin: "8px 0", fontSize: "14px" }}>
              <Link to="#">
                <YouTubeIcon />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
