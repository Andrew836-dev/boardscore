import { PlayerProvider } from "./utils/playerStore";
import ScoreBoard from "./components/ScoreBoard";
import PlayerAdder from "./components/PlayerAdder";

function App() {
  return (<PlayerProvider>
    <div>
      <header >
        <h2>Welcome to the score Board for Board games</h2>
      </header>
      <section>
        <ScoreBoard />
        <PlayerAdder />
      </section>
    </div>
  </PlayerProvider>
  );
}

export default App;
