import React from 'react'
import '../styles/App.css'
import MqttComponent from '../api/mqtt'
import Player from "./Player/player";
import PlayerList from "./Player/players_list";

function App() {

  const players: Player[] = [
    new Player(1, 'Jill'),
    new Player(2, 'Basti'),
    new Player(3, 'Bjarne'),
    new Player(4, 'Melanie'),
    new Player(5, 'Rene'),
    new Player(5, 'Becker Schweizer'),
    new Player(5, 'Rene2'),
    new Player(6, 'Test1')
  ];

  return (
    <div className="App">
      <div className="wrapper">
        <div className="player_list">
          <PlayerList players={players} />
        </div>
        <div className="play_field">
          <MqttComponent />
        </div>
        <div className="progress_bar">Distance</div>
        <div className="settings_menu">Settings</div>
      </div>
    </div>
  )
}

export default App
