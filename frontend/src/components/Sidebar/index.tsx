import { Grid } from "@mui/material";
import CardCustom from "../CardCustom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Sidebar: React.FC = () => {
  const { prices, acreages } = useSelector((state: RootState) => state.api);

  return (
    <Grid container>
      <Grid
        item
        sx={{
          width: "100%",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
        md={12}
      >
        <CardCustom
          title="Lọc theo khoảng giá"
          content={prices}
          type="priceId"
        />
        <CardCustom
          title="Lọc theo diện tích"
          content={acreages}
          type="areaId"
        />
      </Grid>
    </Grid>
  );
};

export default Sidebar;
