import "../reducerFunctions";
import { addPlayer, removePlayer, setLoading, updateScoreForOnePlayer } from "../reducerFunctions";

test("addPlayer returns a new player into the state list", () => {
  const testState = { players: [] };

  const alteredState = addPlayer(testState, "Andrew");

  expect(alteredState.players).toHaveLength(1);
});

test("addPlayer adds the passed name into the name property", () => {
  const testState = { players: [] };

  const alteredState = addPlayer(testState, "Grant");

  expect(alteredState.players[0].name).toMatch(/Grant/);
});

test("addPlayer gives the new player an empty score array", () => {
  const testState = {};

  const alteredState = addPlayer(testState, "Champ");

  expect(alteredState.players[0].score).toBeInstanceOf(Array);
});

test("addPlayer adds the new player to the end of the array", () => {
  const testState = { players: [{ name: "Katie", score: 0 }] };

  const alteredState = addPlayer(testState, "Charli");

  expect(alteredState.players[1].name).toMatch(/Charli/);
});

test("addPlayer creates a new player list if there isn't one in the passed state", () => {
  const testState = {};

  const alteredState = addPlayer(testState, "👌");

  expect(alteredState.players).toBeDefined();
});

test("addPlayer sets loading to false", () => {
  const testState = { loading: true };

  const alteredState = addPlayer(testState, "dävid")

  expect(alteredState.loading).toEqual(false);
});

test("removePlayer removes the player at the index passed in", () => {
  const testState = {
    players: [
      { name: "John", score: 0 },
      { name: "Steve", score: 0 }
    ]
  }

  const alteredState = removePlayer(testState, 0);

  expect(alteredState.players[0].name).toMatch(/Steve/);
});

test("removePlayer doesn't do anything if invalid index is passed", () => {
  const testState = { players: [{ name: "Sally", score: 0 }], loading: false };

  const alteredState = removePlayer(testState, 10);

  expect(alteredState).toMatchObject(testState);
});

test("removePlayer corrects the error if the array is empty", () => {
  const testState = {};

  const alteredState = removePlayer(testState, 1);

  expect(alteredState.players).toBeInstanceOf(Array);
});

test("removePlayer sets loading to false", () => {
  const testState = { players: [{ name: "Patrick", score: 0 }] };

  const alteredState = removePlayer(testState, 0);

  expect(alteredState.loading).toEqual(false);
});

test("setLoading sets the loading state to true", () => {
  const testState = { loading: false };

  const alteredState = setLoading(testState);

  expect(alteredState.loading).toEqual(true);
});

test("updateScoreForOnePlayer does what it says on the can", () => {
  const testState = {
    players: [
      { name: "Rhonda", score: [] },
      { name: "Bill", score: [] }
    ]
  }
  const updatedScore = { points: 20, penalties: 0 }
  const targetPlayerIndex = 0;
  const alteredState = updateScoreForOnePlayer(testState, targetPlayerIndex, updatedScore);

  expect(alteredState.players[targetPlayerIndex].score).toMatchObject([updatedScore]);
});

test("updateScoreForOnePlayer doesn't change the non-targeted player", () => {
  const testState = {
    players: [
      { name: "Rhonda", score: [] },
      { name: "Bill", score: [] }
    ]
  }
  const updatedScore = { points: 20, penalties: 0 }
  const targetPlayerIndex = 0;
  const alteredState = updateScoreForOnePlayer(testState, targetPlayerIndex, updatedScore);

  expect(alteredState.players[1].score).toMatchObject([]);
});

test("updateScoreFOrOnePlayer does nothing if there's no player list", () => {
  const testState = { loading: false };
  const alteredState = updateScoreForOnePlayer(testState, 0, 10);

  expect(alteredState).toMatchObject(testState);
});