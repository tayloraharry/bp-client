import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

interface ExitDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitDialog: React.FC<ExitDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            minWidth: 350,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContentText fontWeight="500" variant="body1" mb={1}>
            Are you sure you want to exit?
          </DialogContentText>
          <DialogContentText variant="body2">
            Any progress will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            fullWidth
            variant="text"
            sx={{ textTransform: "none" }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            color="error"
            fullWidth
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={onConfirm}
            autoFocus
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ExitDialog;
