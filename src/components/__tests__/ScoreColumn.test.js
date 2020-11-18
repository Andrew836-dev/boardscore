import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

import { REMOVE_PLAYER, ADD_A_SCORE } from "../../utils/actions";
import ScoreColumn from "../ScoreColumn";


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

  expect(screen.getByText(/remove/i)).toBeInTheDocument();
});

test("When given a playerIndex and dispatch function as props, it implements them with a 'remove player' button", async () => {
  const testPlayer = { name: "Frank", scores: [] };
  const testPlayerIndex = 0;
  const mockDispatch = jest.fn();
  render(<ScoreColumn player={testPlayer} dispatch={mockDispatch} playerIndex={testPlayerIndex} />);

  act(() => {
    fireEvent.click(screen.getByText(/remove/i));
  });
  expect(mockDispatch).toBeCalledWith({ type: REMOVE_PLAYER, playerIndex: testPlayerIndex });
});

test("Has a button to add a scoring round", async () => {
  render(<ScoreColumn />);

  expect(screen.getByText(/add/i)).toBeInTheDocument();
});

test("Clicking the add score button hides it", async () => {
  render(<ScoreColumn />);

  const addButton = screen.getByText(/add/i);

  act(() => {
    fireEvent.click(addButton);
  });

  expect(addButton).not.toBeInTheDocument();
});

test("clicking the add score button reveals a form to submit the score", async () => {
  render(<ScoreColumn />);

  act(() => {
    fireEvent.click(screen.getByText(/add/i));
  });

  const scoreForm = screen.getByPlaceholderText(/0/);
  expect(scoreForm).toBeInTheDocument();
});

test("losing focus on the form hides it", async () => {
  render(<ScoreColumn />);

  act(() => {
    fireEvent.click(screen.getByText(/add/i));
  });

  const scoreForm = screen.getByPlaceholderText(/0/);
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
    fireEvent.click(screen.getByText(/add/i));
  });

  const scoreForm = screen.getByPlaceholderText(/0/);

  act(() => {
    fireEvent.submit(scoreForm);
  });

  expect(mockDispatch).toBeCalledWith({type: ADD_A_SCORE, playerIndex: mockPlayerIndex, newScore: 0});
});

test("submitting the form hides the form", async () => {
  const mockDispatch = () => {};
  render(<ScoreColumn dispatch={mockDispatch} />)

  const addButton = screen.getByText(/add/i);
  act(() => {
    fireEvent.click(addButton);
  });

  const scoreForm = screen.getByPlaceholderText(/0/);
  act(() => {
    fireEvent.submit(scoreForm);
  });

  expect(scoreForm).not.toBeInTheDocument();
});
