import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { routes } from "../../config/routes";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const Login: React.FC = () => {
  const loading = useSelector((state: boolean | any) => state.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ marginTop: "70px" }}>
        <Typography variant="h5" align="center" marginBottom={4}>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Email</label>
          <TextField
            size="small"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "This field is required!",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email!",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message as any}
          />
          <label htmlFor="">Password</label>
          <TextField
            size="small"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "This field is required!",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long!",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message as any}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={<Checkbox {...register("rememberMe")} />}
              label="Remember me"
            />
            <Box sx={{ flexGrow: 1 }} />
            <Typography sx={{ fontSize: "14px" }}>
              <Link to={"#"}>Forgot password?</Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: "#667080",
                color: "#fff",
                borderRadius: "24px",
                padding: "9px 24px",
                marginTop: "20px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#667080",
                },
              }}
            >
              Sign in
            </Button>
          </Box>
        </form>
        <Box>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "14px",
              marginTop: "20px",
            }}
          >
            Don’t have an account?
            <Link to={routes.register}>Sign in</Link>
          </Typography>
        </Box>
      </Container>
      {loading ? <Loading /> : null}
    </>
  );
};

export default Login;
