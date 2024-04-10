import styled from "@emotion/styled";
import { InputBase, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router";
import { useState } from "react";

// eslint-disable-next-line no-empty-pattern
const BoxSearch = styled("div")(({}) => ({
  maxWidth: "415px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

// eslint-disable-next-line no-empty-pattern
const SearchIconWrapper = styled("div")(({}) => ({
  height: "100%",
  color: "#fff",
  padding: "7px 10px",
  backgroundColor: "#3C64B1",
}));

// eslint-disable-next-line no-empty-pattern
const StyledInputBase = styled(InputBase)(({}) => ({
  backgroundColor: "#F4F5F4",
  padding: "5px 30px",
}));

const SearchInput: React.FC = () => {
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
        placeholder="What do you want to learn?"
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
