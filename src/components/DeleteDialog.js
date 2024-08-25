import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { dialogopenContext } from "../contexts/dialogopenContext";
import { ToDosContext } from "../contexts/ToDosContext";

export default function DeleteDialog({ id }) {
  const { open, setopen } = useContext(dialogopenContext);
  const { ToDos, setToDos } = useContext(ToDosContext);

  function handleClose() {
    setopen(false);
  }
  function handelDeleteConfirm() {
    const updateToDos = ToDos.filter((t) => {
      return t.id !== id;
    });
    setToDos(updateToDos);
    localStorage.setItem("ToDos", JSON.stringify(updateToDos));
  }
  return (
    <React.Fragment>
      <Dialog
        style={{ direction: "rtl" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            تحذير!! : لايمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button onClick={handelDeleteConfirm} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
