import React, {useContext, useEffect, useRef, useState} from "react";
import { GameContext } from "../../api/GameLogicDataContext";
import '../../styles/playfield.css'
import Spritesheet from 'react-responsive-spritesheet';


const PlayField: React.FC = () => {
    const game = useContext(GameContext);
    const [scrollPositionX, setScrollPositionX] = useState(0);
    const animationDuration = Number(import.meta.env.VITE_ANIMATIONSPEED) * 1000;
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const animationComplete = useRef(true)
    const sliding = useRef(false)
    const falling = useRef(false)
    const walking = useRef(false)
    const standUp = useRef(false)
    const standStill = useRef(true)
    const afterAnimation = useRef(true)

    useEffect(() => {
        const unsubscribe = game.subscribeToScoreChanges(() => {
            setScrollPositionX(0);
            setShowModal(false)
            animationComplete.current = false
            console.log("Game turn: ", game.turn)
            console.log("animtationComplete state: ", animationComplete.current)

            const targetScrollPosition = game.getPlayers()[game.currentPlayer].scores[game.currentRound - 1] * 1000;
            const startTime = performance.now();


            if(game.turn == 1 && !animationComplete.current) {
                walking.current = true
                standStill.current = false
                console.log("-> starting sprite walking")
            }
            else if(game.turn == 2 && !animationComplete.current){
                console.log("-> starting sprite falling")
                falling.current = true
                standStill.current = false
            }
            function animateScroll(currentTime: number) {
                const elapsedTime = currentTime - startTime;
                const progress = elapsedTime / animationDuration;
                const easedProgress = easeInOutQuad(progress);
                const newScrollPosition = scrollPositionX + (targetScrollPosition - scrollPositionX) * easedProgress;

                setScrollPositionX(newScrollPosition);

                if (elapsedTime < animationDuration) {
                    requestAnimationFrame(animateScroll);
                } else {
                    animationComplete.current = true
                    // here: add trigger for next animation and animation end, then continue the rest!
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

    function handleFrames(spritesheet: Spritesheet){
        //console.log(animationComplete);
        //stand up at: 8-11
        //stand still at: 12 and 19
        //walking at:  13-18
        //falling at: 1-4
        //sliding at: 5-7

        if(spritesheet.getInfo("frame") == 11){
            spritesheet.goToAndPlay(12)
            spritesheet.setStartAt(12)
            spritesheet.setEndAt(12)
            setScrollPositionX(0)
        }

        if(animationComplete.current && standStill.current && afterAnimation.current && !showModal){
            afterAnimation.current = false
            setShowModal(true)
        }
        //after standing up, prepare for showing modal
        if(animationComplete.current && !standStill.current && standUp.current){
            standUp.current = false
            standStill.current = true
            afterAnimation.current = true
        }
        // standing still
        else if (animationComplete.current && standStill.current){
            spritesheet.goToAndPlay(12)
            spritesheet.setStartAt(12)
            spritesheet.setEndAt(12)
        }
        // walking
        else if (!animationComplete.current && walking.current){
            spritesheet.goToAndPlay(13)
            spritesheet.setStartAt(13)
            spritesheet.setEndAt(18)
        }
        // standing still after walking
        else if(animationComplete.current && walking.current){
            standStill.current = true
            walking.current = false
            afterAnimation.current = true

        }
        // falling after standing still
        else if (!animationComplete.current && falling.current) {
            falling.current = false
            sliding.current = true
            spritesheet.goToAndPlay(1)
            spritesheet.setStartAt(1)
            spritesheet.setEndAt(4)
        }
        // sliding after falling
        else if(!animationComplete.current && sliding.current) {
            spritesheet.goToAndPlay(5)
            spritesheet.setStartAt(5)
            spritesheet.setEndAt(7)
        }
        // standing up after sliding for a while
        else if(animationComplete.current && sliding.current) {
            console.log("Standing up!")
            sliding.current = false
            standUp.current = true
            spritesheet.goToAndPlay(8)
            spritesheet.setStartAt(8)
            spritesheet.setEndAt(11)
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

                <Spritesheet
                    image={`src/sprites/playerSprites/Male/orange/brown/spritesheet.png`}
                    widthFrame={96}
                    heightFrame={96}
                    steps={19}
                    fps={8}
                    startAt={12}
                    endAt={12}
                    direction={"forward"}
                    autoplay={true}
                    loop={true}
                    onLoopComplete={handleFrames}
                />
            </div>
            {/*front Grass Layer Fastest*/}
            <img className="Grass" src={'src/sprites/Background/Background_Layer_Grass_widened.png'}
                 style={{ left: `${-scrollPositionX * 0.19 - 130}px`, top: `${scrollPositionX * 0.038}px`}}></img>
            {/*Modal showing info about the next throw and player*/}
            {showModal && (
                <div className="roundInfoModal">
                    <p className="playerNameModal">
                        {game.getPlayers()[game.currentPlayer].name}
                    </p>
                    <p className="throwModal">{game.getPlayers()[game.currentPlayer].turn === 2 ?
                        `Achtung! dieser Wurf zählt negativ!`:
                        `dieser Wurf geht in die Vollen!`
                    }</p>
                    <p className="countdownModal">bitte warten {countdown}!</p>
                </div>
            )}
        </div>

    );


};

export default PlayField;
