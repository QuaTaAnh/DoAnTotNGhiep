import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Address from "../../CreatePost/components/Address";
import { FilterForm } from "../../../type";
import { formatPrice } from "../../../common";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getIdFromArea, getIdFromPrice } from "../../../common/getCodes";
import {
  getAcreage,
  getCategory,
  getPostByPage,
  getPrice,
} from "../../../redux/callApi";
import { useTranslation } from "react-i18next";

const Filter: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, prices, acreages, page } = useSelector(
    (state: RootState) => state.api
  );
  const [addressChanged, setAddressChanged] = useState<boolean>(false);
  const [priceChanged, setPriceChanged] = useState<boolean>(false);
  const [areaChanged, setAreaChanged] = useState<boolean>(false);
  const [categoryChanged, setCategoryChanged] = useState<boolean>(false);

  const initialPayload = {
    priceNumber: 0,
    areaNumber: 0,
    address: "",
    categoryId: 0,
  };

  const [payload, setPayload] = useState<FilterForm>(initialPayload);

  useEffect(() => {
    if (isOpen) {
      dispatch(getCategory());
      dispatch(getPrice());
      dispatch(getAcreage());
    }
  }, [dispatch, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setPayload(initialPayload);
    setAddressChanged(false);
  };

  const updateURL = (filters: Record<string, any>) => {
    const query = new URLSearchParams(filters).toString();
    window.history.pushState({}, "", `?${query}`);
  };

  const handleSubmit = () => {
    const updatedPayload: FilterForm = {};

    if (priceChanged) {
      updatedPayload.priceNumber = payload.priceNumber;
      const newPriceId = getIdFromPrice(payload.priceNumber, prices);
      updatedPayload.priceId = newPriceId;
    }

    if (areaChanged) {
      updatedPayload.areaNumber = payload.areaNumber;
      const areaId = getIdFromArea(payload.areaNumber, acreages);
      updatedPayload.areaId = areaId;
    }

    if (addressChanged) {
      updatedPayload.address = payload.address;
    }

    if (categoryChanged) {
      updatedPayload.categoryId = payload.categoryId;
    }

    dispatch(
      getPostByPage({
        page: page,
        status: "active",
        priceId: updatedPayload.priceId,
        areaId: updatedPayload.areaId,
        address: updatedPayload.address,
        categoryId: updatedPayload.categoryId,
      })
    );

    const filtersForURL: FilterForm = {};
    if (priceChanged) filtersForURL.priceNumber = payload.priceNumber;
    if (areaChanged) filtersForURL.areaNumber = payload.areaNumber;
    if (addressChanged) filtersForURL.address = payload.address;
    if (categoryChanged) {
      const selectedCategory = categories.find(
        (category) => category.id === payload.categoryId
      );
      if (selectedCategory) {
        filtersForURL.category = selectedCategory.value;
      }
    }
    updateURL(filtersForURL);

    setIsOpen(false);
    setAddressChanged(false);
    setPriceChanged(false);
    setAreaChanged(false);
    setCategoryChanged(false);
    setPayload(initialPayload);
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
          width: 800,
          height: 600,
        }}
      >
        <Typography variant="h5" align="center" marginBottom={4} fontSize={26}>
          {t("filter")}
        </Typography>
        <Address
          setPayload={setPayload}
          hidden
          setAddressChanged={setAddressChanged}
        />
        <Grid container>
          <Grid item md={12}>
            <label htmlFor="">{t("categoryType")}</label>
            <Select
              fullWidth
              sx={{
                height: "40px",
                margin: "10px 0",
              }}
              value={payload.categoryId}
              onChange={(e) => {
                setPayload((prev: any) => ({
                  ...prev,
                  categoryId: e.target.value,
                }));
                setCategoryChanged(true);
              }}
            >
              {categories.map((category: any) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item md={12}>
            <label htmlFor="">{t("price")}</label>
            <TextField
              name="priceNumber"
              size="small"
              fullWidth
              margin="normal"
              value={formatPrice(payload.priceNumber)}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                const parsedValue = newValue === "" ? 0 : parseFloat(newValue);
                setPayload((prev: FilterForm) => ({
                  ...prev,
                  priceNumber: parsedValue,
                }));
                setPriceChanged(true);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {t("unitPrice")}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                maxLength: 15,
              }}
            />
          </Grid>
          <Grid item md={12}>
            <label htmlFor="">{t("area")}</label>
            <TextField
              name="areaNumber"
              size="small"
              fullWidth
              margin="normal"
              value={payload.areaNumber || 0}
              onChange={(e) => {
                setPayload((prev: FilterForm) => ({
                  ...prev,
                  areaNumber: parseFloat(e.target.value),
                }));
                setAreaChanged(true);
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
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
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
            onClick={handleSubmit}
            disabled={
              !addressChanged &&
              !priceChanged &&
              !areaChanged &&
              !categoryChanged
            }
          >
            {t("apply")}
          </Button>
        </Box>
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

export default Filter;
