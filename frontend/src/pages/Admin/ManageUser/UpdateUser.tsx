import React, { useEffect, useRef, useState } from "react";
import { IUser } from "../../../type";
import {
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

const UpdateUser: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: IUser | any;
}> = ({ isOpen, setIsOpen, data }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAvatarClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setAvatar(URL.createObjectURL(selectedFile as Blob));
    }
  };

  useEffect(() => {
    setValue("name", data?.name);
    setValue("phone", data?.phone);
    setValue("zalo", data?.zalo);
  }, [data]);

  const onSubmit = (payload: any) => {
    console.log(payload);
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 20,
          p: 4,
          width: 480,
          height: 500,
        }}
      >
        <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
          Cập nhật thông tin
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={avatar || data?.avatar}
                alt="avatar"
                onClick={handleAvatarClick}
              />
            </Box>
            <input
              type="file"
              accept="image/*"
              ref={inputFileRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </>
          <TextField
            size="small"
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
            size="small"
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
            size="small"
            label="Zalo"
            color="success"
            fullWidth
            margin="normal"
            {...register("zalo", {
              required: "Vui lòng nhập số zalo.",
            })}
            error={!!errors.zalo}
            helperText={errors.zalo?.message as any}
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
              Update
            </Button>
          </Box>
        </form>
        <Button
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            color: "#000",
            padding: "4px 10px",
            textTransform: "none",
            "&:hover": {
              color: "#fff",
              backgroundColor: "#ed570e",
            },
          }}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateUser;
