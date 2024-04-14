import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { register as registerFunction } from "../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../type";
import { showSnackbar } from "../../redux/snackbarRedux";
import { routes } from "../../config/routes";
import Loading from "../../components/Loading";

const Register: React.FC = () => {
  const loading = useSelector((state: boolean | any) => state.loading);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: IUser) => {
    try {
      registerFunction(dispatch, data).then((res: any) => {
        if (res && res?.status === 201) {
          dispatch(
            showSnackbar({ message: "Đăng kí thành công", type: "success" })
          );
          window.location.href = routes.login;
        } else {
          dispatch(
            showSnackbar({
              message: `${res.response.data.message}`,
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
  return (
    <>
      <Container maxWidth="xs" sx={{ marginTop: "70px" }}>
        <Typography variant="h5" align="center" marginBottom={4}>
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size="small"
            label="Họ tên"
            fullWidth
            margin="normal"
            {...register("name", {
              required: "This field is required!",
            })}
            error={!!errors.name}
            helperText={errors.name?.message as any}
          />
          <TextField
            size="small"
            label="Số điện thoại"
            fullWidth
            margin="normal"
            {...register("phone", {
              required: "This field is required!",
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message as any}
          />
          <TextField
            size="small"
            label="Mật khẩu"
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
              Sign up
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
            Already has account?
            <Link to={routes.login}>Sign in</Link>
          </Typography>
        </Box>
      </Container>
      {loading ? <Loading /> : null}
    </>
  );
};

export default Register;
