import { Grid } from "@mui/material";
import Menu from "./Menu";
import Board from "./Board";
import GameOver from "./GameOver";
import { connect } from "react-redux";
import { IState } from "./shared/constants";
import { startLevel, openCell } from "./shared/action";
import { IProp } from "./shared/constants";

function GameMain(props: IProp) {
  const { startLevel, openCell, map, gameOver, currentLevel } = props;

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs>
        Welcome to minesweeper game!
      </Grid>
      <Grid item>
        <h2>Select the level and enjoy the game!</h2>
      </Grid>
      <Grid item xs mt={0}>
        <Menu startLevel={startLevel} />
      </Grid>
      <Grid item xs mt={5}>
        <GameOver gameOver={gameOver} />
      </Grid>
      <Grid item xs mt={5}>
        <Board map={map} openCell={openCell} currentLevel={currentLevel}/>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: IState): IState => {
  return { ...state };
};
export default connect(mapStateToProps, { startLevel, openCell })(GameMain);
