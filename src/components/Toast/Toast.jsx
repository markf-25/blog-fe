
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ header, message, onClose, severity = "info", autoHideDuration = 3000 }) => {

  return (
    <Snackbar
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }} variant="filled">
        <strong>{header}</strong> — {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
