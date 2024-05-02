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
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import request from "../../utils/request";
import { showSnackbar } from "../../redux/snackbarRedux";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import { useNavigate, useParams } from "react-router";
import { IUser } from "../../type";

const EditProfile: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<File | Blob | string | null>(null);
  const [image, setImage] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.user);

  const [formChanged, setFormChanged] = useState<boolean>(false);

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
    setFormChanged(true);
    const selectedImage = event.target.files && event.target.files[0];
    setImage(URL.createObjectURL(selectedImage as Blob));
    setImageUrl(selectedImage);
  };

  const onSubmit = (data: IUser, id: number) => {
    const form = new FormData();
  };

  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" marginBottom={4}>
          Cập nhật thông tin cá nhân
        </Typography>
        <form onSubmit={handleSubmit((data) => onSubmit(data, id as any))}>
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
            {...register("phone", {
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
