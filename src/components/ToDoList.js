import * as React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { pink } from "@mui/material/colors";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { ToDosContext } from "../contexts/ToDosContext";
import { dialogopenContext } from "../contexts/dialogopenContext";
import AlertDialog from "./AlertDialog";

function ToDoList({ todo }) {
  const { ToDos, setToDos } = useContext(ToDosContext);
  const [open, setopen] = React.useState(false);
  function handelCheck(id) {
    const newTodoupdate = ToDos.map((t) => {
      if (t.id === id) {
        t.IsComplited = !t.IsComplited;
      }
      return t;
    });
    setToDos(newTodoupdate);
  }
  function handelDeleteClick() {
    setopen(true);
  }
  return (
    <div className="TodoList">
      <dialogopenContext.Provider value={{ open, setopen }}>
        <AlertDialog id={todo.id} />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid
              item
              xs={5}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <button
                onClick={() => {
                  handelDeleteClick();
                }}
              >
                <DeleteOutlineOutlinedIcon sx={{ color: pink[500] }} />
              </button>
              <button>
                <EditOutlinedIcon color="primary" />
              </button>
              <button
                onClick={() => {
                  handelCheck(todo.id);
                }}
                style={{
                  background: todo.IsComplited ? "#05dd2d" : "white",
                }}
              >
                <DoneOutlinedIcon
                  style={{ color: todo.IsComplited ? "white" : "#05dd2d" }}
                />
              </button>
            </Grid>
            <Grid item xs={7}>
              <div className="TodoTitle">
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {todo.title}
                </Typography>
                <Typography variant="h6" style={{ fontWeight: "light" }}>
                  {todo.body}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </dialogopenContext.Provider>
    </div>
  );
}
// { todo.IsComplited ? `style={{backgroundColor:"green"}}` : "" }

export default ToDoList;
