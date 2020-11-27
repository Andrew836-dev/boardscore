import { createContext, useContext, useReducer } from "react";
import {
  addPlayer,
  removePlayer,
  resetScores,
  setLoading,
  updateScoreForOnePlayer
} from "./reducerFunctions";
import {
  ADD_A_SCORE,
  ADD_PLAYER,
  LOADING,
  REMOVE_PLAYER,
  RESET_SCORES
} from "./actions";

const PlayerContext = createContext({ loading: false, players: [] });
const { Provider } = PlayerContext;

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_A_SCORE:
      return updateScoreForOnePlayer(state, action.playerIndex, action.newScore);
    case ADD_PLAYER:
      return addPlayer(state, action.playerName);
    case LOADING:
      return setLoading(state);
    case REMOVE_PLAYER:
      return removePlayer(state, action.playerIndex);
    case RESET_SCORES:
      return resetScores(state);
    default:
      return state;
  }
}

const PlayerProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    players: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
}

const usePlayerContext = () => {
  return useContext(PlayerContext);
}

export { PlayerProvider, usePlayerContext };
