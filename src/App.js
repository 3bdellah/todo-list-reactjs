import "./App.css";
import * as React from "react";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import ToDoList from "./components/ToDoList";
import TodolistBtn from "./components/TodolistBtn";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <div className="home">
          <h1>مهامي</h1>
          <Divider variant="middle" style={{ borderColor: "#4343439d" }} />
          <TodolistBtn />
          <ToDoList />
          <ToDoList />
          <Divider variant="middle" style={{ borderColor: "#4343439d" }} />
          <div className="btn">
            <Stack spacing={0} direction="row" sx={{ p: 2, width: "100%" }}>
              <Button
                variant="contained"
                startIcon={<PlaylistAddOutlinedIcon />}
                sx={{ width: "30%" }}
                onClick={() => {
                  alert("clicked");
                }}
              >
                إضافة
              </Button>

              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ width: "70%" }}
              >
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  sx={{ width: "85%" }}
                />
              </Box>
            </Stack>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
