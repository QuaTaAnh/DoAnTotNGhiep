import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "20px" }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography
            key={index}
            color="textPrimary"
            sx={{ textTransform: "capitalize", textDecoration: "none" }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={index}
            color="inherit"
            href={item.href}
            sx={{ textDecoration: "none" }}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
