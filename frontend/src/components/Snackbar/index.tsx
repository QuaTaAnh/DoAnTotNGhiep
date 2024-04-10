// file SnackbarComponent.js
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { hideSnackbar, selectSnackbar } from "../../redux/snackbarRedux";

const SnackbarCustom: React.FC = () => {
  const dispath = useDispatch();
  const { open, message, type } = useSelector(selectSnackbar);

  const handleClose = () => {
    dispath(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarCustom;
