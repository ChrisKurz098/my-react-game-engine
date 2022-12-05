
import './App.css';
import GameWindow from './components/GameWindow/gamewindow.component';
function App() {
  return (
    <div className="App">
      <GameWindow gameDim={{w: 1280, h: 720}}/>
    </div>
  );
}

export default App;
