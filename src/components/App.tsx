import React from 'react'
import '../styles/App.css'
import MqttComponent from '../api/mqtt'
import Player from "./Player/player";
import PlayerList from "./Player/players_list";
import Stage from "@inlet/react-pixi"
import PlayField from "./Playfield/play_field";

function App() {

  const players: Player[] = [
    new Player(1, 'Jill'),
    new Player(2, 'Basti'),
    new Player(3, 'Bjarne'),
    new Player(4, 'Melanie'),
    new Player(5, 'Rene'),
  ];

  return (
    <div className="App">
      <div className="wrapper">
        <div className="player_list">
          <PlayerList players={players} />
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
