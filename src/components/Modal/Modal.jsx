import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Modal({ isOpen, children, onClose, header, actions }) {
  return (
    <Dialog
      open={!!isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title" sx={{ m: 0, p: 2 }}>
        {header}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}

export default Modal;