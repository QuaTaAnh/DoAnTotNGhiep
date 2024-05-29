import React, { useEffect, useState } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import VN from "../../assets/images/vn.png";
import EN from "../../assets/images/en.png";

interface LanguageSwitcherProps {
  defaultLanguage?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  defaultLanguage = "vi",
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("i18n") || defaultLanguage
  );

  const handleChange = (event: React.ChangeEvent<{ value: string }> | any) => {
    const selectedLanguage = event.target.value as string;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  useEffect(() => {
    localStorage.setItem("i18n", language);
  }, [language]);

  return (
    <FormControl sx={{ padding: "0 10px" }}>
      <Select sx={{ height: "42px" }} value={language} onChange={handleChange}>
        <MenuItem
          value="en"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={EN} alt="en" style={{ paddingRight: "10px" }} />
          English
        </MenuItem>
        <MenuItem
          value="vi"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={VN} alt="vn" style={{ paddingRight: "10px" }} />
          Tiếng Việt
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
