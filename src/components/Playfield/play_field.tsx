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
    let spriteArray: Spritesheet[] = []; //Array, containing the Spritesheets of all players


    useEffect(() => {
        const unsubscribe = game.subscribeToScoreChanges(() => {
            setScrollPositionX(0);
            setShowModal(false)
            const targetScrollPosition = game.getPlayers()[game.currentPlayer].scores[game.currentRound - 1] * 1000;
            const startTime = performance.now();

            function animateScroll(currentTime: number) {
                const elapsedTime = currentTime - startTime;
                const progress = elapsedTime / animationDuration;
                const easedProgress = easeInOutQuad(progress);
                const newScrollPosition = scrollPositionX + (targetScrollPosition - scrollPositionX) * easedProgress;

                setScrollPositionX(newScrollPosition);

                if (elapsedTime < animationDuration) {
                    requestAnimationFrame(animateScroll);
                } else {
                    setShowModal(true);
                    // here: add trigger for next animation and animation end, then continue the rest!
                    if(game.turn == 2){setScrollPositionX(0)}
                    game.nextThrow();
                }
            }
            requestAnimationFrame(animateScroll);
        });
        return () => {
            unsubscribe();
        };
    }, [game, scrollPositionX]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (showModal) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        if (countdown === 0) {
            clearInterval(timer);
            setShowModal(false);
            setCountdown(10); // Reset countdown when complete
            //setAnimationComplete(false);
        }
        return () => clearInterval(timer);
    }, [countdown, showModal]);

    function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    // return this, return that but nobody asks about how return is doing :(


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
            {/*Slowest layer, Mountains in the back*/}
            <img className="Mountains1" src={'src/sprites/Background/Background_Layer_Mountains_1_widened.png'} style={{left:`${-scrollPositionX * 0.10}px`}} ></img>
            {/*2nd Slowest layer, Mountains in the front*/}
            <img className="Mountains2" src={'src/sprites/Background/Background_Layer_Mountains_2_widened.png'} style={{left:`${-scrollPositionX * 0.12}px`}} ></img>
            {/*3rd slowest layer, clouds in front of mountains*/}
            <img className="Clouds" src={'src/sprites/Background/Background_Layer_Clouds_widened.png'} style={{left:`${-scrollPositionX * 0.14}px`}} ></img>
            {/*4th slowestl layer Ground (its standing still)*/}
            <img className="Ground" src={'src/sprites/Background/Background_Layer_Ground.png'} ></img>
            {/*front flower Layer 2nd fastest*/}
            <img className="Flowers" src={'src/sprites/Background/Background_Layer_Flowers_widened.png'}
                 style={{ left: `${-scrollPositionX * 0.18 - 130}px`, top: `${scrollPositionX * 0.036}px`}}></img>
            {/*player Sprite moves opposite of other layers*/}
            <div className="sprite" style={{left: `${+scrollPositionX * 0.14}px`, top: `${-scrollPositionX * 0.028 }px`}}>
                {/*/stand still at: 1 and 8/*/}
                {/*/walking at:  2-7 /*/}
                {/*/falling at: tbd /*/}
                {/*/stand up at: tbd /*/}
                <Spritesheet
                    image={`src/sprites/playerSprites/Male/orange/brown/walking.png`}
                    widthFrame={96}
                    heightFrame={96}
                    steps={8}
                    fps={8}
                    startAt={1}
                    endAt={1}
                    direction={"forward"}
                    autoplay={true}
                    loop={true}
                    onInit={initSpriteArray}
                    onEachFrame={handleFrames}
                />
            </div>
            {/*front Grass Layer Fastest*/}
            <img className="Grass" src={'src/sprites/Background/Background_Layer_Grass_widened.png'}
                 style={{ left: `${-scrollPositionX * 0.19 - 130}px`, top: `${scrollPositionX * 0.038}px`}}></img>
            {/*Modal showing info about the next throw and player*/}
            {showModal && (
                <div className="roundInfo">
                    <h3 style={{ whiteSpace: 'pre-line' }}>
                        {game.getPlayers()[game.currentPlayer].turn === 2 ?
                            `aktueller Spieler:\n${game.getPlayers()[game.currentPlayer].name}\n\nAchtung! dieser Wurf zählt negativ! ${game.getPlayers()[game.currentPlayer].turn}` :
                            `aktueller Spieler:\n${game.getPlayers()[game.currentPlayer].name}\ndieser wurf geht in die Vollen!`}
                    </h3>
                    <p>bitte warten {countdown}!</p>
                </div>
            )}
        </div>

    );


};

export default PlayField;
