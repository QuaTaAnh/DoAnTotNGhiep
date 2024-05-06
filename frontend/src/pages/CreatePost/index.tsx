import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Address from "./components/Address";
import Information from "./components/Information";
import { CreatePostForm } from "../../type";
import { getIdFromArea, getIdFromPrice } from "../../common/getCodes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAcreage, getPrice } from "../../redux/callApi";

const CreatePost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prices, acreages } = useSelector((state: RootState) => state.api);

  useEffect(() => {
    dispatch(getPrice());
    dispatch(getAcreage());
  }, [dispatch]);

  const [payload, setPayload] = useState<CreatePostForm>({
    title: "",
    priceNumber: 0,
    areaNumber: 0,
    address: "",
    shortDescription: "",
    detail: "",
    categoryId: 0,
    priceId: 0,
    areaId: 0,
    images: [],
    target: "",
    status: "",
  });

  const handleSubmit = () => {
    const priceId = getIdFromPrice(payload.priceNumber, prices);
    const areaId = getIdFromArea(payload.areaNumber, acreages);
    const resultPayload = {
      ...payload,
      priceNumber: payload.priceNumber / Math.pow(10, 6),
      priceId,
      areaId,
    };
    console.log(resultPayload);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (selectedImages) {
      const filesArray = Array.from(selectedImages);
      Promise.all(filesArray.map(fileToBase64)).then((base64Array) => {
        setPayload((prevPayload) => ({
          ...prevPayload,
          images: [...prevPayload.images, ...base64Array],
        }));
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...payload.images];
    updatedImages.splice(index, 1);
    setPayload((prev: CreatePostForm) => ({
      ...prev,
      images: [...updatedImages],
    }));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        Đăng tin mới
      </Typography>
      <Typography variant="h5" marginY={2}>
        Địa chỉ cho thuê
      </Typography>
      <Address setPayload={setPayload} />
      <Typography variant="h5" marginY={2}>
        Thông tin mô tả
      </Typography>
      <Information payload={payload} setPayload={setPayload} />
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
        {payload.images.map((image, index) => (
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
          onClick={handleSubmit}
        >
          Tiếp tục
        </Button>
      </Grid>
    </Container>
  );
};

export default CreatePost;
