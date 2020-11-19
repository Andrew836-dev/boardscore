import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

import { REMOVE_PLAYER, ADD_A_SCORE } from "../../utils/actions";
import ScoreColumn from "../ScoreColumn";

function getScoreFormHelper() {
  return screen.getByLabelText(/new/i);
}

function getAddScoreButtonHelper() {
  return screen.getByText(/add/i);
}

function getRemovePlayerButtonHelper() {
  return screen.getByText(/remove/i);
}
test("Loads and displays the passed name", async () => {
  const testPlayer = { name: "Andrew", scores: [] };
  render(<ScoreColumn player={testPlayer} />);

  expect(screen.getByText(testPlayer.name)).toBeInTheDocument();
});

test("Emojis don't cause trouble", async () => {
  const testPlayer = { name: "🎉😢", scores: [] };
  render(<ScoreColumn player={testPlayer} />);

  expect(screen.getByText(testPlayer.name)).toBeInTheDocument();
});

test("does not throw if given no props", async () => {
  render(<ScoreColumn />);
});

test("has a 'remove player' button", async () => {
  render(<ScoreColumn />);

  const removePlayerButton = getRemovePlayerButtonHelper();
  expect(removePlayerButton).toBeInTheDocument();
});

test("When given a playerIndex and dispatch function as props, it implements them with a 'remove player' button", async () => {
  const testPlayer = { name: "Frank", scores: [] };
  const testPlayerIndex = 0;
  const mockDispatch = jest.fn();
  render(<ScoreColumn player={testPlayer} dispatch={mockDispatch} playerIndex={testPlayerIndex} />);

  const removePlayerButton = getRemovePlayerButtonHelper();
  act(() => {
    fireEvent.click(removePlayerButton);
  });
  expect(mockDispatch).toBeCalledWith({ type: REMOVE_PLAYER, playerIndex: testPlayerIndex });
});

test("Has a button to add a scoring round", async () => {
  render(<ScoreColumn />);

  const addButton = getAddScoreButtonHelper();
  expect(addButton).toBeInTheDocument();
});

test("Clicking the add score button hides it", async () => {
  render(<ScoreColumn />);

  const addButton = getAddScoreButtonHelper();
  act(() => {
    fireEvent.click(addButton);
  });

  expect(addButton).not.toBeInTheDocument();
});

test("clicking the add score button reveals a form to submit the score", async () => {
  render(<ScoreColumn />);

  const addButton = getAddScoreButtonHelper();
  act(() => {
    fireEvent.click(addButton);
  });

  const scoreForm = getScoreFormHelper();
  expect(scoreForm).toBeInTheDocument();
});

test("losing focus on the form hides it", async () => {
  render(<ScoreColumn />);

  const addButton = getAddScoreButtonHelper();
  act(() => {
    fireEvent.click(addButton);
  });

  const scoreForm = getScoreFormHelper();

  expect(scoreForm).toBeInTheDocument();

  act(() => {
    fireEvent.blur(scoreForm);
  });

  expect(scoreForm).not.toBeInTheDocument();
});

test("submitting the form sends a dispatch", async () => {
  const mockDispatch = jest.fn();
  const mockPlayerIndex = 2;
  render(<ScoreColumn dispatch={mockDispatch} playerIndex={mockPlayerIndex} />);

  act(() => {
    fireEvent.click(getAddScoreButtonHelper());
  });

  const scoreForm = getScoreFormHelper();

  act(() => {
    fireEvent.submit(scoreForm);
  });

  expect(mockDispatch).toBeCalledWith({ type: ADD_A_SCORE, playerIndex: mockPlayerIndex, newScore: 0 });
});

test("submitting the form hides the form", async () => {
  const mockDispatch = () => { };
  render(<ScoreColumn dispatch={mockDispatch} />)

  const addButton = getAddScoreButtonHelper();
  act(() => {
    fireEvent.click(addButton);
  });

  const scoreForm = getScoreFormHelper();
  act(() => {
    fireEvent.submit(scoreForm);
  });

  expect(scoreForm).not.toBeInTheDocument();
});
