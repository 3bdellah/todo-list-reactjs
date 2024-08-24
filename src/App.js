import "./App.css";
import * as React from "react";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import ToDoList from "./components/ToDoList";
import TodolistBtn from "./components/TodolistBtn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ToDosContext } from "./contexts/ToDosContext";

// import CustomizedSnackbars from "./components/CustomizedSnackbars";
//athor:
import { v4 as uuid } from "uuid";
const initialTodos = [
  {
    id: uuid(),
    title: "قراءة الحزب الراتب",
    body: "كل يوم بعد صلاة المغرب",
    IsComplited: false,
  },
  { id: uuid(), title: "تعلم React js", body: "كل يوم", IsComplited: true },
  {
    id: uuid(),
    title: "إتمام مشروع Todo List",
    body: "قبل نهاية الأسبوع",
    IsComplited: false,
  },
];

const Theme = createTheme({
  typography: {
    fontFamily: ["Cairo"],
  },
});

function App() {
  const [ToDos, setToDos] = useState(initialTodos);
  const [titleInput, setTitleInput] = useState("");
  const ToDosJsx = ToDos.map((T) => {
    return <ToDoList key={T.id} todo={T} />;
  });

  function handelAddClick() {
    const newToDo = {
      id: uuid(),
      title: titleInput,
      body: "",
      IsComplited: false,
    };
    setToDos([...ToDos, newToDo]);
    setTitleInput("");
    // <CustomizedSnackbars />;
  }

  return (
    <ThemeProvider theme={Theme}>
      <ToDosContext.Provider value={{ ToDos, setToDos }}>
        <div className="App">
          <Container maxWidth="sm">
            <div className="home">
              <h1>مهامي</h1>
              <Divider variant="middle" style={{ borderColor: "#4343439d" }} />
              <TodolistBtn />
              {ToDosJsx}
              <Divider variant="middle" style={{ borderColor: "#4343439d" }} />
              <div className="btn">
                <Grid container spacing={1} style={{ paddingBottom: "10px" }}>
                  <Grid
                    item
                    xs={4}
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      startIcon={<PlaylistAddOutlinedIcon />}
                      sx={{ width: "100%", height: "100%" }}
                      onClick={handelAddClick}
                    >
                      إضافة
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <TextField
                      id="outlined-basic"
                      label="عنوان المهمة"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      value={titleInput}
                      onChange={(e) => {
                        setTitleInput(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Container>
        </div>
      </ToDosContext.Provider>
    </ThemeProvider>
  );
}

export default App;
