import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AddopenContext } from "../contexts/AddopenContext";
import { useContext } from "react";
import { msgSnackBar } from "../contexts/msgSnackBarContext";

export default function CustomizedSnackbars() {
  const { addopen, setAddOpen } = useContext(AddopenContext);
  const { MsgSnackBar } = useContext(msgSnackBar);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return setAddOpen(false);
    }
  };

  return (
    <div>
      <Snackbar open={addopen} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {MsgSnackBar}
        </Alert>
      </Snackbar>
    </div>
  );
}
