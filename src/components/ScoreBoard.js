import { usePlayerContext } from "../utils/playerStore";
import ScoreColumn from "./ScoreColumn";

function ScoreBoard() {
  const [playerState, playerDispatch] = usePlayerContext();
  const players = playerState.players || []
  return (<>
    {!!players.length
      && players.map(
        (player, index) => (
          <ScoreColumn
            dispatch={playerDispatch}
            key={"player" + index}
            playerIndex={index}
            player={player}
          />)
      )}

  </>)
}

export default ScoreBoard;