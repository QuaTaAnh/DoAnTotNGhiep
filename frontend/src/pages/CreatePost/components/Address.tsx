import { Grid, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CreatePostForm, District, Province, Ward } from "../../../type";
import { useTranslation } from "react-i18next";
import MapCustom from "../../../components/Map";

interface AddressFieldsProps {
  setPayload: any;
  hidden?: boolean;
  setAddressChanged?: any;
}

interface LocationAddress {
  longitude: number
  latitude: number
}

const Address: React.FC<AddressFieldsProps> = ({
  setPayload,
  hidden,
  setAddressChanged,
}: AddressFieldsProps) => {
  const { t } = useTranslation();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [province, setProvince] = useState<string>("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [district, setDistrict] = useState<string>("");
  const [wards, setWards] = useState<Ward[]>([]);
  const [ward, setWard] = useState<string>("");
  const [provinceSelected, setProvinceSelected] = useState<boolean>(false);
  const [districtSelected, setDistrictSelected] = useState<boolean>(false);
  const [wardSelected, setWardSelected] = useState<boolean>(false);
  const [apartmentNumber, setApartmentNumber] = useState<string>('');
  const [locationAdd, setLocationAdd] = useState<LocationAddress>({longitude: 105.782422, latitude: 21.017688});

  useEffect(() => {
    if (setAddressChanged) {
      if (provinceSelected && districtSelected && wardSelected) {
        setAddressChanged(true);
      }
    }
  }, [setAddressChanged, provinceSelected, districtSelected, wardSelected]);

  console.log(locationAdd, 'hahaa');
  

  const address: string = `${apartmentNumber ? `${apartmentNumber},` : ""} ${
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

  useEffect(() =>{
    const getLocationAddress = async () => {      
      const {data} = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=pk.eyJ1IjoiYW5odHJhbngxMjMiLCJhIjoiY2x3ZXRveDlxMWt1azJxcDA5eWJ2MGY2dCJ9.VxaY6H_ilq6Jl8PZNsPbqw`)
      if (data.features && data.features.length > 0) {
        const { coordinates } = data.features[0].geometry;
        setLocationAdd({ longitude: coordinates[0], latitude: coordinates[1] });
      }
    }
    if (address.trim()) {
      getLocationAddress();
    }
  }, [address])

  return (
    <Grid container spacing={2}>
      <Grid item md={hidden ? 12 : 7}>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item md={4}>
          <label htmlFor="">{t("province")}</label>
          <Select
            fullWidth
            sx={{ height: "40px", marginTop: "10px" }}
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setProvinceSelected(true);
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
          <label htmlFor="">{t("district")}</label>
          <Select
            fullWidth
            sx={{ height: "40px", marginTop: "10px" }}
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setDistrictSelected(true);
            }}
            disabled={!provinceSelected}
          >
            {districts.map((dis: District) => (
              <MenuItem key={dis.district_id} value={dis.district_id}>
                {dis.district_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={4}>
          <label htmlFor="">{t("ward")}</label>
          <Select
            fullWidth
            sx={{ height: "40px", marginTop: "10px" }}
            value={ward}
            onChange={(e) => {
              setWard(e.target.value);
              setWardSelected(true);
            }}
            disabled={!districtSelected}
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
          <label htmlFor="">{t("homeNumber")}</label>
          <TextField
            size="small"
            fullWidth
            margin="normal"
            onChange={(e) => {
              setApartmentNumber(e.target.value)
            }}
          />
        </>
      )}
      <label htmlFor="">{t("addressExact")}</label>
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
      </Grid>
      {!hidden ? 
      <Grid item md={5}>
        <MapCustom longitude={locationAdd.longitude} latitude={locationAdd.latitude}/>
      </Grid> : <></>}
    </Grid>
  );
};

export default Address;
