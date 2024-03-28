import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../api/GameLogicDataContext";
import '../../styles/playfield.css'
import Spritesheet from 'react-responsive-spritesheet';


const PlayField: React.FC = () => {
    const game = useContext(GameContext);
    const [scrollPositionX, setScrollPositionX] = useState(0);
    const animationDuration = Number(import.meta.env.VITE_ANIMATIONSPEED) * 1000;
    const [showModal, setShowModal] = useState(true);
    const [countdown, setCountdown] = useState(10);
    const [animationComplete, setAnimationComplete] = useState(true);
    const [updateFlag, setUpdateFlag] = useState(false);
    let spriteArray: Spritesheet[] = []; //Array, containing the Spritesheets of all players

    useEffect(() => {
        // Subscribe to score changes in GameLogic and trigger re-render
        const unsubscribe = game.subscribeToScoreChanges(() => {
            setUpdateFlag(prevFlag => !prevFlag);
            console.log('Score change');
            console.log(spriteArray);
            
            setAnimationComplete(false);
        });

        return () => {
            unsubscribe();
        };
    }, [game]);



    useEffect(() => {
        const unsubscribe = game.subscribeToScoreChanges(() => {
            setScrollPositionX(0);
            const targetScrollPosition = game.getPlayers()[game.currentPlayer].scores[game.currentRound - 1] * 1000; //last number here (1000) adjust how far the image will scroll
            const startTime = performance.now();

            function animateScroll(currentTime: number) {
                const elapsedTime = currentTime - startTime;
                const progress = elapsedTime / animationDuration;
                const easedProgress = easeInOutQuad(progress);
                const newScrollPosition = scrollPositionX + (targetScrollPosition - scrollPositionX) * easedProgress;

                setScrollPositionX(newScrollPosition);

                if (elapsedTime < animationDuration) {
                    requestAnimationFrame(animateScroll);
                }else {
                    setAnimationComplete(true); // Animation is complete
                    setShowModal(true)
                }

            }
            requestAnimationFrame(animateScroll);
        });

        return () => {
            unsubscribe();
        };
    }, [game, scrollPositionX]);

    useEffect(() => {
        // Decrement countdown every second until it reaches 0
        let timer: NodeJS.Timeout;

        timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
            //console.log(countdown);
        }, 1000);


        // Clear interval when countdown reaches 0
        if (countdown === 0) {
            clearInterval(timer);
            setShowModal(false);
            //setAnimationComplete(false);
            //console.log("hiding modal and incrementing round");
        }

        return () => clearInterval(timer);
    }, [countdown, showModal, game.totalThrows]);

    useEffect(() => {
        // If animation is complete and modal is shown, reset modal and countdown
        if (animationComplete && showModal) {
            //console.log("Showing modal and starting Countdown")
            setShowModal(true);
            setCountdown(5);
        }
    }, [animationComplete]);

    function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }


    function initSpriteArray(spritesheet: Spritesheet){
        spriteArray.push(spritesheet);
    }
    
    function handleFrames(spritesheet: Spritesheet){
        console.log(animationComplete);
        if(!animationComplete) {
            spritesheet.setStartAt(2);
            spritesheet.setEndAt(7);
        } else {
            spritesheet.setStartAt(1);
            spritesheet.setEndAt(1);
        }
    }

    return (
        // <div>
        <div className="parallax">
            <img className="Mountains1" src={'src/sprites/Background/Background_Layer_Mountains_1_widened.png'} style={{left:`${-scrollPositionX * 0.10}px`}} ></img>
            <img className="Mountains2" src={'src/sprites/Background/Background_Layer_Mountains_2_widened.png'} style={{left:`${-scrollPositionX * 0.12}px`}} ></img>
            <img className="Clouds" src={'src/sprites/Background/Background_Layer_Clouds_widened.png'} style={{left:`${-scrollPositionX * 0.14}px`}} ></img>
            <img className="Ground" src={'src/sprites/Background/Background_Layer_Ground.png'} ></img>
            <img className="Flowers" src={'src/sprites/Background/Background_Layer_Flowers_widened.png'}
                 style={{ left: `${-scrollPositionX * 0.18 - 130}px`, top: `${scrollPositionX * 0.036}px`}}></img>
            <div className="sprite" style={{left: `${+scrollPositionX * 0.14}px`, top: `${-scrollPositionX * 0.028 }px`}}>
                <Spritesheet
                    image={`src/sprites/playerSprites/Male/orange/brown/walking.png`}
                    widthFrame={96}
                    heightFrame={96}
                    steps={8}
                    fps={8}
                    startAt={1}
                    endAt={1}
                    autoplay={true}
                    loop={true}
                    onInit={initSpriteArray}
                    onEachFrame={handleFrames}
                />            
            </div>
            <img className="Grass" src={'src/sprites/Background/Background_Layer_Grass_widened.png'}
                 style={{ left: `${-scrollPositionX * 0.19 - 130}px`, top: `${scrollPositionX * 0.038}px`}}></img>


            {showModal && (
                <div className="roundInfo">
                    <h2>{game.turn === 2 ? "dieser Wurf ist negativ!" : `${game.getPlayers()[game.currentPlayer].name}, in die Vollen!`}</h2>
                    <p>{countdown} seconds left</p>
                </div>
            )}
        </div>

    );


};

export default PlayField;
