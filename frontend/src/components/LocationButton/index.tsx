import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export interface ILocation {
  name: string;
  image: any;
}

const LocationButton: React.FC<ILocation> = ({ name, image }: ILocation) => {
  return (
    <Link to={"123"} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "180px",
          marginBottom: 2,
        }}
      >
        <CardMedia component="img" height={"140px"} image={image} />
        <CardContent sx={{ padding: "10px 0" }}>
          <Typography
            sx={{
              fontWeight: "600",
              color: "#000",
              textAlign: "center",
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationButton;
