import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            fontSize: "16px",
            lineHeight: "22px",
            color: "#000",
            marginTop: "16px",
            backgroundColor: "#fff",
            textTransform: "none",
            border: "1px solid #ccc",
            "&:hover": {
              backgroundColor: "#ccc",
            },
          }}
        >
          Thoát
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            fontSize: "16px",
            lineHeight: "22px",
            marginTop: "16px",
            backgroundColor: "#fa6819",
            textTransform: "none",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#ed570e",
            },
          }}
          autoFocus
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
