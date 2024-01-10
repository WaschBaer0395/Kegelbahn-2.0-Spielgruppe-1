import React from 'react'
import '../styles/App.css'
import PlayerList from "./PlayerList/players_list";
import PlayField from "./Playfield/play_field";
import { GameLogicDataProvider } from '../api/GameLogicDataContext';

function App() {
  return (
    <div className="App">
      <GameLogicDataProvider>

        <div className="wrapper">
          <div className="player_list">
            <PlayerList />
          </div>
          <div className="play_field">
            <PlayField />
          </div>
          <div className="progress_bar">Distance</div>
          <div className="settings_menu">Settings</div>
        </div>
      </GameLogicDataProvider>
    </div >
  )
}

export default App
