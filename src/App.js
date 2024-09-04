import "./App.css";
import * as React from "react";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useMemo } from "react";
import { ToDosContext } from "./contexts/ToDosContext";
import { AddopenContext } from "./contexts/AddopenContext";
import CustomizedSnackbars from "./components/CustomizedSnackbars";

//athor:
import { v4 as uuid } from "uuid";
const initialTodos = [
  {
    id: uuid(),
    title: "المهمة الأولى",
    body: "تفاصيل المهمة الأولى",
    IsComplited: false,
  },
];

const Theme = createTheme({
  typography: {
    fontFamily: ["Cairo"],
  },
  palette: {
    primary: {
      main: "#851835",
    },
    secondary: {
      main: "#1b7993",
    },
  },
});

function App() {
  const [ToDos, setToDos] = useState(initialTodos);
  const [titleInput, setTitleInput] = useState("");
  const [addopen, setAddOpen] = useState(false);
  const [DisplayTodosbtn, setDisplayTodosbtn] = useState("all");

  const ComplitedToDos = useMemo(() => {
    return ToDos.filter((T) => {
      return T.IsComplited;
    });
  }, [ToDos]);

  const NotComplitedToDos = useMemo(() => {
    return ToDos.filter((T) => {
      return !T.IsComplited;
    });
  }, [ToDos]);

  let ToDostemp;

  if (DisplayTodosbtn === "notComplited") {
    ToDostemp = NotComplitedToDos;
  } else if (DisplayTodosbtn === "complited") {
    ToDostemp = ComplitedToDos;
  } else {
    ToDostemp = ToDos;
  }

  let ToDosJsx = ToDostemp.map((T) => {
    return <ToDoList key={T.id} todo={T} />;
  });

  function handelDisplayChange(e) {
    const newValue = e.target.value;
    setDisplayTodosbtn(newValue);
  }

  useEffect(() => {
    const LocalTodos = JSON.parse(localStorage.getItem("ToDos"));
    if (LocalTodos != null) {
      setToDos(LocalTodos);
    }
  }, []);

  function handelAddClick() {
    const newToDo = {
      id: uuid(),
      title: titleInput,
      body: "",
      IsComplited: false,
    };
    const ToDosAdded = [...ToDos, newToDo];
    setToDos(ToDosAdded);
    localStorage.setItem("ToDos", JSON.stringify(ToDosAdded));
    setTitleInput("");
    setAddOpen(true);
  }

  return (
    <ThemeProvider theme={Theme}>
      <ToDosContext.Provider value={{ ToDos, setToDos }}>
        <AddopenContext.Provider value={{ addopen, setAddOpen }}>
          <CustomizedSnackbars />
          <div className="App">
            <Container maxWidth="sm">
              <div className="home">
                <h1>مهامي</h1>
                <Divider
                  variant="middle"
                  style={{ borderColor: "#4343439d" }}
                />
                {/* to do btn ---------------------------------------------------------- */}
                <Box component="section" sx={{ p: 2 }} className="btn-group">
                  <ToggleButtonGroup
                    aria-label="Complited button"
                    exclusive
                    value={DisplayTodosbtn}
                    onChange={handelDisplayChange}
                    color="primary"
                  >
                    <ToggleButton
                      value="notComplited"
                      style={{ fontWeight: "bold", borderColor: "#851835" }}
                    >
                      غير منجز
                    </ToggleButton>
                    <ToggleButton
                      value="complited"
                      style={{ fontWeight: "bold", borderColor: "#851835" }}
                    >
                      منجز
                    </ToggleButton>
                    <ToggleButton
                      value="all"
                      style={{ fontWeight: "bold", borderColor: "#851835" }}
                    >
                      الكل
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                {/**------------------------------------------------------------------------- */}
                <div style={{ maxHeight: "55vh", overflowY: "scroll" }}>
                  {ToDosJsx}
                </div>
                <Divider
                  variant="middle"
                  style={{ borderColor: "#4343439d" }}
                />
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
                        disabled={titleInput.length <= 0}
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
                        color="primary"
                        label="مهمة جديدة"
                        variant="outlined"
                        style={{ direction: "rtl", width: "100%" }}
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
        </AddopenContext.Provider>
      </ToDosContext.Provider>
    </ThemeProvider>
  );
}

export default App;
