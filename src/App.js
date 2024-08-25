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
import { useState, useEffect } from "react";
import { ToDosContext } from "./contexts/ToDosContext";
import { AddopenContext } from "./contexts/AddopenContext";
import CustomizedSnackbars from "./components/CustomizedSnackbars";

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
  const [addopen, setAddOpen] = useState(false);
  const [DisplayTodosbtn, setDisplayTodosbtn] = useState("all");
  //Todos button

  const ComplitedToDos = ToDos.filter((T) => {
    return T.IsComplited;
  });
  const NotComplitedToDos = ToDos.filter((T) => {
    return !T.IsComplited;
  });

  let ToDostemp;

  if (DisplayTodosbtn === "all") {
    ToDostemp = ToDos;
  } else if (DisplayTodosbtn === "complited") {
    ToDostemp = ComplitedToDos;
  } else {
    ToDostemp = NotComplitedToDos;
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
    setToDos(LocalTodos);
  }, []);

  function handelAddClick() {
    const newToDo = {
      id: uuid(),
      title: titleInput,
      body: "",
      IsComplited: false,
    };
    if (titleInput !== "") {
      const ToDosAdded = [...ToDos, newToDo];
      setToDos(ToDosAdded);
      localStorage.setItem("ToDos", JSON.stringify(ToDosAdded));
      setTitleInput("");
      setAddOpen(true);
    }
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
                    color="warning"
                    exclusive
                    value={DisplayTodosbtn}
                    onChange={handelDisplayChange}
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
                {ToDosJsx}
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
                        label="مهمة جديدة"
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
        </AddopenContext.Provider>
      </ToDosContext.Provider>
    </ThemeProvider>
  );
}

export default App;
