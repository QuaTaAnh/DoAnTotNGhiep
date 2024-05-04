import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getCategory } from "../../../redux/callApi";
import { CreatePostForm, ICategory, TypeDefault } from "../../../type";
import { TARGETS } from "../../../constants";
import { formatPrice } from "../../../common";

interface AddressFieldsProps {
  payload: CreatePostForm;
  setPayload: any;
}

const Information: React.FC<AddressFieldsProps> = ({
  payload,
  setPayload,
}: AddressFieldsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState<string>("");
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const { categories } = useSelector((state: RootState) => state.api);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleContentChange = (value: string) => {
    setContent(value);
    setPayload((prev: CreatePostForm) => ({
      ...prev,
      description: value,
    }));
  };

  return (
    <Grid container spacing={2} marginBottom={2}>
      <Grid item md={12}>
        <label htmlFor="">Loại chuyên mục</label>
        <Select
          fullWidth
          sx={{ height: "40px", marginTop: "10px" }}
          value={payload.categoryCode}
          onChange={(e) => {
            setPayload((prev: CreatePostForm) => ({
              ...prev,
              categoryCode: e.target.value,
            }));
          }}
        >
          {categories.map((category: ICategory) => (
            <MenuItem key={category.code} value={category.code}>
              {category.value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item md={12}>
        <label htmlFor="">Tiêu đề</label>
        <TextField
          name="title"
          size="small"
          fullWidth
          margin="normal"
          value={payload.title}
          onChange={(e) => {
            setPayload((prev: CreatePostForm) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
          onClick={() => setShowTitle(true)}
          onBlur={() => setShowTitle(false)}
        />
      </Grid>
      {showTitle && (
        <Grid item md={12}>
          <Box sx={{ padding: "10px", border: "1px solid #fa6819" }}>
            <Typography fontSize={14} color={"blue"}>
              Tiêu đề tốt nên có
            </Typography>
            <Typography fontSize={14} color={"#fa6819"}>
              Loại căn chung cư + Diện tích + Số phòng ngủ + Tên dự án/Tên
              đường, Quận.<br></br> Ví dụ: - Căn hộ 48m2 2PN VinHome SmartCity
              Hà Nội
            </Typography>
          </Box>
        </Grid>
      )}
      <Grid item md={12}>
        <label htmlFor="">Nội dung mô tả</label>
        <ReactQuill
          theme="snow"
          style={{
            margin: "16px 0",
          }}
          value={content}
          onChange={handleContentChange}
        />
      </Grid>
      <Grid item md={6}>
        <label htmlFor="">Thông tin liên hệ</label>
        <TextField
          name="name"
          size="small"
          fullWidth
          margin="normal"
          value={user?.name}
          InputProps={{
            readOnly: true,
            sx: {
              backgroundColor: "#ccc",
            },
          }}
        />
      </Grid>
      <Grid item md={6}>
        <label htmlFor="">Điện thoại</label>
        <TextField
          name="phone"
          size="small"
          fullWidth
          margin="normal"
          value={user?.phone}
          InputProps={{
            readOnly: true,
            sx: {
              backgroundColor: "#ccc",
            },
          }}
        />
      </Grid>
      <Grid item md={6}>
        <label htmlFor="">Giá cho thuê</label>
        <TextField
          name="priceNumber"
          size="small"
          fullWidth
          margin="normal"
          value={formatPrice(payload.priceNumber)}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            const parsedValue = newValue === "" ? 0 : parseFloat(newValue);
            setPayload((prev: CreatePostForm) => ({
              ...prev,
              priceNumber: parsedValue,
            }));
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">triệu/tháng</InputAdornment>
            ),
          }}
          inputProps={{
            maxLength: 15,
          }}
        />
      </Grid>
      <Grid item md={6}>
        <label htmlFor="">Diện tích</label>
        <TextField
          name="areaNumber"
          size="small"
          fullWidth
          margin="normal"
          value={payload.areaNumber}
          onChange={(e) => {
            setPayload((prev: CreatePostForm) => ({
              ...prev,
              areaNumber: e.target.value,
            }));
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                m<sub>2</sub>
              </InputAdornment>
            ),
          }}
          inputProps={{
            maxLength: 12,
          }}
        />
      </Grid>
      <Grid item md={12}>
        <label htmlFor="">Đối tượng cho thuê</label>
        <Select
          fullWidth
          sx={{ height: "40px", marginTop: "10px" }}
          value={payload.target}
          onChange={(e) => {
            setPayload((prev: CreatePostForm) => ({
              ...prev,
              target: e.target.value,
            }));
          }}
        >
          {TARGETS.map((tar: TypeDefault) => (
            <MenuItem key={tar.code} value={tar.code}>
              {tar.value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default Information;
