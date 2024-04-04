import React, { useContext, useEffect, useRef, useState } from 'react'
import { GameContext } from '../../api/GameLogicDataContext'
import '../../styles/playfield.css'
import Spritesheet from 'react-responsive-spritesheet'

const PlayField: React.FC = () => {
  const game = useContext(GameContext)
  const [scrollPositionX, setScrollPositionX] = useState(0)
  const animationDuration = Number(import.meta.env.VITE_ANIMATIONSPEED) * 1000
  const [showModal, setShowModal] = useState(false)
  const [showModalNegative, setShowModalNegative] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const animationComplete = useRef(true)
  const sliding = useRef(false)
  const falling = useRef(false)
  const walking = useRef(false)
  const standUp = useRef(false)
  const standStill = useRef(true)
  const afterAnimation = useRef(true)
  const targetScrollPosition = useRef(0)
  const targetWindPositon = useRef(0)
  const windLoopCycles = useRef(1)

  const [playerStartPosition, setPlayerStartPosition] = useState(0); // New state for player position
  const startPosition = -700; // Define the start position
  const animationDurationWalkIn = 2000; // Duration of the animation in milliseconds (change as needed)

  // Resetting this component back to its initial state
  // to prepare the game for a new set of players after a GameOver
  useEffect(() => {
    const unsubscribe = game.subscribeToChanges(() => {
      if (game.isGameOver()) {
        setScrollPositionX(0)
        setShowModal(false)
        setCountdown(0)
        animationComplete.current = true
        sliding.current = false
        falling.current = false
        walking.current = false
        standUp.current = false
        standStill.current = true
        afterAnimation.current = true
        targetScrollPosition.current = 0
        targetWindPositon.current = 0
        windLoopCycles.current = 1
      }
    })
    return () => {
      unsubscribe()
    }
  }, [game])


  // main useEffect for running the animations
  useEffect(() => {
    // subscribe to changes in the game logic
    const unsubscribe = game.subscribeToChanges(() => {
      if (game.gameStarted) {
        // some initialization
        setScrollPositionX(0)
        setShowModal(false)
        animationComplete.current = false

        // calculate the target scroll position of the player and parallax scroll
        // based on the player score
        targetScrollPosition.current =
          game?.getPlayers()[game.currentPlayer]?.scores[
            game.currentRound - 1
          ] * 1000
        const startTime = performance.now()


        // handle animation/scrolling for odd and even turns
        // for positive rounds
        if (game.turn == 1 && !animationComplete.current) {
          walking.current = true
          standStill.current = false
          targetWindPositon.current = targetScrollPosition.current
        }
        // for negative rounds
        else if (game.turn == 2 && !animationComplete.current) {
          falling.current = true
          standStill.current = false
          windLoopCycles.current = 1
          setShowModalNegative(true)
        }

        // function that does the main scroll animation for the background
        // this loops until the animation is completed
        function animateScroll(currentTime: number) {

          // handle the smooth paralax scrolling
          const elapsedTime = currentTime - startTime
          const progress = elapsedTime / animationDuration
          const easedProgress = easeInOutQuad(progress)
          const newScrollPosition =
            scrollPositionX +
            (targetScrollPosition.current - scrollPositionX) * easedProgress

          setScrollPositionX(newScrollPosition) // final next scroll position in the cycle gets calculated here

          if (elapsedTime < animationDuration) {
            requestAnimationFrame(animateScroll)
          } else {
            // once the animation is complete, trigger the state complete and timeout the next throw calculation,
            // to give the player more time to observe the playfield
            animationComplete.current = true
            setShowModalNegative(false)
            setTimeout(() => {
              game.nextThrow()
            }, 2000)
          }
        }

        requestAnimationFrame(animateScroll)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [game, scrollPositionX])

  // Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (showModal) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }

    if (countdown === 0) {
      clearInterval(timer) // reset the timer
      setShowModal(false) // turn modal off once countdown complete
      setCountdown(10) // Reset countdown when complete
    }

    return () => clearInterval(timer)
  }, [countdown, showModal])

  // obviously a ease in ease out function
  function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  // handling player-animation-states
  function handleFrames(spritesheet: Spritesheet) {
    //stand up at: 8-11
    //stand still at: 12 and 19
    //walking at:  13-18
    //falling at: 1-4
    //sliding at: 5-7

    if (spritesheet.getInfo('frame') == 11) {
      spritesheet.goToAndPlay(12)
      spritesheet.setStartAt(12)
      spritesheet.setEndAt(12)
      setTimeout(() => {
        setScrollPositionX(0)
      }, 2000)
    }
    if (
      animationComplete.current &&
      standStill.current &&
      afterAnimation.current &&
      !showModal
    ) {
      afterAnimation.current = false
      setShowModal(true)
    }
    //after standing up, prepare for showing modal
    if (animationComplete.current && !standStill.current && standUp.current) {
      standUp.current = false
      standStill.current = true
      afterAnimation.current = true
    }
    // standing still
    else if (animationComplete.current && standStill.current) {
      spritesheet.goToAndPlay(12)
      spritesheet.setStartAt(12)
      spritesheet.setEndAt(12)
    }
    // walking
    else if (!animationComplete.current && walking.current) {
      spritesheet.goToAndPlay(13)
      spritesheet.setStartAt(13)
      spritesheet.setEndAt(18)
    }
    // standing still after walking
    else if (animationComplete.current && walking.current) {
      standStill.current = true
      walking.current = false
      afterAnimation.current = true
    }
    // falling after standing still
    else if (!animationComplete.current && falling.current) {
      sliding.current = true
      falling.current = false
      spritesheet.goToAndPlay(1)
      spritesheet.setStartAt(1)
      spritesheet.setEndAt(4)
    }
    // sliding after falling
    else if (!animationComplete.current && sliding.current) {
      spritesheet.goToAndPlay(5)
      spritesheet.setStartAt(5)
      spritesheet.setEndAt(7)
    }
    // standing up after sliding for a while
    else if (animationComplete.current && sliding.current) {
      sliding.current = false
      standUp.current = true
      spritesheet.goToAndPlay(8)
      spritesheet.setStartAt(8)
      spritesheet.setEndAt(11)
    }
  }

  function windFrames() {
    if (windLoopCycles.current == 2) {
      windLoopCycles.current = 3
    } else if (windLoopCycles.current == 1) {
      windLoopCycles.current = 2
    } else if (windLoopCycles.current == 3) {
      return
    }
  }

  useEffect(() => {
    animationComplete.current = false;
    walking.current = true;
    const animatePlayerPosition = (startTime: number) => {
      requestAnimationFrame((timestamp) => {
        if (!startTime) startTime = timestamp;
        const timeElapsed = timestamp - startTime;
        const progress = Math.min(timeElapsed / animationDurationWalkIn, 1);

        setPlayerStartPosition(startPosition + progress * (0 - startPosition));

        if (progress < 1) {
          animatePlayerPosition(startTime);
        } else {
          // Animation is complete
          animationComplete.current = true;
          walking.current = false;
          // Any additional actions to take after animation completes can go here
        }
      });
    };

    // Start the animation
    setPlayerStartPosition(startPosition); // Ensure the initial position is set
    animatePlayerPosition(performance.now());
  }, [game.currentPlayer, animationDurationWalkIn, startPosition]);

  return (
    // <div>
    <div className="parallax">
      {/*Slowest layer, Mountains in the back*/}
      <img alt="Moutain Layer"
        className="Mountains1"
        src={'src/sprites/Background/Background_Layer_Mountains_1_widened.png'}
        style={{ left: `${-scrollPositionX * 0.1}px` }}
      ></img>
      {/*2nd Slowest layer, Mountains in the front*/}
      <img  alt="Moutain Layer 2"
        className="Mountains2"
        src={'src/sprites/Background/Background_Layer_Mountains_2_widened.png'}
        style={{ left: `${-scrollPositionX * 0.12}px` }}
      ></img>
      {/*3rd slowest layer, clouds in front of mountains*/}
      <img  alt="Cloud Layer"
        className="Clouds"
        src={'src/sprites/Background/Background_Layer_Clouds_widened.png'}
        style={{ left: `${-scrollPositionX * 0.14}px` }}
      ></img>
      {/*4th slowestl layer Ground (its standing still)*/}
      <img  alt="Ground Layer"
        className="Ground"
        src={'src/sprites/Background/Background_Layer_Ground.png'}
      ></img>
      {/*front flower Layer 2nd fastest*/}
      <img  alt="Flower Layer"
        className="Flowers"
        src={'src/sprites/Background/Background_Layer_Flowers_widened.png'}
        style={{
          left: `${-scrollPositionX * 0.18 - 130}px`,
          top: `${scrollPositionX * 0.036}px`,
        }}
      ></img>
      {/*player Sprite moves opposite of other layers*/}

      <div
        className="player"
        style={{
          left: `${playerStartPosition * 0.14 + (scrollPositionX * 0.14 - 50)}px`,
          top: `${-playerStartPosition * 0.028 + (-scrollPositionX * 0.028 + 10)}px`,
        }}
      >
        <Spritesheet
          image={game.getPlayers()[game.currentPlayer].spriteSheet}
          widthFrame={96}
          heightFrame={96}
          steps={19}
          fps={8}
          startAt={12}
          endAt={12}
          direction={'forward'}
          autoplay={true}
          loop={true}
          onLoopComplete={handleFrames}
        />
      </div>
      <div
        className="wind"
        style={{
          left: `${targetWindPositon.current * 0.14 - 50}px`,
          top: `${-targetWindPositon.current * 0.028 + 520}px`,
          zIndex:
            game.getPlayers()[game.currentPlayer].turn == 2 &&
            !animationComplete.current &&
            windLoopCycles.current <= 2
              ? '99'
              : '-1',
        }}
      >
        <Spritesheet
          image={`src/sprites/animations/wind.png`}
          widthFrame={96}
          heightFrame={96}
          steps={6}
          fps={6}
          startAt={1}
          endAt={6}
          direction={'forward'}
          autoplay={true}
          loop={true}
          onLoopComplete={windFrames}
        />
      </div>
      {/*front Grass Layer Fastest*/}
      <img  alt="Grass Layer"
        className="Grass"
        src={'src/sprites/Background/Background_Layer_Grass_widened.png'}
        style={{
          left: `${-scrollPositionX * 0.19 - 130}px`,
          top: `${scrollPositionX * 0.038}px`,
        }}
      ></img>
      {/*Modal showing info about the next throw and player*/}
      {showModal && (
        <div className="roundInfoModal">
          <p className="playerNameModal">
            {game.getPlayers()[game.currentPlayer].name}
          </p>
          <p className="throwModal">
            {game.getPlayers()[game.currentPlayer].turn === 2
              ? `Achtung! dieser Wurf zählt negativ!`
              : `dieser Wurf geht in die Vollen!`}
          </p>
          <p className="countdownModal">
            bitte warten während die Bahn vorbereitet wird {countdown}!
          </p>
        </div>
      )}
      {showModalNegative && (
        <div className="roundInfoModal">
          <p className="playerNameModal">
            {game.getPlayers()[game.currentPlayer].name}
          </p>
          <p className="throwModal">
            Eine Windböhe hat dich erfasst du fällst hin und rutschst auf{' '}
            {game?.getPlayers()[game.currentPlayer]?.scores[
              game.currentRound - 1
            ] * 10}{' '}
            Meter wieder den Berg wieder herunter
          </p>
        </div>
      )}
    </div>
  )
}

export default PlayField
