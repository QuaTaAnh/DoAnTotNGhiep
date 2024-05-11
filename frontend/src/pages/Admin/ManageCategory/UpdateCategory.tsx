import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminCreateUpdateCategory, ICategory } from "../../../type";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

const CreateUpdateCategory: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: ICategory | any;
}> = ({ isOpen, setIsOpen, isEdit, setIsEdit, data }) => {
  const [formChanged, setFormChanged] = useState<boolean>(false);

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

  const onSubmit = (payload: AdminCreateUpdateCategory) => {
    console.log(payload);
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
