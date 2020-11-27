import { usePlayerContext } from "../utils/playerStore";
import ScoreColumn from "./ScoreColumn";

function ScoreBoard() {
  const [playerState, playerDispatch] = usePlayerContext();
  const players = playerState.players || [];
  if (players.length) {
    return <div style={{ display: "flex", border: "black 1px solid" }}>
      {players.map((player, index) => <ScoreColumn
        dispatch={playerDispatch}
        key={"player" + index}
        playerIndex={index}
        player={player}
      />)}
    </div>
  }
  return <></>
}

export default ScoreBoard;