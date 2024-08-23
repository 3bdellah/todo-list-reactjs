import * as React from "react";
import "../App.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { pink } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1b7993",
  textAlign: "right",
  color: "#FFF",
  boxShadow: "none",
}));

function ToDoList() {
  return (
    <div className="TodoList">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={5}>
            <Item style={{}}>
              <button>
                <DeleteOutlineOutlinedIcon sx={{ color: pink[500] }} />
              </button>
              <button>
                <EditOutlinedIcon color="primary" />
              </button>
              <button>
                <DoneOutlinedIcon color="success" />
              </button>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item>
              <div className="TodoTitle">
                <h3>قراءة كتاب</h3>
                <h5>الانجاز قبل متم الشهر</h5>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ToDoList;
