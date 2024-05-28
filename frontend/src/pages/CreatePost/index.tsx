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
import request from "../../utils/request";
import { startLoading, stopLoading } from "../../redux/loadingRedux";
import { showSnackbar } from "../../redux/snackbarRedux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreatePost: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { prices, acreages } = useSelector((state: RootState) => state.api);
  const [error, setError] = useState<string>('');

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
    target: "Tất cả",
    status: "active",
  });

  const handleSubmit = async () => {
    const priceId = getIdFromPrice(payload.priceNumber, prices);
    const areaId = getIdFromArea(payload.areaNumber, acreages);
    const resultPayload = {
      ...payload,
      priceNumber: (payload.priceNumber / Math.pow(10, 6)).toFixed(2),
      priceId,
      areaId,
    };
    try {
      dispatch(startLoading());
      const { data } = await request.post("/api/v1/post/create", resultPayload);
      if (data.status) {
        dispatch(showSnackbar({ message: data.message, type: "success" }));
        navigate(`/post-detail/${data?.post?.id}`);
      } else {
        dispatch(showSnackbar({ message: data.message, type: "error" }));
      }
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar({ message: "Đã xảy ra lỗi", type: "error" }));
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (selectedImages) {
      const filesArray = Array.from(selectedImages);
      if (filesArray.length < 3 || filesArray.length > 8) {
        setError('Bạn phải đăng từ 3 đến 9 hình ảnh.');
        return;
      }
      setError('');
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
    <Container maxWidth="lg">
      <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
        {t("titleNewPost")}
      </Typography>
      <Typography variant="h5" marginY={2}>
        {t("rentalAddress")}
      </Typography>
      <Address setPayload={setPayload} />
      <Typography variant="h5" marginY={2}>
        {t("description")}
      </Typography>
      <Information payload={payload} setPayload={setPayload} />
      <Grid md={12}>
        <label htmlFor="">{t("image")}</label>
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
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UploadIcon />
          <Typography sx={{ fontSize: "12px" }}>Đăng từ 3-8 hình</Typography>
        </Box>
      </label>
      {error && <Typography color="error" fontSize={14}>{error}</Typography>}
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
              {t("button.delete")}
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
            margin: "20px 0",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#ed570e",
            },
          }}
          onClick={handleSubmit}
        >
          {t("button.continue")}
        </Button>
      </Grid>
    </Container>
  );
};

export default CreatePost;
