export const addPlayer = (state, name) => {
  const playerList = state.players || [];
  playerList.push({ name, scores: [] });

  return { ...state, loading: false, players: playerList };
}

export const resetScores = (state) => {
  const playerList = state.players || [];
  playerList.forEach(player => {
    player.scores = [];
  });
  return { ...state, loading: false, players: playerList };
}

export const removePlayer = (state, playerIndex) => {
  let playerList = state.players || [];
  playerList = playerList.filter((_player, index) => index !== playerIndex);

  return { ...state, loading: false, players: playerList };
}

export const setLoading = (state, loadingValue = true) => {
  return { ...state, loading: loadingValue };
}

export const updateScoreForOnePlayer = (state, playerIndex, scoreChange) => {
  if (Array.isArray(state.players) && state.players[playerIndex]) {
    let playerList = state.players;
    playerList[playerIndex].scores.push(scoreChange);

    return { ...state, loading: false, players: playerList };
  }
  else return state;
}