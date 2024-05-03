import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Address from "./components/Address";
import Information from "./components/Information";

const CreatePost: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (selectedImages) {
      const newUrls = Array.from(selectedImages).map((image) =>
        URL.createObjectURL(image)
      );
      setImages((prevImages) => [...prevImages, ...newUrls]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        Đăng tin mới
      </Typography>
      <form onSubmit={handleSubmit((data) => onSubmit(data as any))}>
        <Typography variant="h5" marginY={2}>
          Địa chỉ cho thuê
        </Typography>
        <Address register={register} errors={errors} />
        <Typography variant="h5" marginY={2}>
          Thông tin mô tả
        </Typography>
        <Information register={register} errors={errors} />
        <Grid md={12}>
          <label htmlFor="">Hình ảnh</label>
        </Grid>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="button-file"
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <label htmlFor="button-file">
          <Box
            sx={{
              color: "#000",
              borderRadius: "6px",
              padding: "30px 24px",
              margin: "16px 0",
              textTransform: "none",
              border: "1px dashed #ccc",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <UploadIcon />
          </Box>
        </label>
        <Grid container md={12} spacing={2}>
          {images.map((image, index) => (
            <Grid item md={3}>
              <CardMedia
                key={index}
                component="img"
                sx={{
                  width: "100%",
                  height: "104px",
                }}
                image={image}
              />
              <Button
                sx={{
                  width: "100%",
                  color: "#fa6819",
                  padding: "2px 0",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
                onClick={() => handleDeleteImage(index)}
              >
                <DeleteOutlineIcon />
                Xóa
              </Button>
            </Grid>
          ))}
        </Grid>

        <Grid md={12}>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{
              backgroundColor: "#fa6819",
              color: "#fff",
              borderRadius: "5px",
              width: "100%",
              padding: "10px 20px",
              marginTop: "20px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#ed570e",
              },
            }}
          >
            Tiếp tục
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default CreatePost;
