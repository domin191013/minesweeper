import Cell from "./cell";
import { openCell } from "../shared/action";

interface IProp {
  map: Array<any>;
  currentLevel: string;
  openCell: typeof openCell;
}

function Board(props: IProp) {
  const { map, openCell, currentLevel } = props;

  return (
    <table style={{ display: "block" }}>
      <tbody>
        {map.map((row: string, i: number) => (
          <tr key={`${i}`}>
            {row.split("").map((col, j) => (
              <td key={`${i}_${j}`} style={{padding:0}}>
                <Cell
                  key={`${i}_${j}`}
                  x={j}
                  y={i}
                  currentLevel={currentLevel}
                  content={col}
                  openCell={openCell}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
