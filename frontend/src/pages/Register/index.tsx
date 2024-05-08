import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { register as registerFunction } from "../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/snackbarRedux";
import { routes } from "../../config/routes";
import Loading from "../../components/Loading";
import Logo from "../../assets/images/logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const loading = useSelector((state: boolean | any) => state.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    try {
      registerFunction(dispatch, data).then((res: any) => {
        console.log(res);
        if (res && res?.data?.status === true) {
          dispatch(
            showSnackbar({ message: res.data.message, type: "success" })
          );
          navigate("/login");
        } else {
          dispatch(
            showSnackbar({
              message: `${res.data.message}`,
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
    <>
      <Container
        maxWidth="xs"
        sx={{
          marginTop: "70px",
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
        <Typography variant="h5" align="center" marginBottom={1}>
          Đăng kí
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size="medium"
            label="Họ tên"
            color="success"
            fullWidth
            margin="normal"
            {...register("name", {
              required: "Vui lòng nhập họ tên.",
            })}
            error={!!errors.name}
            helperText={errors.name?.message as any}
          />
          <TextField
            size="medium"
            label="Số điện thoại"
            color="success"
            fullWidth
            margin="normal"
            {...register("phone", {
              required: "Vui lòng nhập số điện thoại.",
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message as any}
          />
          <TextField
            size="medium"
            label="Mật khẩu"
            color="success"
            type={showPass ? "text" : "password"}
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
              Đăng kí
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
            Đăng kí tài khoản?
            <Link to={routes.login}>Đăng nhập ngay</Link>
          </Typography>
        </Box>
      </Container>
      {loading ? <Loading /> : null}
    </>
  );
};

export default Register;
