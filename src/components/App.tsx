import React from 'react'
import '../styles/App.css'
import AppRouter from "./AppRouter";
import { GameLogicDataProvider } from '../api/GameLogicDataContext';

function App() {
  return (
    <div className="App">
      <GameLogicDataProvider>
        <AppRouter />

      </GameLogicDataProvider>
    </div >
  )
}

export default App
