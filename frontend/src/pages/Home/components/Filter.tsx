import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
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
import { getAcreage, getPostByPage, getPrice } from "../../../redux/callApi";

const Filter: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { prices, acreages, page } = useSelector(
    (state: RootState) => state.api
  );
  const [addressChanged, setAdressChanged] = useState<boolean>(false);
  const [priceChanged, setPriceChanged] = useState<boolean>(false);
  const [areaChanged, setAreaChanged] = useState<boolean>(false);

  const initialPayload = {
    priceNumber: 0,
    areaNumber: 0,
    address: "",
  };

  const [payload, setPayload] = useState<FilterForm>(initialPayload);

  useEffect(() => {
    dispatch(getPrice());
    dispatch(getAcreage());
  }, [dispatch]);

  const handleClose = () => {
    setIsOpen(false);
    setPayload(initialPayload);
  };

  const handleSubmit = () => {
    const updatedPayload: any = {};

    if (priceChanged) {
      const newPriceId = getIdFromPrice(payload.priceNumber, prices);
      updatedPayload.priceId = newPriceId;
    }

    if (areaChanged) {
      const areaId = getIdFromArea(payload.areaNumber, acreages);
      updatedPayload.areaId = areaId;
    }

    if (addressChanged) {
      updatedPayload.address = payload.address;
    }

    dispatch(
      getPostByPage({
        page: page,
        status: "active",
        priceId: updatedPayload.priceId,
        areaId: updatedPayload.areaId,
        address: updatedPayload.address,
      })
    );
    setIsOpen(false);
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
        <Typography variant="h5" align="center" marginBottom={4} fontSize={30}>
          Lọc
        </Typography>
        <Address
          setPayload={setPayload}
          hidden
          setAdressChanged={setAdressChanged}
        />
        <Grid container>
          <Grid item md={12}>
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
                setPayload((prev: FilterForm) => ({
                  ...prev,
                  priceNumber: parsedValue,
                }));
                setPriceChanged(true);
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
          <Grid item md={12}>
            <label htmlFor="">Diện tích</label>
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
            disabled={!addressChanged && !priceChanged && !areaChanged}
          >
            Áp dụng
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
