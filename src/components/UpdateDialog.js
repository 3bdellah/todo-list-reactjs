import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateopenContext } from "../contexts/updateopenContext";
import { ToDosContext } from "../contexts/ToDosContext";
import { useContext, useState } from "react";

export default function UpdateDialog({ id }) {
  const { updateOpen, setupdateOpen } = useContext(updateopenContext);
  const { ToDos, setToDos } = useContext(ToDosContext);
  const todo = ToDos.find((e) => e.id === id);
  const [UpdateTodo, setUpdateTodo] = useState({
    title: todo.title,
    body: todo.body,
  });

  const handleClose = () => {
    setupdateOpen(false);
  };
  function handleUpdate() {
    const UpdatedTodo = ToDos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: UpdateTodo.title, body: UpdateTodo.body };
      } else return t;
    });
    setToDos(UpdatedTodo);
    localStorage.setItem("ToDos", JSON.stringify(UpdatedTodo));
  }

  return (
    <React.Fragment>
      <Dialog
        style={{ direction: "rtl" }}
        open={updateOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>تعديل مهمة: </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {todo.title}
            <br />
            {todo.body}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            placeholder={todo.title}
            name="title"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={UpdateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...UpdateTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="body"
            name="bady"
            placeholder={todo.body}
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={UpdateTodo.body}
            onChange={(e) => {
              setUpdateTodo({ ...UpdateTodo, body: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button type="submit" onClick={handleUpdate}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
