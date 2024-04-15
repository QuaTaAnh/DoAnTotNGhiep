import { Button, Paper, Popper } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface IPopper {
  open: boolean;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  handleClose: () => void | any;
}

const PopperCustom: React.FC<IPopper> = ({
  open,
  anchorEl,
  children,
  handleClose,
}) => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
      <Paper
        elevation={4}
        sx={{ position: "relative", width: "360px", padding: "12px" }}
      >
        {children}
        <Button
          sx={{
            position: "absolute",
            right: "0",
            top: "0",
            color: "#000",
            "&:hover": {
              backgroundColor: "#e7e7e7",
            },
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
      </Paper>
    </Popper>
  );
};

export default PopperCustom;
