import React from "react";
import { Button, IconButton } from "@mui/material";
import { Fingerprint } from "@mui/icons-material";
import { openCell } from "../shared/action";

interface ICellProp {
  openCell: typeof openCell;
  content: any;
  x: number;
  y: number;
  currentLevel: string;
}

function Cell(props: ICellProp) {
  const { x, y, content, currentLevel } = props;
  const size =
    currentLevel === "1" ? "50px" : currentLevel === "2" ? "25px" : "20px";
  const buttonStyle = {
    maxWidth: size,
    minWidth: size,
    maxHeight: size,
    minHeight: size,
    margin: "0px",
    padding: "0px",
  };

  return (
    <div>
      {content.charCodeAt(0) === 9633 ? (
        <Button
          variant="contained"
          onClick={() => props.openCell(`${x} ${y}`)}
          style={buttonStyle}
        >
          &nbsp;
        </Button>
      ) : content === "0" ? (
        <Button variant="outlined" style={buttonStyle}>
          &nbsp;
        </Button>
      ) : content === "*" ? (
        <IconButton
          aria-label="fingerprint"
          color="secondary"
          style={buttonStyle}
        >
          <Fingerprint />
        </IconButton>
      ) : (
        <Button variant="outlined" style={buttonStyle}>
          {content}
        </Button>
      )}
    </div>
  );
}

export default Cell;
