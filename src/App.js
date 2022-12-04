
import './App.css';
import GameWindow from './components/GameWindow/gamewindow.component';
function App() {
  return (
    <div className="App">
      <GameWindow gameDim={{w: 720, h: 480}}/>
    </div>
  );
}

export default App;
