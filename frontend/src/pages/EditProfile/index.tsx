import {
  Box,
  Button,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import NoImage from "../../assets/images/noImage.jpg";
import { ChangeEvent, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { showSnackbar } from "../../redux/snackbarRedux";
import { useNavigate } from "react-router";
import { UpdateProfileForm } from "../../type";
import { editProfile as editProfileFunction } from "../../utils/auth";
import { getProfile } from "../../redux/callApi";

const EditProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<File | Blob | string | null | any>("");
  const [image, setImage] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.user);
  const [formChanged, setFormChanged] = useState<boolean>(false);
  const [avartarChanged, setAvartarChanged] = useState<boolean>(false);

  const handleInputChange = () => {
    setFormChanged(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("name", user?.name);
    setValue("phone", user?.phone);
    setValue("zalo", user?.zalo);
  }, [setValue, user]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAvartarChanged(true);
    setFormChanged(true);
    const selectedImage = event.target.files && event.target.files[0];
    setImage(URL.createObjectURL(selectedImage as Blob));
    setFileToBase(selectedImage);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result as any);
      };
    } else {
      setAvatar("");
    }
  };

  const onSubmit = (data: UpdateProfileForm) => {
    let params = { ...data };
    if (avartarChanged) {
      params = { ...data, avatar };
    }
    try {
      editProfileFunction(dispatch, params).then((res: any) => {
        if (res.data.status === true) {
          dispatch(
            showSnackbar({ message: res.data.message, type: "success" })
          );
          dispatch(getProfile());
          navigate("/profile");
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

  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" marginBottom={4}>
          Cập nhật thông tin cá nhân
        </Typography>
        <form onSubmit={handleSubmit((data) => onSubmit(data as any))}>
          <Box
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                sx={{ width: "122px", height: "104px" }}
                image={image ? image : user?.avatar || NoImage}
              />
            </Box>
            <Box sx={{ marginLeft: "20px" }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="button-file"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="button-file">
                <Button
                  variant="contained"
                  component="span"
                  size="medium"
                  sx={{
                    backgroundColor: "#667080",
                    color: "#fff",
                    borderRadius: "6px",
                    padding: "9px 24px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#667080",
                    },
                  }}
                >
                  Upload
                </Button>
              </label>
              <Typography sx={{ color: "#667080" }}>
                Maximum size of 1MB. JPG, GIF, or PNG.
              </Typography>
            </Box>
          </Box>
          <label htmlFor="">Tên hiển thị</label>
          <TextField
            size="small"
            fullWidth
            margin="normal"
            {...register("name", {
              required: "This field is required!",
            })}
            error={!!errors.name}
            onChange={handleInputChange}
            helperText={errors.name?.message as any}
          />
          <label htmlFor="">Số điện thoại</label>
          <TextField
            size="small"
            fullWidth
            margin="normal"
            {...register("phone", {
              required: "This field is required!",
            })}
            error={!!errors.phone}
            onChange={handleInputChange}
            helperText={errors.phone?.message as any}
          />
          <label htmlFor="">Số Zalo</label>
          <TextField
            size="small"
            fullWidth
            margin="normal"
            {...register("zalo", {
              required: "This field is required!",
            })}
            error={!!errors.zalo}
            onChange={handleInputChange}
            helperText={errors.zalo?.message as any}
          />

          <label htmlFor="">Mật khẩu mới</label>
          <TextField
            size="small"
            type="password"
            fullWidth
            margin="normal"
            {...register("newPassword", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long!",
              },
              validate: {
                oldPasswordFilled: (value) => {
                  const oldPassword = getValues("oldPassword");
                  return oldPassword ? !!value : true;
                },
              },
            })}
            error={!!errors.newPassword}
            onChange={handleInputChange}
            helperText={errors.newPassword?.message as any}
          />
          <label htmlFor="">Mật khẩu cũ</label>
          <TextField
            size="small"
            type="password"
            fullWidth
            margin="normal"
            {...register("oldPassword", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long!",
              },
              validate: {
                newPasswordFilled: (value) => {
                  const newPassword = getValues("newPassword");
                  return newPassword ? !!value : true;
                },
              },
            })}
            error={!!errors.oldPassword}
            onChange={handleInputChange}
            helperText={errors.oldPassword?.message as any}
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
              disabled={!formChanged}
            >
              Cập nhật
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default EditProfile;
