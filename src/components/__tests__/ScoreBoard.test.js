import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { useEffect } from 'react';
import ScoreBoard from '../ScoreBoard';
import { PlayerProvider, usePlayerContext } from '../../utils/playerStore';
import { ADD_PLAYER } from '../../utils/actions';

const AddPlayerToContext = ({ playerName }) => {
  const playerDispatch = usePlayerContext()[1];
  useEffect(() => playerDispatch({ type: ADD_PLAYER, playerName }), [playerName, playerDispatch])
  return <></>;
}

test("displays the names that are in the player context", async () => {
  render(
    <PlayerProvider>
      <AddPlayerToContext playerName="Skeletor" />
      <ScoreBoard />
    </PlayerProvider>
  );
  const scoreBoard = screen.getByText(/Skeletor/);
  expect(scoreBoard).toBeInTheDocument();
});

test("updates when the player is removed from the list", async () => {
  render(
    <PlayerProvider>
      <AddPlayerToContext playerName="Celeste" />
      <ScoreBoard />
    </PlayerProvider>
  );
  const celesteScoreList = screen.getByText(/Celeste/);
  expect(celesteScoreList).toBeInTheDocument();

  act(() => {
    fireEvent.click(screen.getByText(/remove/i));
  });

  expect(celesteScoreList).not.toBeInTheDocument();
});