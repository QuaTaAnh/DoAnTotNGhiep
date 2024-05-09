import styled from "@emotion/styled";
import { InputBase, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line no-empty-pattern
const BoxSearch = styled("div")(({}) => ({
  position: "relative",
  width: "415px",
  height: "36px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

// eslint-disable-next-line no-empty-pattern
const SearchIconWrapper = styled("div")(({}) => ({
  position: "absolute",
  right: "0",
  height: "100%",
  color: "#fff",
  padding: "7px 20px",
  backgroundColor: "#fa6819",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#ed570e",
  },
}));

// eslint-disable-next-line no-empty-pattern
const StyledInputBase = styled(InputBase)(({}) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "#F4F5F4",
  padding: "5px 120px 5px 20px",
  borderRadius: "5px",
}));

const SearchInput: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    if (searchValue?.trim()) {
      navigate(`/search/${searchValue}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchValue?.trim()) {
      if (event.key === "Enter") {
        navigate(`/search/${searchValue}`);
      }
    }
  };

  return (
    <BoxSearch>
      <StyledInputBase
        placeholder={t("search")}
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Tooltip title="Search">
        <SearchIconWrapper onClick={handleSearch}>
          <SearchIcon />
        </SearchIconWrapper>
      </Tooltip>
    </BoxSearch>
  );
};

export default SearchInput;
