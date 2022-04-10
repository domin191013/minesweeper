import { Button, Grid } from "@mui/material";
import { startLevel } from "../shared/action";

interface IProp {
  startLevel: typeof startLevel;
}
function Menu(props: IProp) {
  const { startLevel } = props;

  const startLevelGame = (level: string) => {
    startLevel(level);
  };

  return (
    <Grid
      container
      direction="row"
      columnSpacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Button
          variant="contained"
          color="success"
          onClick={() => startLevelGame("1")}
        >
          Beginner
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="success"
          onClick={() => startLevelGame("2")}
        >
          Intermediate
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="success"
          onClick={() => startLevelGame("3")}
        >
          Advanced
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="success"
          onClick={() => startLevelGame("4")}
        >
          Expert
        </Button>
      </Grid>
    </Grid>
  );
}

export default Menu;
