import { createContext, useContext, useReducer } from "react";
import {
  addPlayer,
  removePlayer,
  setLoading,
  updateScoreForOnePlayer
} from "./reducerFunctions";
import {
  ADD_PLAYER,
  LOADING,
  REMOVE_PLAYER,
  UPDATE_SCORE_FOR_ONE_PLAYER
} from "./actions";

const PlayerContext = createContext({ loading: false, players: [] });
const { Provider } = PlayerContext;

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return addPlayer(state, action.playerName);
    case LOADING:
      return setLoading(state);
    case REMOVE_PLAYER:
      return removePlayer(state, action.playerIndex);
    case UPDATE_SCORE_FOR_ONE_PLAYER:
      return updateScoreForOnePlayer(state, action.playerIndex, action.scoreChange);
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
