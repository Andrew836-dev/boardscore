import { useState } from "react";
import { REMOVE_PLAYER, ADD_A_SCORE } from "../utils/actions";

function ScoreColumn({ dispatch, playerIndex, player }) {
  const { name, scores } = player || { name: "Something went wrong. Please refresh and try again.", scores: [] };
  const [scoreEntryVisible, setScoreEntryVisibility] = useState(false);
  return <div>
    <h3>{name}</h3>
    {scoreEntryVisible
      ? <form
        onBlur={() => setScoreEntryVisibility(() => false)}
        onSubmit={event => {
          event.preventDefault();
          const formValue = event.currentTarget.elements.score.value;
          dispatch({ type: ADD_A_SCORE, playerIndex, newScore: parseInt(formValue) || 0 });
          setScoreEntryVisibility(() => false);
        }}
      >
        <input type="number" placeholder="0" name="score" />
      </form>
      : <button onClick={() => setScoreEntryVisibility(() => true)}>Add scoring round</button>
    }
    {!!scores.length
      && <ul>
        {scores.map((score, index) => <li key={name + index} style={scores.length - 1 !== index ? { textDecorationLine: "line-through" } : { textDecorationLine: "none" }}>{score}</li>)}
      </ul>}
    Total Score: {!scores.length ? '0' : sumScoreTotals(scores)}
    <button onClick={() => dispatch({ type: REMOVE_PLAYER, playerIndex })}>Remove Player</button>
  </div>;
}

function sumScoreTotals(scoreArray) {
  return scoreArray.reduce((a, b) => a + b);
}

export default ScoreColumn;