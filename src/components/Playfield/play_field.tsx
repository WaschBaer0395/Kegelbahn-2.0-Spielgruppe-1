import React, { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../api/GameLogicDataContext";
import { Stage, Sprite } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

const PlayField: React.FC = () => {
    const game = useContext(GameContext);
    const [scrollPositionX, setScrollPositionX] = useState(0);

    useEffect(() => {
        const unsubscribe = game.subscribeToScoreChanges(() => {
            setScrollPositionX(0);
            const targetScrollPosition =
                game.getPlayers()[game.currentPlayer].scores[game.currentRound - 1] * 1000; //last number here (1000) adjust how far the image will scroll

            const animationDuration = 5000; // 5 seconds
            const startTime = performance.now();

            function animateScroll(currentTime: number) {
                const elapsedTime = currentTime - startTime;
                const progress = elapsedTime / animationDuration;
                const easedProgress = easeInOutQuad(progress);
                const newScrollPosition = scrollPositionX + (targetScrollPosition - scrollPositionX) * easedProgress;
                setScrollPositionX(newScrollPosition);
                if (elapsedTime < animationDuration) {
                    requestAnimationFrame(animateScroll);
                }
            }

            requestAnimationFrame(animateScroll);
        });

        return () => {
            unsubscribe();
        };
    }, [game, scrollPositionX]);

    function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: 0x616161 }}>
                <Sprite texture={PIXI.Texture.from('src/sprites/Background/Background_Layer_Mountains_1_widened.png')} x={-scrollPositionX * 0.08} />
                <Sprite texture={PIXI.Texture.from('src/sprites/Background/Background_Layer_Mountains_2_widened.png')} x={-scrollPositionX * 0.09} />
                <Sprite texture={PIXI.Texture.from('src/sprites/Background/Background_Layer_Clouds_widened.png')} x={-scrollPositionX * 0.1} />
                <Sprite texture={PIXI.Texture.from('src/sprites/Background/Background_Layer_Ground_widened.png')} />
                <Sprite texture={PIXI.Texture.from('src/sprites/Background/Background_Layer_Flowers_horz_widened.png')}
                        rotation={-10.6 * Math.PI / 180} // rotating the horizontal layer
                        x={-scrollPositionX * 0.2 - 130} // adjusting x pos
                        y={scrollPositionX * 0.038 + 190} // and adjusting y pos to achieve a diagonal movement
                />
            </Stage>
        </div>
    );
};

export default PlayField;
