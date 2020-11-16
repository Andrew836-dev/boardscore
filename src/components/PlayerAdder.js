import { useRef, useState } from "react";
import { usePlayerContext } from "../utils/playerStore";
import { ADD_PLAYER } from "../utils/actions";

function PlayerAdder() {
  const playerDispatch = usePlayerContext()[1];
  const [nameFieldVisible, setNameFieldVisible] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState("");
  const nameFieldRef = useRef();

  function handleNameSubmit(event) {
    event.preventDefault();
    const playerName = nameFieldValue.trim();

    if (playerName !== "")
      playerDispatch({ type: ADD_PLAYER, playerName });

    setNameFieldValue("");
    setNameFieldVisible(false);
  }
  function changeName() {
    setNameFieldValue(nameFieldRef.current.value);
  }

  function hideNameField() {
    setNameFieldVisible(false);
  }

  function showNameField() {
    setNameFieldVisible(true);
  }

  return (<>
    {nameFieldVisible
      ? <form onSubmit={handleNameSubmit}>
        <label htmlFor="name">Name (Press enter to add the player, click away to close this)</label>
        <input
          name="name"
          id="name"
          autoFocus={true}
          onBlur={hideNameField}
          onChange={changeName}
          value={nameFieldValue}
          ref={nameFieldRef}
        />
      </form>
      : <button id="addPlayer" onClick={showNameField}>Add player</button>}
  </>)
}

export default PlayerAdder;