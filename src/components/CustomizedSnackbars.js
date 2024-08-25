import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AddopenContext } from "../contexts/AddopenContext";
import { useContext } from "react";

export default function CustomizedSnackbars() {
  const { addopen, setAddOpen } = useContext(AddopenContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return setAddOpen(false);
    }
  };

  return (
    <div>
      <Snackbar open={addopen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          تمت إضافة المهام بنجاح
        </Alert>
      </Snackbar>
    </div>
  );
}
