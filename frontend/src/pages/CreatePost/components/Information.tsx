import { Grid, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getCategory } from "../../../redux/callApi";

interface AddressFieldsProps {
  register: any;
  errors: any;
}

const Information: React.FC<AddressFieldsProps> = ({
  register,
  errors,
}: AddressFieldsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState<string>("");
  const { categories } = useSelector((state: RootState) => state.api);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <Grid md={6}>
        <label htmlFor="">Loại chuyên mục</label>
        <Select fullWidth sx={{ height: "40px", margin: "10px" }}>
          {categories?.map((category: any) => (
            <MenuItem key={category.code} value={category.code}>
              {category.value}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid md={12}>
        <label htmlFor="">Tiêu đề</label>
        <TextField
          size="small"
          fullWidth
          margin="normal"
          {...register("phone", {
            required: "This field is required!",
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message as any}
        />
      </Grid>
      <Grid md={12}>
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
      <Grid md={6}>
        <label htmlFor="">Thông tin liên hệ</label>
        <TextField name="name" size="small" fullWidth margin="normal" />
      </Grid>
      <Grid md={6}>
        <label htmlFor="">Điện thoại</label>
        <TextField name="phone" size="small" fullWidth margin="normal" />
      </Grid>
      <Grid md={12}>
        <label htmlFor="">Giá cho thuê</label>
        <TextField
          size="small"
          fullWidth
          margin="normal"
          {...register("phone", {
            required: "This field is required!",
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message as any}
        />
      </Grid>
      <Grid md={12}>
        <label htmlFor="">Đối tượng cho thuê</label>
        <TextField
          size="small"
          fullWidth
          margin="normal"
          {...register("phone", {
            required: "This field is required!",
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message as any}
        />
      </Grid>
    </>
  );
};

export default Information;
