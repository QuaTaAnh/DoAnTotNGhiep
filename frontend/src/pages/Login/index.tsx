import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { routes } from "../../config/routes";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Logo from "../../assets/images/logo.png";
import { login as loginFunction } from "../../utils/auth";
import { showSnackbar } from "../../redux/snackbarRedux";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { RootState } from "../../redux/store";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);
  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    try {
      loginFunction(dispatch, data).then((res: any) => {
        if (res && res?.data?.status) {
          dispatch(
            showSnackbar({ message: res.data.message, type: "success" })
          );
        } else {
          dispatch(
            showSnackbar({
              message: res.data.message,
              type: "error",
            })
          );
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã có lỗi xảy ra!", type: "error" }));
    }
  };

  const handleTogglePassword = () => {
    setShowPass((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Card
      sx={{
        width: "480px",
        height: "580px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        margin: "auto",
        marginTop: "56px",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "64px",
          }}
        >
          <Avatar
            alt="Logo"
            src={Logo}
            sx={{ width: "100%", height: "100%" }}
          />
        </div>
        <Typography variant="h5" marginBottom={1}>
          Đăng nhập
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size="medium"
            label="Số điện thoại"
            color="success"
            fullWidth
            margin="normal"
            {...register("phone", {
              required: "Vui lòng nhập số điện thoại.",
              pattern: {
                value: /^0\d{9}$/,
                message:
                  "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message as any}
          />
          <TextField
            size="medium"
            type={showPass ? "text" : "password"}
            label="Mật khẩu"
            color="success"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu.",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có độ dài ít nhất 6 ký tự!",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message as any}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "14px", textDecoration: "none" }}>
              <Link to={"#"}>Quên mật khẩu?</Link>
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
                backgroundColor: "#fa6819",
                color: "#fff",
                borderRadius: "5px",
                padding: "8px 20px",
                marginTop: "20px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ed570e",
                },
              }}
            >
              Đăng nhập
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
            Chưa có tài khoản?
            <Link to={routes.register}> Đăng kí tài khoản mới</Link>
          </Typography>
        </Box>
      </Container>
      {loading ? <Loading /> : null}
    </Card>
  );
};

export default Login;
