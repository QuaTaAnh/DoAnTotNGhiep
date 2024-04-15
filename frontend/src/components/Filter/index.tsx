import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PopperCustom from "../PoperCustom";
import RoomIcon from "@mui/icons-material/Room";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

const Filter: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOpenLocation, setIsOpenLocation] = useState<boolean>(false);
  const [isOpenType, setIsOpenType] = useState<boolean>(false);
  const [isOpenPrice, setIsOpenPrice] = useState<boolean>(false);
  const [isOpenAcreage, setIsOpenAcreage] = useState<boolean>(false);

  const handleOpenLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenLocation(true);
    setIsOpenType(false);
    setIsOpenPrice(false);
    setIsOpenAcreage(false);
  };

  const handleOpenType = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenType(true);
    setIsOpenLocation(false);
    setIsOpenPrice(false);
    setIsOpenAcreage(false);
  };

  const handleOpenPrice = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenPrice(true);
    setIsOpenLocation(false);
    setIsOpenType(false);
    setIsOpenAcreage(false);
  };

  const handleOpenAcreage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenAcreage(true);
    setIsOpenLocation(false);
    setIsOpenType(false);
    setIsOpenPrice(false);
  };

  const handleCloseLocation = () => {
    setAnchorEl(null);
    setIsOpenLocation(false);
  };

  const handleCloseType = () => {
    setAnchorEl(null);
    setIsOpenType(false);
  };

  const handleClosePrice = () => {
    setAnchorEl(null);
    setIsOpenPrice(false);
  };

  const handleCloseAcreage = () => {
    setAnchorEl(null);
    setIsOpenAcreage(false);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Grid item sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            fullWidth
            sx={{
              color: "#000",
              padding: "6px 10px",
              border: "1px solid silver",
              borderRadius: "25px",
              "&:hover": {
                backgroundColor: "#e7e7e7",
              },
            }}
            onClick={handleOpenLocation}
          >
            <Typography textTransform={"capitalize"} fontSize={14}>
              Toàn quốc
            </Typography>
            <ArrowDropDownIcon />
          </Button>
          <PopperCustom
            open={isOpenLocation}
            anchorEl={anchorEl}
            handleClose={handleCloseLocation}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#000",
                fontWeight: 700,
              }}
            >
              <RoomIcon />
              Tìm theo khu vực
            </Typography>
            <Box sx={{ margin: "20px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="province-select-label">
                  Chọn tỉnh thành
                </InputLabel>
                <Select
                  labelId="province-select-label"
                  id="province-select"
                  sx={{ height: "40px" }}
                  color="success"
                  // value={province}
                  // onChange={handleProvinceChange}
                >
                  {/* {provinces.map((province) => (
            <MenuItem key={province.id} value={province.name}>
              {province.name}
            </MenuItem>
          ))} */}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ margin: "20px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="province-select-label">
                  Chọn quận huyện
                </InputLabel>
                <Select
                  labelId="province-select-label"
                  id="province-select"
                  sx={{ height: "40px" }}
                  color="success"
                  // value={province}
                  // onChange={handleProvinceChange}
                >
                  {/* {provinces.map((province) => (
            <MenuItem key={province.id} value={province.name}>
              {province.name}
            </MenuItem>
          ))} */}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ margin: "20px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="province-select-label">
                  Chọn phường xã
                </InputLabel>
                <Select
                  labelId="province-select-label"
                  id="province-select"
                  sx={{ height: "40px" }}
                  color="success"
                  // value={province}
                  // onChange={handleProvinceChange}
                >
                  {/* {provinces.map((province) => (
            <MenuItem key={province.id} value={province.name}>
              {province.name}
            </MenuItem>
          ))} */}
                </Select>
              </FormControl>
            </Box>
          </PopperCustom>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            fullWidth
            sx={{
              color: "#000",
              padding: "6px 10px",
              border: "1px solid silver",
              borderRadius: "25px",
              "&:hover": {
                backgroundColor: "#e7e7e7",
              },
            }}
            onClick={handleOpenType}
          >
            <Typography textTransform={"capitalize"} fontSize={14}>
              Chọn loại bất động sản
            </Typography>
            <ArrowDropDownIcon />
          </Button>
          <PopperCustom
            open={isOpenType}
            anchorEl={anchorEl}
            handleClose={handleCloseType}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#000",
                fontWeight: 700,
              }}
            >
              <ApartmentIcon />
              Chọn loại bất động sản
            </Typography>
          </PopperCustom>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            fullWidth
            sx={{
              color: "#000",
              padding: "6px 10px",
              border: "1px solid silver",
              borderRadius: "25px",
              "&:hover": {
                backgroundColor: "#e7e7e7",
              },
            }}
            onClick={handleOpenPrice}
          >
            <Typography textTransform={"capitalize"} fontSize={14}>
              Chọn giá
            </Typography>
            <ArrowDropDownIcon />
          </Button>
          <PopperCustom
            open={isOpenPrice}
            anchorEl={anchorEl}
            handleClose={handleClosePrice}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#000",
                fontWeight: 700,
              }}
            >
              <AttachMoneyIcon />
              Chọn giá
            </Typography>
          </PopperCustom>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            fullWidth
            sx={{
              color: "#000",
              padding: "6px 10px",
              border: "1px solid silver",
              borderRadius: "25px",
              "&:hover": {
                backgroundColor: "#e7e7e7",
              },
            }}
            onClick={handleOpenAcreage}
          >
            <Typography textTransform={"capitalize"} fontSize={14}>
              Chọn diện tích
            </Typography>
            <ArrowDropDownIcon />
          </Button>
          <PopperCustom
            open={isOpenAcreage}
            anchorEl={anchorEl}
            handleClose={handleCloseAcreage}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#000",
                fontWeight: 700,
              }}
            >
              <DesignServicesIcon />
              Chọn diện tích
            </Typography>
          </PopperCustom>
        </Grid>
      </Grid>
    </>
  );
};

export default Filter;
