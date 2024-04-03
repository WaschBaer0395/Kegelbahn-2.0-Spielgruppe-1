import React, { useEffect, useState } from 'react'
import { useGameContext } from '../../api/GameLogicDataContext'

import '../../styles/DistanceBar.css'

type DistanceBarProps = {}

export default function DistanceBar({}: DistanceBarProps) {
  const game = useGameContext()
  const [updateFlag, setUpdateFlag] = useState(false)

  // Resetting this component back to its initial state
  useEffect(() => {
    const unsubscribe = game.subscribeToChanges(() => {
      if (game.isGameOver()) {
        setUpdateFlag(false)
      }
    })
    return () => {
      unsubscribe();
    };
  }, [game]);


  useEffect(() => {
    const unsubscribe = game.subscribeToChanges(() => {
      setUpdateFlag((prevFlag) => !prevFlag)
    })

    return () => {
      unsubscribe()
    }
  }, [game])

  useEffect(() => {
    // Calculate new positions for player pins
    const newPlayerPositions = game.getPlayers().map((player) => {
      return (
        ((player.getTotalScore() * game.getMultiplier()) /
          (game.getMultiplier() * game.getMaxScore())) *
        100
      )
    })
  }, [game, updateFlag])

  return (
    <div className="beam-chart">
      <div className="beam"></div>
      <img
        src={'src/sprites/finish.png'}
        className="finish"
        style={{ right: `${-65}px` }}
        alt={'finish Flag'}
      ></img>
      {game.getPlayers().map((player, index) => (
        <div
          key={player.id}
          className="marker-pin"
          style={{
            left: `${((player.getTotalScore() / game.getMaxScore())) * 90}%`,
            zIndex: index,
            transition: `left ${import.meta.env.VITE_ANIMATIONSPEED}s ease`,
          }}
        >
          <div className="marker-pin-circle">
            <img
              src={player.preview + '/preview.png'}
              alt={player.name}
              className="avatar"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
