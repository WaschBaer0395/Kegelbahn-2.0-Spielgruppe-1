import React, {useState} from 'react'
import '../styles/App.css'
import Player from "./Player/player";
import PlayerList from "./Player/players_list";
import PlayField from "./Playfield/play_field";

function App() {

  const [players, setPlayers] = useState([
    new Player(1, 'Jill', "src/sprites/playerSprites/Riolu"),
  ]);

  const addPlayer = (newPlayer: Player) => {
    setPlayers([...players, newPlayer]);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="player_list">
          <PlayerList players={players} addPlayer={addPlayer} />
        </div>
        <div className="play_field">
          <PlayField />
        </div>
        <div className="progress_bar">Distance</div>
        <div className="settings_menu">Settings</div>
      </div>
    </div>
  )
}

export default App
