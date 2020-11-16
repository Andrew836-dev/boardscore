import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import PlayerAdder from '../PlayerAdder';
import ScoreBoard from '../ScoreBoard';
import { PlayerProvider } from '../../utils/playerStore';

test('has a button to add a new player', async () => {
  render(
    <PlayerProvider>
      <PlayerAdder />
    </PlayerProvider>
  );

  const addPlayerButton = screen.getByText(/Add player/i);
  expect(addPlayerButton).toBeInTheDocument();
});

test('clicking the add player button will open a text field to enter a name', async () => {
  render(
    <PlayerProvider>
      <PlayerAdder />
    </PlayerProvider>
  );

  act(() => {
    screen.getByText(/Add player/i).click();
  });

  const textField = screen.getByLabelText(/name/i);
  expect(textField).toBeInTheDocument();
});

test('when the textfield is showing, the add button is not showing', async () => {
  render(
    <PlayerProvider>
      <PlayerAdder />
    </PlayerProvider>
  );

  const addButton = screen.getByText(/add/i);

  act(() => {
    fireEvent.click(addButton);
  });

  expect(addButton).not.toBeInTheDocument();
});

test('losing focus on the input field hides it', async () => {
  render(
    <PlayerProvider>
      <PlayerAdder />
    </PlayerProvider>
  );

  act(() => {
    fireEvent.click(screen.getByText(/add/i));
  });

  const textField = screen.getByLabelText(/name/i);
  expect(textField).toBeInTheDocument();

  act(() => {
    fireEvent.blur(textField);
  });

  expect(textField).not.toBeInTheDocument();
  expect(screen.getByText(/add/i)).toBeInTheDocument();
});

test('submitting an empty text field hides it', async () => {
  render(
    <PlayerProvider>
      <PlayerAdder />
    </PlayerProvider>
  );

  act(() => {
    screen.getByText(/add/i).click();
  });

  const textField = screen.getByLabelText(/name/i);
  expect(textField).toHaveValue("");

  act(() => {
    fireEvent.submit(textField);
  });

  expect(textField).not.toBeInTheDocument();
});

test('submitting a non empty text field hides it', async () => {
  render(
    <PlayerProvider>
      <PlayerAdder />
    </PlayerProvider>
  );

  act(() => {
    screen.getByText(/add/i).click();
  });

  const textField = screen.getByLabelText(/name/i);

  act(() => {
    fireEvent.change(textField, { target: { value: 'Andrew' } })
  });

  expect(textField).toHaveValue('Andrew');

  act(() => {
    fireEvent.submit(textField);
  });

  expect(textField).not.toBeInTheDocument();
});

test("submitting the text field sends the field value to the PlayerStore", async () => {
  render(
    <PlayerProvider>
      <ScoreBoard />
      <PlayerAdder />
    </PlayerProvider>
  )

  act(() => {
    fireEvent.click(screen.getByText(/add/i));
  });

  const textField = screen.getByLabelText(/name/i);

  act(() => {
    fireEvent.change(textField, { target: { value: "Joan" } });
  });

  act(() => {
    fireEvent.submit(textField);
  });

  expect(screen.getByText(/Joan/)).toBeInTheDocument();
});
