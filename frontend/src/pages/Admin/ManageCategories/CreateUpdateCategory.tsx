import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminCreateUpdateCategory, ICategory } from "../../../type";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/loadingRedux";
import request from "../../../utils/request";
import { showSnackbar } from "../../../redux/snackbarRedux";
import { getCategory } from "../../../redux/callApi";

const CreateUpdateCategory: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: ICategory | any;
}> = ({ isOpen, setIsOpen, isEdit, setIsEdit, data }) => {
  const [formChanged, setFormChanged] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = () => {
    setFormChanged(true);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      setValue("code", data?.code);
      setValue("value", data?.value);
    }
  }, [data, isEdit, setValue]);

  const handleClose = () => {
    setIsOpen(false);
    setIsEdit(false);
    setFormChanged(false);
    reset();
  };

  const onSubmit = async (payload: AdminCreateUpdateCategory) => {
    const params = { ...payload };
    params.code = params?.code?.toUpperCase();
    if (isEdit) {
      try {
        dispatch(startLoading());
        const res = await request.post(
          `/api/v1/category/update/${data.id}`,
          params
        );
        if (res.data.status) {
          dispatch(
            showSnackbar({ message: res.data.message, type: "success" })
          );
          dispatch(getCategory());
          setIsOpen(false);
          setIsEdit(false);
          reset();
        } else {
          dispatch(showSnackbar({ message: res.data.message, type: "error" }));
        }
      } catch (error) {
        console.log(error);
        dispatch(showSnackbar({ message: "Đã xảy ra lỗi", type: "error" }));
      } finally {
        dispatch(stopLoading());
      }
    } else {
      try {
        dispatch(startLoading());
        const { data } = await request.post("/api/v1/category/create", params);
        if (data.status) {
          dispatch(showSnackbar({ message: data.message, type: "success" }));
          dispatch(getCategory());
          setIsOpen(false);
          reset();
        } else {
          dispatch(showSnackbar({ message: data.message, type: "error" }));
        }
      } catch (error) {
        console.log(error);
        dispatch(showSnackbar({ message: "Đã xảy ra lỗi", type: "error" }));
      } finally {
        dispatch(stopLoading());
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
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
          {isEdit ? "Cập nhật danh mục" : "Thêm mới danh mục"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size="small"
            label="Mã danh mục"
            color="success"
            fullWidth
            margin="normal"
            {...register("code", {
              required: "Vui lòng nhập mã danh mục.",
            })}
            error={!!errors.code}
            onChange={handleInputChange}
            inputProps={{ style: { textTransform: "uppercase" } }}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            helperText={errors.code?.message as any}
          />
          <TextField
            size="small"
            label="Tên danh mục"
            color="success"
            fullWidth
            margin="normal"
            {...register("value", {
              required: "Vui lòng nhập tên danh mục.",
            })}
            inputProps={{ style: { textTransform: "capitalize" } }}
            error={!!errors.value}
            onChange={handleInputChange}
            helperText={errors.value?.message as any}
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
              {isEdit ? "Cập nhật" : "Thêm mới"}
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
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateUpdateCategory;
