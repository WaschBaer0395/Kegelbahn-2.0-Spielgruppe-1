import React, { useContext, useEffect, useState } from 'react'
import '../../styles/PlayerList.css'
import { GameContext } from '../../api/GameLogicDataContext'

const PlayerList: React.FC = () => {
  const game = useContext(GameContext)
  const [updateFlag, setUpdateFlag] = useState(false)

  useEffect(() => {
    // Subscribe to score changes in GameLogic and trigger re-render
    const unsubscribe = game.subscribeToChanges(() => {
      setUpdateFlag((prevFlag) => !prevFlag)
    })

    return () => {
      unsubscribe()
    }
  }, [game])

  return (
    <div className="playerListMain">
      <div className={`playerListContainer`}>
        {game.getPlayers().map((player, index) => (
          <div
            key={index}
            className={`grid-item ${index === game.currentPlayer ? 'current-player' : ''}`}
            style={{
              borderColor:
                index === game.currentPlayer && game.turn === 1
                  ? '#3333cc'
                  : index === game.currentPlayer && game.turn === 2
                    ? '#ff5050'
                    : 'black',
            }}
          >
            <div className="playerInfo">
              <div className="playerSprite">{player?.playerIcon}</div>
              <div className="playerName">{player?.name}</div>
              <div className="playerScores">
                Distanz: {player?.getTotalScore() * 10}m
              </div>
              {game.turn === 1 && (
                <div
                  className="positiveThrow"
                  style={{
                    visibility:
                      game.currentPlayer === index ? 'visible' : 'hidden',
                  }}
                >
                  Positiver Wurf!
                </div>
              )}
              {player.getTurn() === 2 && (
                <div className="negativeThrow">Negativer Wurf!</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayerList
