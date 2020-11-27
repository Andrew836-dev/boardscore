import { useRef, useState } from "react";
import { REMOVE_PLAYER, ADD_A_SCORE } from "../utils/actions";

function ScoreColumn({ dispatch, playerIndex, player }) {
  const { name, scores } = player || { name: "Something went wrong. Please refresh and try again.", scores: [] };
  const [scoreEntryVisible, setScoreEntryVisibility] = useState(false);
  const [scoreFieldValue, setScoreFieldValue] = useState(0);
  const scoreFieldRef = useRef();

  function handleFormSubmission(event) {
    event.preventDefault();
    const formValue = scoreFieldValue || 0;
    dispatch({ type: ADD_A_SCORE, playerIndex, newScore: formValue });
    hideScoreField();
    setScoreFieldValue(() => 0);
  }

  function hideScoreField() {
    setScoreEntryVisibility(() => false);
  }
  function showScoreField() {
    setScoreEntryVisibility(() => true);
  }

  return <div>
    <div style={{ display: "flex" }}>
      <h3>{name}</h3>
      <button
        onClick={() => dispatch({ type: REMOVE_PLAYER, playerIndex })}
      >
        Remove
      </button>
    </div>
    <div style={{ display: "inline-flex" }}>
      {/* {!!scores.length
        && <ul>
          {scores.map((score, index) => <li key={name + index} style={scores.length - 1 !== index ? { textDecorationLine: "line-through" } : { textDecorationLine: "none" }}>{score}</li>)}
        </ul>} */}
        Score: {!scores.length ? '0' : sumScoreTotals(scores)}
      {scoreEntryVisible
        ? <form
          className="blockDisplay"
          onSubmit={handleFormSubmission}
          onBlur={hideScoreField}
        >
          <label htmlFor="score">Add points</label>
          <input
            className="scoreInput"
            onChange={() => setScoreFieldValue(parseInt(scoreFieldRef.current.value))}
            autoFocus={true}
            onFocus={({ currentTarget }) => currentTarget.select()}
            type="number"
            id="score"
            name="score"
            ref={scoreFieldRef}
            value={scoreFieldValue}
          />
        </form>
        : <button className="scoreButton" onClick={showScoreField}>Score</button>
      }
    </div>
  </div>;
}

function sumScoreTotals(scoreArray) {
  return scoreArray.reduce((a, b) => a + b);
}

export default ScoreColumn;