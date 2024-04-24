import { Box, Card, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getPostByPage } from "../../redux/callApi";
import { formatToString } from "../../common";

interface ICardCustom {
  title: string;
  content?: any[];
  category?: any[];
  type?: any;
}

const CardCustom: React.FC<ICardCustom> = ({
  title,
  content,
  category,
  type,
}: ICardCustom) => {
  const dispatch = useDispatch<AppDispatch>();
  const { page } = useSelector((state: RootState) => state.api);

  const handleFilter = (code: string) => {
    dispatch(
      getPostByPage({
        page: page,
        [type]: code,
      })
    );
  };
  return (
    <Card
      sx={{
        width: "100%",
        padding: "12px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
        {title}
      </Typography>
      {content &&
        content?.map((item) => (
          <Box
            key={item?.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "4px",
              cursor: "pointer",
              "&:hover": {
                color: "#fa6819",
              },
            }}
            onClick={() => handleFilter(item?.code)}
          >
            <NavigateNextIcon />
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      {category &&
        category?.map((item) => (
          <Link
            key={item?.id}
            to={`${formatToString(item.value)}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "4px",
                cursor: "pointer",
                "&:hover": {
                  color: "#fa6819",
                },
              }}
            >
              <NavigateNextIcon />
              <Typography
                sx={{
                  fontSize: "14px",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          </Link>
        ))}
    </Card>
  );
};

export default CardCustom;
