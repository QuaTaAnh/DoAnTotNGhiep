import { Grid, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CreatePostForm, District, Province, Ward } from "../../../type";

interface AddressFieldsProps {
  setPayload: any;
  hidden?: boolean;
  setAdressChanged?: any;
}

const Address: React.FC<AddressFieldsProps> = ({
  setPayload,
  hidden,
  setAdressChanged,
}: AddressFieldsProps) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [province, setProvince] = useState<string>("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [district, setDistrict] = useState<string>("");
  const [wards, setWards] = useState<Ward[]>([]);
  const [ward, setWard] = useState<string>("");

  const address: string = `${
    ward ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},` : ""
  } ${
    district
      ? `${
          districts?.find((item) => item.district_id === district)
            ?.district_name
        },`
      : ""
  } ${
    province
      ? provinces?.find((item) => item.province_id === province)?.province_name
      : ""
  }`;

  useEffect(() => {
    const getProvince = async () => {
      const res = await axios.get("https://vapi.vnappmob.com/api/province/");
      if (res.status === 200) {
        setProvinces(res?.data.results);
      }
    };
    getProvince();
  }, []);

  useEffect(() => {
    setDistrict("");
    const getDistrict = async () => {
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${province}`
      );
      if (res.status === 200) {
        setDistricts(res.data?.results);
      }
    };
    province && getDistrict();
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setWard("");
    const getWard = async () => {
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${district}`
      );
      if (res.status === 200) {
        setWards(res.data?.results);
      }
    };
    district && getWard();
    !district && setWards([]);
  }, [district]);

  useEffect(() => {
    setPayload((prev: CreatePostForm) => ({
      ...prev,
      address: address,
    }));
  }, [address, setPayload]);

  return (
    <>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item md={4}>
          <label htmlFor="">Tỉnh/Thành Phố</label>
          <Select
            fullWidth
            sx={{ height: "40px", marginTop: "10px" }}
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setAdressChanged(true);
            }}
          >
            {provinces.map((prov: Province) => (
              <MenuItem key={prov.province_id} value={prov.province_id}>
                {prov.province_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={4}>
          <label htmlFor="">Quận/Huyện</label>
          <Select
            fullWidth
            sx={{ height: "40px", marginTop: "10px" }}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            {districts.map((dis: District) => (
              <MenuItem key={dis.district_id} value={dis.district_id}>
                {dis.district_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={4}>
          <label htmlFor="">Phường/Xã</label>
          <Select
            fullWidth
            sx={{ height: "40px", marginTop: "10px" }}
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          >
            {wards.map((war: Ward) => (
              <MenuItem key={war.ward_id} value={war.ward_id}>
                {war.ward_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      {!hidden && (
        <>
          <label htmlFor="">Số nhà</label>
          <TextField
            size="small"
            fullWidth
            margin="normal"
            onChange={(e) => {
              const newApartmentNumber = e.target.value;
              setPayload((prev: CreatePostForm) => ({
                ...prev,
                address: `${newApartmentNumber}, ${address}`,
              }));
            }}
          />
        </>
      )}
      <label htmlFor="">Địa chỉ chính xác</label>
      <TextField
        size="small"
        fullWidth
        margin="normal"
        value={address}
        InputProps={{
          readOnly: true,
          sx: {
            backgroundColor: "#ccc",
          },
        }}
      />
    </>
  );
};

export default Address;
