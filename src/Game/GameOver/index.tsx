import { Alert } from "@mui/material";

interface IProp {
  gameOver: number;
}

function GameOver(props: IProp) {
  const { gameOver } = props;

  return (
    <div>
      {gameOver === 1 ? (
        <Alert severity="success">Congratulations! You won!</Alert>
      ) : gameOver === 2 ? (
        <Alert severity="error">You failed! Please try again!</Alert>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default GameOver;
