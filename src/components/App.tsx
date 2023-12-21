import React, {useState} from 'react'
import '../styles/App.css'
import PlayerList from "./PlayerList/players_list";
import PlayField from "./Playfield/play_field";
import Game from "./Game";

function App() {

  let gameObject: Game = null
  return (
    <div className="App">
      <div className="wrapper">
        <div className="player_list">
          <PlayerList/>
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
