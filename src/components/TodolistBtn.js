import * as React from "react";
import "../App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export default function TodolistBtn() {
  return (
    <div style={{}} className="btn-group">
      <Box component="section" sx={{ p: 2 }}>
        <ButtonGroup
          variant="contained"
          size="large"
          aria-label="Basic button group"
          color="inherit"
        >
          <Button variant="outlined" color="inherit">
            غير منجز
          </Button>
          <Button variant="outlined" color="inherit">
            منجز
          </Button>
          <Button variant="contained" color="inherit">
            الكل
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
}
